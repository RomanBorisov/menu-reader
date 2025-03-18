import { Component, ViewEncapsulation } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { LogoComponent } from '../logo/logo.component';
import { Router, RouterLinkActive } from '@angular/router';
import { MatAnchor } from '@angular/material/button';
import { toHome } from '../../services/router.service';
import { MenuService } from '../../services/menu.service';

@Component({
    selector: 'app-header',
    imports: [
        MatToolbar,
        LogoComponent,
        RouterLinkActive,
        MatAnchor
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    host: {
        class: 'header'
    },
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {

    constructor(
        private _router: Router,
        private _menuService: MenuService
    ) {
    }

    public navigateToHomeAndCleanProcessedOrder() {
        // TODO add a confirmation dialog before navigating to home
        this._router.navigate(toHome).then(() => {
            this._menuService.clean()
        });

    }
}
