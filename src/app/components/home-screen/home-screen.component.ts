import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { ImageComponent } from '../image/image.component';
import { toCamera, toProcessing } from '../../services/router.service';

@Component({
    selector: 'app-home-screen',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule, ImageComponent],
    templateUrl: './home-screen.component.html',
    styleUrl: './home-screen.component.scss',
    host: {
        class: 'home-screen'
    }
})
export class HomeScreenComponent {
    constructor(
        private _router: Router,
        private _menuService: MenuService
    ) {
    }

    public async takePhoto() {
        try {
            // const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            // Store stream in service and navigate to camera view
            this._router.navigate(toCamera);
        } catch (err) {
            console.error('Error accessing camera:', err);
        }
    }

    public selectPhoto() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e: any) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const imageBase64 = event.target?.result as string;
                    this._menuService.setCurrentImage(imageBase64);
                    this._router.navigate(toProcessing);
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    }
}
