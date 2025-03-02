import { Routes } from '@angular/router';
import { HomeScreenComponent } from './components/home-screen/home-screen.component';
import { CameraScreenComponent } from './components/camera-screen/camera-screen.component';
import { ProcessingScreenComponent } from './components/processing-screen/processing-screen.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { DishDetailsComponent } from './components/dish-details/dish-details.component';
import { RootRoutes } from './services/router.service';

export const routes: Routes = [
    { path: RootRoutes.Home, component: HomeScreenComponent },
    { path: RootRoutes.Camera, component: CameraScreenComponent },
    { path: RootRoutes.Processing, component: ProcessingScreenComponent },
    { path: RootRoutes.Menu, component: MenuListComponent },
    { path: `${RootRoutes.Dish}/:id`, component: DishDetailsComponent },
    { path: '**', redirectTo: '' }
];
