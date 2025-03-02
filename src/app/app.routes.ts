import { Routes } from '@angular/router';
import { HomeScreenComponent } from './components/home-screen.component';
import { CameraScreenComponent } from './components/camera-screen.component';
import { ProcessingScreenComponent } from './components/processing-screen.component';
import { MenuListComponent } from './components/menu-list.component';
import { DishDetailsComponent } from './components/dish-details.component';

export const routes: Routes = [
    { path: '', component: HomeScreenComponent },
    { path: 'camera', component: CameraScreenComponent },
    { path: 'processing', component: ProcessingScreenComponent },
    { path: 'menu', component: MenuListComponent },
    { path: 'dish/:id', component: DishDetailsComponent },
    { path: '**', redirectTo: '' }
];
