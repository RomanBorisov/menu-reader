import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { Menu, MenuItem } from '../../interfaces/menu.interface';
import { MenuState } from '../../states/menu.state';
import { toDish, toHome } from '../../services/router.service';
import { Subs } from '../../utils/subs';
import { MenuListItemComponent } from '../menu-list-item/menu-list-item.component';

@Component({
    selector: 'app-menu-list',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatExpansionModule, MenuListItemComponent],
    templateUrl: './menu-list.component.html',
    styleUrl: './menu-list.component.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'menu-list'
    }
})
export class MenuListComponent implements OnInit, OnDestroy {
    public menu: Menu | null = null;

    private _subs = new Subs();

    constructor(
        private _router: Router,
        private _menuService: MenuState,
    ) {
    }

    public ngOnInit() {
        this._subs.add = this._menuService.menuData$.subscribe((menu) => {
            if (!menu) {
                this._router.navigate(toHome);
            }

            this.menu = menu;
        });
    }

    public ngOnDestroy() {
        this._subs.unsubscribe();
    }

    public openDishDetails(item: MenuItem) {
        this._router.navigate([...toDish, btoa(item.name)]);
    }
}
