import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, from, map, Observable, of, switchMap, mergeMap, toArray, forkJoin } from 'rxjs';
import { environment } from '../../environments/environment';
import { Menu } from '../interfaces/menu.interface';
import OpenAI from 'openai';

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    public currentImage$: Observable<string>;

    public menuData$: Observable<Menu | null>;

    private _currentImageSource = new BehaviorSubject<string>('');

    private _menuDataSource = new BehaviorSubject<Menu | null>(null);

    private _openai = new OpenAI({
        apiKey: environment.openaiApiKey,
        dangerouslyAllowBrowser: true  // Note: Only use this in development
    });

    constructor(private _http: HttpClient) {
        this.currentImage$ = this._currentImageSource.asObservable();
        this.menuData$ = this._menuDataSource.asObservable();
    }

    public setCurrentImage(imageBase64: string) {
        this._currentImageSource.next(imageBase64);
    }

    public processMenu(): Observable<Menu> {
        return this.currentImage$.pipe(
            switchMap((imageBase64) => this._analyzeMenu(imageBase64)),
            switchMap((menu) => this._enrichMenuWithImages(menu))
        );
    }

    public getImagesForDish(dishName: string): Observable<string[]> {
        return of(['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcUfB45LB_uSuHtaPofscfJcUnRprRsUz7IA&s']);
        // const headers = new HttpHeaders()
        //     .set('Authorization', `Client-ID ${environment.unsplashApiKey}`);
        //
        // return this._http.get<any>(
        //     `https://api.unsplash.com/search/photos?query=${encodeURIComponent(dishName + ' food')}&per_page=5`,
        //     { headers }
        // ).pipe(
        //     map((response) => response.results.map((result: any) => result.urls.regular))
        // );
    }

    private _analyzeMenu(imageBase64: string): Observable<Menu> {
        return from(this._openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'user',
                    content: [
                        { type: 'text', text: environment.openaiPrompt },
                        { type: 'image_url', image_url: { url: imageBase64 } }
                    ]
                }
            ],
            max_tokens: 4096
        })).pipe(
            map((response) => {
                const content = response.choices[0].message.content;
                const jsonMatch = content
                    ? content.match(/^```json\s*([\s\S]*?)\s*```$/)
                    : null;
                const cleanedJson = jsonMatch
                    ? jsonMatch[1].trim()
                    : content!.trim();
                const menu = JSON.parse(cleanedJson);
                this._menuDataSource.next(menu);

                return menu;
            })
        );
    }

    private _enrichMenuWithImages(menu: Menu): Observable<Menu> {
        const enrichedMenu = { ...menu };
        const categoryObservables = menu.categories.map(category => 
            from(category.items).pipe(
                mergeMap(item => 
                    this.getImagesForDish(item.name).pipe(
                        map(images => ({ ...item, images }))
                    )
                ),
                toArray(),
                map(enrichedItems => ({
                    ...category,
                    items: enrichedItems
                }))
            )
        );

        return forkJoin(categoryObservables).pipe(
            map(enrichedCategories => {
                enrichedMenu.categories = enrichedCategories;
                this._menuDataSource.next(enrichedMenu);
                return enrichedMenu;
            })
        );
    }
}
