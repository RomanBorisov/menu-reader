import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-image',
    imports: [],
    templateUrl: './image.component.html',
    styleUrl: './image.component.scss'
})
export class ImageComponent {
    @Input({ required: true }) src!: string;

    @Input() alt: string | null = null;
}
