import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MenuService } from '../../services/menu.service';

@Component({
    selector: 'app-camera-screen',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule],
    templateUrl: './camera-screen.component.html',
    styleUrl: 'camera-screen.component.scss',
})
export class CameraScreenComponent implements OnDestroy, OnInit {
    private _stream: MediaStream | null = null;

    constructor(private _router: Router, private _menuService: MenuService) {
    }

    public ngOnInit() {
        this.startCamera();
    }

    public async startCamera() {
        try {
            this._stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const video = document.querySelector('video');
            if (video) {
                video.srcObject = this._stream;
            }
        } catch (err) {
            console.error('Error:', err);
        }
    }

    public capturePhoto() {
        const video = document.querySelector('video');
        const canvas = document.createElement('canvas');
        if (video) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d')?.drawImage(video, 0, 0);
            const imageBase64 = canvas.toDataURL('image/jpeg');
            this._menuService.setCurrentImage(imageBase64);
            this._router.navigate(['/processing']);
        }
    }

    public ngOnDestroy() {
        this._stream?.getTracks().forEach((track) => track.stop());
    }
}
