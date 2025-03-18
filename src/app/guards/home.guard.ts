import { inject } from '@angular/core';
import { map } from 'rxjs';
import { MenuService } from '../services/menu.service';
import { Router } from '@angular/router';
import { toMenu } from '../services/router.service';

export const homeGuard = () => {
    const menuService = inject(MenuService);
    const router = inject(Router);

    return menuService.menuData$.pipe(
        map((menu) => {
            if (menu) {
                router.navigate(toMenu);
                return false;
            }

            return true;
        }),
    );
};
