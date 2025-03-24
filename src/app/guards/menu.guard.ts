import { inject } from '@angular/core';
import { map } from 'rxjs';
import { MenuState } from '../states/menu.state';
import { Router } from '@angular/router';
import { toHome } from '../services/router.service';

export const menuGuard = () => {
    const menuService = inject(MenuState);
    const router = inject(Router);

    return menuService.menuData$.pipe(
        map((menu) => {
            if (!menu) {
                router.navigate(toHome);
                return false;
            }

            return true;
        }),
    );
};
