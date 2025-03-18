import { Injectable } from '@angular/core';
import { MenuService } from './menu.service';

@Injectable({
    providedIn: 'root',
})
export class InitService {
    constructor(
        private _menuService: MenuService
    ) {
    }

    public init() {
        this._menuService.init();
    }
}
