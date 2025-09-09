import { AsyncPipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    Input,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
    isObservable,
    Observable,
    of,
}                    from 'rxjs';
import { Planet }    from '../../repository/planet';
import { PlanetCardComponent } from '../planet-card/planet-card.component';

@Component({
    selector:    'app-planets-cards-view',
    standalone:  true,
    imports: [
        AsyncPipe,
        PlanetCardComponent,
        RouterLink,
    ],
    templateUrl: './planets-cards-view.component.html',
    styleUrl:    './planets-cards-view.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetsCardsViewComponent implements OnChanges {

    @Input()
    public planets: Observable<Planet[]> | Planet[] | null = null;

    public planets$!: Observable<Planet[]>;

    constructor( private readonly _destroyRef: DestroyRef ) {}

    public async ngOnChanges(changes: SimpleChanges): Promise<void> {
        if (!changes['planets'] || !this.planets) {
            return;
        }

        if (isObservable(this.planets)) {
            this.planets$ = this.planets;
            return;
        }

        this.planets$ = of(this.planets);
    }

}
