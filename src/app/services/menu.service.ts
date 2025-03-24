import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, forkJoin, from, map, mergeMap, Observable, of, switchMap, tap, toArray } from 'rxjs';
import { environment } from '../../environments/environment';
import { Menu } from '../interfaces/menu.interface';
import { RestService } from './rest.service';
import { Subs } from './subs';
import { Router } from '@angular/router';

export const PROCESSED_MENU_KEY = 'processed-menu';

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    public currentImage$: Observable<string | null>;

    public menuData$: Observable<Menu | null>;

    private _currentImageSource$ = new BehaviorSubject<string | null>(null);

    private _menuDataSource$ = new BehaviorSubject<Menu | null>(null);

    private _subs = new Subs();

    constructor(
        private _rest: RestService,
        private _router: Router
    ) {
        this.currentImage$ = this._currentImageSource$.asObservable();
        this.menuData$ = this._menuDataSource$.asObservable();
    }

    public setCurrentImage(imageBase64: string) {
        this._currentImageSource$.next(imageBase64);
    }

    public init() {
        if (!!localStorage.getItem(PROCESSED_MENU_KEY)) {
            this._menuDataSource$.next(JSON.parse(localStorage.getItem(PROCESSED_MENU_KEY)!));
            return;
        }
    }

    public clean() {
        this._currentImageSource$.next(null);
        this._menuDataSource$.next(null);
        localStorage.removeItem(PROCESSED_MENU_KEY);
    }

    public processMenu(): Observable<Menu> {
        return this.currentImage$.pipe(
            filter((imageBase64): imageBase64 is string => !!imageBase64),
            tap(() => localStorage.removeItem(PROCESSED_MENU_KEY)),
            switchMap((imageBase64) => this._analyzeMenu(imageBase64)),
            switchMap((menu) => this._enrichMenuWithImages(menu)),
            tap((menu) => localStorage.setItem(PROCESSED_MENU_KEY, JSON.stringify(menu))),
        );
    }

    public getImagesForDish(dishName: string): Observable<string[]> {
        return of(['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcUfB45LB_uSuHtaPofscfJcUnRprRsUz7IA&s']);
        // Commented code for possible future use of Unsplash API
        // const headers = new HttpHeaders()
        //     .set('Authorization', `Client-ID ${environment.unsplashApiKey}`);
        //
        // return this._rest.restGET(
        //     `https://api.unsplash.com/search/photos?query=${encodeURIComponent(dishName + ' food')}&per_page=5`,
        //     { ...headers }
        // ).pipe(
        //     map((response) => response.results.map((result: any) => result.urls.regular))
        // );
    }

    private _analyzeMenu(imageBase64: string): Observable<Menu> {
        // Prepare the image
        // Remove the prefix data:image/jpeg;base64, if present
        const base64Data = imageBase64.includes('base64,')
            ? imageBase64.split('base64,')[1]
            : imageBase64;

        // Create FormData for file upload
        const formData = new FormData();

        // Convert Base64 to Blob
        const byteCharacters = atob(base64Data);
        const byteArrays = [];
        for (let i = 0; i < byteCharacters.length; i++) {
            byteArrays.push(byteCharacters.charCodeAt(i));
        }
        const byteArray = new Uint8Array(byteArrays);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });

        // Add blob to FormData
        formData.append('image', blob, 'menu.jpg');

        // Send request to Django backend
        return this._rest.restPOST(
            `${environment.apiBaseUrl}/process-image/`,
            formData
        ).pipe(
            map((response: any) => {
                const menu = JSON.parse(response.result);
                this._menuDataSource$.next(menu);
                return menu;
            })
        );
    }

    private _enrichMenuWithImages(menu: Menu): Observable<Menu> {
        const enrichedMenu = { ...menu };
        const categoryObservables = menu.categories.map((category) =>
            from(category.items).pipe(
                mergeMap((item) =>
                    this.getImagesForDish(item.name).pipe(
                        map((images) => ({ ...item, images }))
                    )
                ),
                toArray(),
                map((enrichedItems) => ({
                    ...category,
                    items: enrichedItems
                }))
            )
        );

        return forkJoin(categoryObservables).pipe(
            map((enrichedCategories) => {
                enrichedMenu.categories = enrichedCategories;
                this._menuDataSource$.next(enrichedMenu);
                return enrichedMenu;
            })
        );
    }
}
