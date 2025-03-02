import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MenuService } from '../services/menu.service';

@Component({
    selector: 'app-home-screen',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule],
    template: `
        <div class="container">
            <div class="logo">
                <img
                    src="assets/icons/icon-512x512.png"
                    alt="Logo"
                >
                <h1>Menu Translator</h1>
            </div>

            <div class="buttons">
                <button
                    mat-raised-button
                    color="primary"
                    (click)="takePhoto()"
                >
                    <mat-icon>camera_alt</mat-icon>
                    Take Photo
                </button>

                <button
                    mat-button
                    (click)="selectPhoto()"
                >
                    <mat-icon>photo_library</mat-icon>
                    Select from Gallery
                </button>
            </div>
        </div>
    `,
    styles: [
        `
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: calc(100vh - 64px);
      padding: 16px;
    }
    
    .logo {
      text-align: center;
      margin-bottom: 48px;
    }
    
    .logo img {
      width: 150px;
      height: 150px;
      margin-bottom: 16px;
    }
    
    .buttons {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    button {
      min-width: 200px;
    }
  `
    ]
})
export class HomeScreenComponent {
    constructor(private router: Router, private menuService: MenuService) {
    }

    async takePhoto() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            // Store stream in service and navigate to camera view
            this.router.navigate(['/camera']);
        } catch (err) {
            console.error('Error accessing camera:', err);
        }
    }

    selectPhoto() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e: any) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const imageBase64 = event.target?.result as string;
                    this.menuService.setCurrentImage(imageBase64);
                    this.router.navigate(['/processing']);
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    }
} 
