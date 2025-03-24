import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MenuState } from '../../states/menu.state';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MenuItem } from '../../interfaces/menu.interface';
import { ImageComponent } from '../image/image.component';

@Component({
    selector: 'app-dish-details',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatChipsModule, ImageComponent],
    templateUrl: './dish-details.component.html',
    styleUrl: './dish-details.component.scss',
    host: {
        class: 'dish-detail'
    },
    encapsulation: ViewEncapsulation.None
})
export class DishDetailsComponent implements OnInit {
    public dish$!: Observable<MenuItem | null>;

    constructor(
        private _route: ActivatedRoute,
        private _menuService: MenuState,
    ) {
    }

    public ngOnInit() {
        this.dish$ = this._route.paramMap.pipe(
            switchMap((params) => {
                const dishName = atob(params.get('id') || '');
                return this._menuService.menuData$.pipe(
                    map((menu) => {
                        if (!menu) {
                            return null;
                        }

                        for (const category of menu.categories) {
                            const found = category.items.find((item) => item.name === dishName);
                            if (found) {
                                return found;
                            }
                        }
                        return null;
                    })
                );
            }));
    }
}
