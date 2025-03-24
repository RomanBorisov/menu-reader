import { Injectable } from '@angular/core';
import { Menu } from '../interfaces/menu.interface';
import { RestService } from './rest.service';
import { Observable, of, map } from 'rxjs';

export const PROCESSED_MENU_KEY = 'processed-menu';

@Injectable({
    providedIn: 'root'
})
export class ProcessImageService {
    constructor(private _rest: RestService) {
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

    // POST /process-image/
    public analyzeMenu(imageBase64: string): Observable<Menu> {
        const base64Data = imageBase64.includes('base64,')
            ? imageBase64.split('base64,')[1]
            : imageBase64;

        const byteCharacters = atob(base64Data);
        const byteArrays = [];
        for (let i = 0; i < byteCharacters.length; i++) {
            byteArrays.push(byteCharacters.charCodeAt(i));
        }
        const byteArray = new Uint8Array(byteArrays);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });

        const imageData = {
            image: new File([blob], 'menu.jpg', { type: 'image/jpeg' })
        };

        return this._rest.restPOSTFormData(`process-image/`, imageData).pipe(
            map((response: any) => {
                return JSON.parse(response.result);
            })
        );
    }
}
