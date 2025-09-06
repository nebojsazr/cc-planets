import { AsyncPipe }          from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
}                             from '@angular/core';
import {
    catchError,
    combineLatest,
    filter,
    map,
    Observable,
    of,
    startWith,
}                             from 'rxjs';
import { HeaderStateService } from '../../../app/providers/header-state.service';
import {
    PreferredViewService,
    ViewType,
}                             from '../../../app/providers/preferred-view.service';
import { SearchService }      from '../../../app/providers/search.service';
import {
    PlanetsCardsViewComponent,
    PlanetsTableViewComponent,
}                             from '../../components';
import { ToolbarType }        from '../../model';
import { Planet }             from '../../repository/planet';
import { PlanetsRepository }  from '../../repository/planets.repository';

@Component({
    selector:        'app-browse-planets',
    templateUrl:     './browse-planets.component.html',
    styleUrl:        './browse-planets.component.scss',
    standalone:      true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
        PlanetsTableViewComponent,
        AsyncPipe,
        PlanetsCardsViewComponent,
    ],
})
export class BrowsePlanetsComponent implements OnInit {

    public filteredPlanets$!: Observable<Planet[]>;

    public viewType$: Observable<ViewType> | null = null;

    private planets$!: Observable<Planet[]>;

    constructor(
        private readonly _headerStateService: HeaderStateService,
        private readonly _planetsRepository: PlanetsRepository,
        private readonly _preferredViewService: PreferredViewService,
        private readonly _searchService: SearchService,
    ) {
    }

    public async ngOnInit(): Promise<void> {
        this._headerStateService.updateHeaderState({
            title:       'Planets',
            toolbarType: ToolbarType.BROWSE,
        });

        this.planets$ = this._planetsRepository.getPlanets().pipe(
            filter(planets => !!planets),
            catchError(err => {
                console.error('Failed to load planets', err);
                // return a fallback value so async pipe still works
                return of<Planet[]>([]);
            }),
        );

        this.filteredPlanets$ = combineLatest([
            this.planets$,
            this._searchService.term$.pipe(
                startWith(''),
            ),
        ]).pipe(
            map(([planets, searchTerm]) => {
                if (!searchTerm) {
                    return planets;
                }

                const term = searchTerm.toLowerCase();

                return planets.filter(planet => {
                    return planet.planetName.toLowerCase().includes(term) || planet.description.toLowerCase().includes(term);
                })
            }),
        )

        this.viewType$ = this._preferredViewService.view$;
    }
}
