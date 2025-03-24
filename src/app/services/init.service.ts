import { Injectable } from '@angular/core';
import { MenuState } from '../states/menu.state';

@Injectable({
    providedIn: 'root',
})
export class InitService {
    constructor(
        private _menuState: MenuState
    ) {
    }

    public init() {
        this._menuState.init();
    }
}
