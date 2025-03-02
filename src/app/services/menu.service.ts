import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, from, map, Observable, of, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Menu } from '../interfaces/menu.interface';
import OpenAI from 'openai';

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private currentImageSource = new BehaviorSubject<string>('');

    currentImage$ = this.currentImageSource.asObservable();

    private menuDataSource = new BehaviorSubject<Menu | null>(null);

    menuData$ = this.menuDataSource.asObservable();

    private openai = new OpenAI({
        apiKey: environment.openaiApiKey,
        dangerouslyAllowBrowser: true  // Note: Only use this in development
    });

    constructor(private http: HttpClient) {
    }

    setCurrentImage(imageBase64: string) {
        this.currentImageSource.next(imageBase64);
    }

    processMenu(): Observable<Menu> {
        return this.currentImage$.pipe(
            switchMap(imageBase64 => this.analyzeMenu(imageBase64)),
            switchMap(menu => this.enrichMenuWithImages(menu))
        );
    }

    getImagesForDish(dishName: string): Observable<string[]> {
        return of(['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcUfB45LB_uSuHtaPofscfJcUnRprRsUz7IA&s']);

        const headers = new HttpHeaders()
            .set('Authorization', `Client-ID ${environment.unsplashApiKey}`);

        return this.http.get<any>(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(dishName + ' food')}&per_page=5`,
            { headers }
        ).pipe(
            map(response => response.results.map((result: any) => result.urls.regular))
        );
    }

    private analyzeMenu(imageBase64: string): Observable<Menu> {
        return from(this.openai.chat.completions.create({
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
            map(response => {
                const content = response.choices[0].message.content
                const jsonMatch = content
                    ? content.match(/^```json\s*([\s\S]*?)\s*```$/)
                    : null
                const cleanedJson = jsonMatch
                    ? jsonMatch[1].trim()
                    : content!.trim()
                const menu = JSON.parse(cleanedJson);
                this.menuDataSource.next(menu);

                debugger;
                return menu;
            })
        );
    }

    private enrichMenuWithImages(menu: Menu): Observable<Menu> {
        const enrichedMenu = { ...menu };
        const promises = menu.categories.map(category => {
            return Promise.all(
                category.items.map(async item => {
                    const images = await this.getImagesForDish(item.name).toPromise();
                    return { ...item, images };
                })
            );
        });

        return from(Promise.all(promises)).pipe(
            map(enrichedCategories => {
                enrichedMenu.categories = enrichedMenu.categories.map((cat, index) => ({
                    ...cat,
                    items: enrichedCategories[index]
                }));
                this.menuDataSource.next(enrichedMenu);
                return enrichedMenu;
            })
        );
    }
} 
