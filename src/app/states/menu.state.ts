import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, forkJoin, from, map, mergeMap, Observable, switchMap, tap, toArray } from 'rxjs';
import { Menu } from '../interfaces/menu.interface';
import { ProcessImageService } from '../services/process-image.service';

export const PROCESSED_MENU_KEY = 'processed-menu';

@Injectable({
    providedIn: 'root'
})
export class MenuState {
    public currentImage$: Observable<string | null>;

    public menuData$: Observable<Menu | null>;

    private _currentImageSource$ = new BehaviorSubject<string | null>(null);

    private _menuDataSource$ = new BehaviorSubject<Menu | null>(null);

    constructor(
        private _processImageService: ProcessImageService,
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

    private _analyzeMenu(imageBase64: string): Observable<Menu> {
        return this._processImageService.analyzeMenu(imageBase64).pipe(
            tap((menu) => this._menuDataSource$.next(menu))
        );
    }

    private _enrichMenuWithImages(menu: Menu): Observable<Menu> {
        const enrichedMenu = { ...menu };
        const categoryObservables = menu.categories.map((category) =>
            from(category.items).pipe(
                mergeMap((item) =>
                    this._processImageService.getImagesForDish(item.name).pipe(
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
