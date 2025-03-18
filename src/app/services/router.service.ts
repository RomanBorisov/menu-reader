import { Injectable } from '@angular/core';

export enum RootRoutes {
    Home = '',
    Camera = 'camera',
    Processing = 'processing',
    Menu = 'menu',
    Dish = 'dish'
}

export const toHome = [`/${RootRoutes.Home}`];
export const toCamera = [...toHome, RootRoutes.Camera];
export const toProcessing = [...toHome, RootRoutes.Processing];
export const toMenu = [...toHome, RootRoutes.Menu];
export const toDish = [...toHome, RootRoutes.Dish];

@Injectable({
    providedIn: 'root'
})
export class RouterService {
}
