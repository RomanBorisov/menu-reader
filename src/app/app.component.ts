import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, MatToolbarModule],
    template: `
        <mat-toolbar color="primary">
            <span>Menu Translator</span>
        </mat-toolbar>
        <router-outlet></router-outlet>
    `
})
export class AppComponent {
}
