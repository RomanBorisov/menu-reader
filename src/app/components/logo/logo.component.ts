import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { ImageComponent } from '../image/image.component';
import { Router } from '@angular/router';
import { toHome } from '../../services/router.service';

@Component({
    selector: 'app-logo',
    imports: [
        ImageComponent
    ],
    templateUrl: './logo.component.html',
    styleUrl: './logo.component.scss',
    host: {
        class: 'logo clickable'
    },
    encapsulation: ViewEncapsulation.None
})
export class LogoComponent {
    constructor(
        private _router: Router
    ) {
    }

    @HostListener('click')
    public onClick() {
        this._router.navigate(toHome);
    }

}
