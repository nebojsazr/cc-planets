import { NgOptimizedImage } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
}                           from '@angular/core';
import { Planet }           from '../../repository/planet';

@Component({
    selector:        'app-planet-thumbnail',
    standalone:      true,
    imports:         [
        NgOptimizedImage,
    ],
    templateUrl:     './planet-thumbnail.component.html',
    styleUrl:        './planet-thumbnail.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetThumbnailComponent {

    public get sizeValue(): number {
        return this.sizeMap[this.size];
    }

    @Input()
    public planet!: Planet;

    @Input()
    public size: 'small' | 'medium' | 'large' = 'medium';

    private readonly sizeMap: Record<'small' | 'medium' | 'large', number> = {
        small: 3.5,
        medium: 6.25,
        large: 10
    };

}
