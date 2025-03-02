import { Injectable } from '@angular/core';

export enum RootRoutes {
    Home = '',
    Camera = 'camera',
    Processing = 'processing',
    Menu = 'menu',
    Dish = 'dish'
}

export const toApp = [`/${RootRoutes.Home}`];
export const toCamera = [...toApp, RootRoutes.Camera];
export const toProcessing = [...toApp, RootRoutes.Processing];
export const toMenu = [...toApp, RootRoutes.Menu];
export const toDish = [...toApp, RootRoutes.Dish];


@Injectable({
    providedIn: 'root'
})
export class RouterService {
}
