import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-image',
    imports: [],
    templateUrl: './image.component.html',
    styleUrl: './image.component.scss'
})
export class ImageComponent {
    @Input({ required: true }) public src!: string;

    @Input() public alt: string | null = null;
}
