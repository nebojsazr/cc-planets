import { AsyncPipe }            from '@angular/common';
import {
    Component,
    DestroyRef,
    OnInit,
}                               from '@angular/core';
import { MatCardModule }        from '@angular/material/card';
import { ActivatedRoute }       from '@angular/router';
import {
    distinctUntilChanged,
    map,
    Observable,
    switchMap,
    tap,
}                               from 'rxjs';
import { HeaderStateService }   from '../../../app/providers/header-state.service';
import { PreferredViewService } from '../../../app/providers/preferred-view.service';
import { PlanetThumbnailComponent } from '../../components';
import { ToolbarType }          from '../../model';
import { Planet }               from '../../repository/planet';
import { PlanetsRepository }    from '../../repository/planets.repository';

@Component({
    selector:    'app-planet-details-page',
    standalone:  true,
    imports: [
        AsyncPipe,
        MatCardModule,
        PlanetThumbnailComponent,
    ],
    templateUrl: './planet-details-page.component.html',
    styleUrl:    './planet-details-page.component.scss',
})
export class PlanetDetailsPageComponent implements OnInit {

    public planet$: Observable<Planet> | null = null;

    constructor(
        private readonly _headerStateService: HeaderStateService,
        private readonly _planetsRepository: PlanetsRepository,
        private readonly _preferredViewService: PreferredViewService,
        private readonly _route: ActivatedRoute,
        private readonly _destroyRef: DestroyRef,
    ) {
    }

    public ngOnInit(): void {

        this.planet$ = this._route.params.pipe(
            map(params => params['id']),
            distinctUntilChanged(),
            switchMap((id: string) => this._planetsRepository.getSinglePlanets(id)),
            tap(planet => this._headerStateService.headerState.set({
                title: planet.planetName,
                toolbarType: ToolbarType.DETAILS,
                item: planet,
            })),
        )
    }
}
