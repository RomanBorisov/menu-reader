import { Component, ViewEncapsulation } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { LogoComponent } from '../logo/logo.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatAnchor } from '@angular/material/button';
import { toApp } from '../../services/router.service';

@Component({
    selector: 'app-header',
    imports: [
        MatToolbar,
        LogoComponent,
        RouterLinkActive,
        RouterLink,
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
    protected readonly toApp = toApp;
}
