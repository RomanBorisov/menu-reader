import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MenuService } from '../../services/menu.service';

@Component({
    selector: 'app-processing-screen',
    standalone: true,
    imports: [CommonModule, MatProgressSpinnerModule],
    templateUrl: './processing-screen.component.html',
    styleUrl: './processing-screen.component.scss',
})
export class ProcessingScreenComponent implements OnInit {
    constructor(
        private _menuService: MenuService,
        private _router: Router
    ) {
    }

    public ngOnInit() {
        this._menuService.processMenu().subscribe({
            next: () => this._router.navigate(['/menu']),
            error: (err) => console.error('Error processing menu:', err)
        });
    }
}
