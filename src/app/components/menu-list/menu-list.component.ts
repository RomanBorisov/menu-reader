import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { Menu, MenuItem } from '../../interfaces/menu.interface';
import { MenuService } from '../../services/menu.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-menu-list',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatExpansionModule],
    templateUrl: './menu-list.component.html',
    styleUrl: './menu-list.component.scss',
})
export class MenuListComponent implements OnInit {
    public menu$!: Observable<Menu | null>;

    constructor(
        private _router: Router,
        private _menuService: MenuService,
    ) {
    }

    public ngOnInit() {
        this.menu$ = this._menuService.menuData$;

        this.menu$.subscribe((menu: Menu | null) => {
            if (!menu) {
                this._router.navigate(['/']);
            }
        });
    }

    public openDishDetails(item: MenuItem) {
        // Store the item in service or pass via state
        this._router.navigate(['/dish', btoa(item.name)]);
    }
}
