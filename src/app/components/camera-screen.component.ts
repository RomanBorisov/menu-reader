import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MenuService } from '../services/menu.service';

@Component({
    selector: 'app-camera-screen',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule],
    template: `
        <div class="camera-container">
            <video
                #video
                id="video"
                autoplay
                playsinline
            ></video>
            <div class="controls">
                <button
                    mat-fab
                    color="primary"
                    (click)="capturePhoto()"
                >
                    <mat-icon>camera</mat-icon>
                </button>
            </div>
        </div>
    `,
    styles: [
        `
            .camera-container {
                height: calc(100vh - 64px);
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            video {
                width: 100%;
                max-height: 80vh;
                object-fit: cover;
            }

            .controls {
                position: fixed;
                bottom: 32px;
            }
        `
    ]
})
export class CameraScreenComponent implements OnDestroy {
    private stream: MediaStream | null = null;

    constructor(private router: Router, private menuService: MenuService) {
    }

    ngOnInit() {
        this.startCamera();
    }

    async startCamera() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const video = document.querySelector('video');
            if (video) {
                video.srcObject = this.stream;
            }
        } catch (err) {
            console.error('Error:', err);
        }
    }

    capturePhoto() {
        const video = document.querySelector('video');
        const canvas = document.createElement('canvas');
        if (video) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d')?.drawImage(video, 0, 0);
            const imageBase64 = canvas.toDataURL('image/jpeg');
            this.menuService.setCurrentImage(imageBase64);
            this.router.navigate(['/processing']);
        }
    }

    ngOnDestroy() {
        this.stream?.getTracks().forEach(track => track.stop());
    }
} 
