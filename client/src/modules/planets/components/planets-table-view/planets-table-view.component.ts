import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    Input,
    OnChanges,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    MatSort,
    MatSortModule,
}                 from '@angular/material/sort';
import {
    MatTableDataSource,
    MatTableModule,
}                 from '@angular/material/table';
import { RouterLink } from '@angular/router';
import {
    firstValueFrom,
    isObservable,
    Observable,
}                 from 'rxjs';
import { Planet } from '../../repository/planet';
import { PlanetThumbnailComponent } from '../planet-thumbnail/planet-thumbnail.component';

@Component({
    selector:        'app-planets-table-view',
    standalone:      true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatTableModule,
        MatSortModule,
        PlanetThumbnailComponent,
        RouterLink,
    ],
    templateUrl:     './planets-table-view.component.html',
    styleUrl:        './planets-table-view.component.scss',
})
export class PlanetsTableViewComponent implements OnChanges, AfterViewInit {

    @Input() planets: Observable<Planet[]> | Planet[] | null = null;

    public planetsSource = new MatTableDataSource<Planet>([]);

    public planetColumns: string[] = [
        'name',
        'color',
        'radius',
        'distSun',
        'distEarth',
    ];

    @ViewChild(MatSort) sortTable!: MatSort;

    constructor(
        private readonly _cdr: ChangeDetectorRef,
        private readonly _destroyRef: DestroyRef,
    ) {}

    public async ngOnChanges(changes: SimpleChanges): Promise<void> {
        if (!changes['planets'] || !this.planets) {
            return;
        }

        if (isObservable(this.planets)) {
            this.planets.pipe(
                takeUntilDestroyed(this._destroyRef),
            ).subscribe(p => {
                this.planetsSource.data = p;
                this._cdr.markForCheck();
            });
            
            return;
        }

        this.planetsSource.data = this.planets;
        this._cdr.markForCheck();
    }

    public ngAfterViewInit(): void {
        this.planetsSource.sortingDataAccessor = (planet, property) => {
            switch (property) {
                case 'name':
                    return planet.planetName;
                case 'color':
                    return planet.planetColor;
                case 'radius':
                    return planet.planetRadiusKM;
                case 'distSun':
                    return planet.distInMillionsKM.fromSun;
                case 'distEarth':
                    return planet.distInMillionsKM.fromEarth;
                default:
                    return '';
            }
        };

        this.planetsSource.sort = this.sortTable;
    }

}
