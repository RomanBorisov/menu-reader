import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { Menu, MenuItem } from '../interfaces/menu.interface';
import { MenuService } from '../services/menu.service';

@Component({
    selector: 'app-menu-list',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatExpansionModule],
    template: `
    <div class="menu-container">
      <mat-accordion>
        <mat-expansion-panel *ngFor="let category of (menu$ | async)?.categories || []">
          <mat-expansion-panel-header>
            <mat-panel-title>{{category.name}}</mat-panel-title>
          </mat-expansion-panel-header>
          
          <div class="items-grid">
            <mat-card *ngFor="let item of category.items" 
                      (click)="openDishDetails(item)">
              <img mat-card-image [src]="item.images?.[0]" 
                   alt="{{item.name}}" *ngIf="item.images?.length">
              <mat-card-content>
                <h3>{{item.name}}</h3>
                <p class="price">{{item.price}}</p>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-expansion-panel>
      </mat-accordion>
    </div>
  `,
    styles: [
        `
    .menu-container {
      padding: 16px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .items-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 16px;
      margin-top: 16px;
    }
    mat-card {
      cursor: pointer;
    }
    .price {
      font-weight: bold;
      color: #666;
    }
  `
    ]
})
export class MenuListComponent implements OnInit {
    private menuService = inject(MenuService);

    menu$ = this.menuService.menuData$;

    constructor(
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.menu$.subscribe((menu: Menu | null) => {
            if (!menu) {
                this.router.navigate(['/']);
            }
        });
    }

    openDishDetails(item: MenuItem) {
        // Store the item in service or pass via state
        this.router.navigate(['/dish', btoa(item.name)]);
    }
} 
