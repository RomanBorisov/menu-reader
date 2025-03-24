import { inject } from '@angular/core';
import { map } from 'rxjs';
import { MenuState } from '../states/menu.state';
import { Router } from '@angular/router';
import { toHome } from '../services/router.service';

export const processingGuard = () => {
    const menuService = inject(MenuState);
    const router = inject(Router);

    return menuService.currentImage$.pipe(
        map((image) => {
            if (!image) {
                router.navigate(toHome);
                return false;
            }

            return true;
        }),
    );
};
