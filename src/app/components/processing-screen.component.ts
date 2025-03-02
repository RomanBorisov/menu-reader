import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MenuService } from '../services/menu.service';

@Component({
    selector: 'app-processing-screen',
    standalone: true,
    imports: [CommonModule, MatProgressSpinnerModule],
    template: `
        <div class="processing-container">
            <mat-spinner></mat-spinner>
            <h2>Analyzing menu...</h2>
        </div>
    `,
    styles: [
        `
            .processing-container {
                height: calc(100vh - 64px);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 24px;
            }
        `
    ]
})
export class ProcessingScreenComponent implements OnInit {
    constructor(
        private menuService: MenuService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.menuService.processMenu().subscribe({
            next: () => this.router.navigate(['/menu']),
            error: (err) => console.error('Error processing menu:', err)
        });
    }
} 
