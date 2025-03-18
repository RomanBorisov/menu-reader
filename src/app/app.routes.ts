import { Routes } from '@angular/router';
import { HomeScreenComponent } from './components/home-screen/home-screen.component';
import { CameraScreenComponent } from './components/camera-screen/camera-screen.component';
import { ProcessingScreenComponent } from './components/processing-screen/processing-screen.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { DishDetailsComponent } from './components/dish-details/dish-details.component';
import { RootRoutes } from './services/router.service';
import { menuGuard } from './guards/menu.guard';
import { homeGuard } from './guards/home.guard';
import { processingGuard } from './guards/processing.guard';

export const routes: Routes = [
    {
        path: RootRoutes.Home,
        component: HomeScreenComponent,
        canActivate: [homeGuard]
    },
    {
        path: RootRoutes.Camera,
        component: CameraScreenComponent,
    },
    {
        path: RootRoutes.Processing,
        component: ProcessingScreenComponent,
        canActivate: [processingGuard]
    },
    {
        path: RootRoutes.Menu,
        component: MenuListComponent,
        canActivate: [menuGuard]
    },
    {
        path: `${RootRoutes.Dish}/:id`,
        component: DishDetailsComponent,
        canActivate: [menuGuard]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
