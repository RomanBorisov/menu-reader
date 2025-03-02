import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MenuService } from '../services/menu.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-dish-details',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatChipsModule],
    template: `
        <div
            class="dish-container"
            *ngIf="dish$ | async as dish"
        >
            <div class="image-gallery">
                <img
                    *ngFor="let image of dish.images"
                    [src]="image"
                    [alt]="dish.name"
                >
            </div>

            <mat-card>
                <mat-card-header>
                    <mat-card-title>{{ dish.name }}</mat-card-title>
                    <mat-card-subtitle>{{ dish.price }}</mat-card-subtitle>
                </mat-card-header>

                <mat-card-content>
                    <h3>Description</h3>
                    <p class="description">{{ dish.description }}</p>

                    <h3>Ingredients</h3>
                    <mat-chip-set>
                        <mat-chip *ngFor="let ingredient of dish.ingredients">
                            {{ ingredient }}
                        </mat-chip>
                    </mat-chip-set>

                    <h3>Allergens</h3>
                    <mat-chip-set>
                        <mat-chip
                            *ngFor="let allergen of dish.allergens"
                            color="warn"
                        >
                            {{ allergen }}
                        </mat-chip>
                    </mat-chip-set>

                    <h3>History</h3>
                    <p class="history">{{ dish.history }}</p>
                </mat-card-content>
            </mat-card>
        </div>
    `,
    styles: [
        `
            .dish-container {
                padding: 16px;
                max-width: 800px;
                margin: 0 auto;
            }

            .image-gallery {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 16px;
                margin-bottom: 24px;
            }

            .image-gallery img {
                width: 100%;
                height: 200px;
                object-fit: cover;
                border-radius: 8px;
            }

            .description, .history {
                margin: 16px 0;
                line-height: 1.6;
            }

            h3 {
                margin-top: 24px;
                margin-bottom: 8px;
            }

            mat-chip-set {
                margin: 8px 0;
            }
        `
    ]
})
export class DishDetailsComponent implements OnInit {
    private route = inject(ActivatedRoute);

    private menuService = inject(MenuService);

    dish$ = this.route.paramMap.pipe(
        switchMap(params => {
            const dishName = atob(params.get('id') || '');
            return this.menuService.menuData$.pipe(
                map(menu => {
                    if (!menu) {
                        return null;
                    }
                    for (const category of menu.categories) {
                        const found = category.items.find(item => item.name === dishName);
                        if (found) {
                            return found;
                        }
                    }
                    return null;
                })
            );
        })
    );

    constructor() {
    }

    ngOnInit() {
        // Load dish details from service using route params
    }
} 
