import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ImageComponent } from '../image/image.component';
import { MatCard, MatCardContent } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MenuItem } from '../../interfaces/menu.interface';
import { Router } from '@angular/router';
import { toDish } from '../../services/router.service';

@Component({
    selector: 'app-menu-list-item',
    imports: [
        ImageComponent,
        MatCard,
        MatCardContent,
        NgIf
    ],
    templateUrl: './menu-list-item.component.html',
    styleUrl: './menu-list-item.component.scss',
    host: {
        class: 'menu-list-item'
    },
    encapsulation: ViewEncapsulation.None
})
export class MenuListItemComponent {
    @Input({ required: true }) public item!: MenuItem;

    constructor(
        private _router: Router,
    ) {
    }

    public openDishDetails(item: MenuItem) {
        this._router.navigate([...toDish, btoa(item.name)]);
    }
}
