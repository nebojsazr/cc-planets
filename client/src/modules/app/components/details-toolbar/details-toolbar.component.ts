import { DialogModule }              from '@angular/cdk/dialog';
import {
    Component,
    DestroyRef,
    Input,
}                                    from '@angular/core';
import { takeUntilDestroyed }        from '@angular/core/rxjs-interop';
import { MatButtonModule }           from '@angular/material/button';
import { MatDialog }                 from '@angular/material/dialog';
import { Router }                    from '@angular/router';
import { PlanetFormDialogComponent } from '../../../planets/components';
import { Planet }                    from '../../../planets/repository/planet';
import { PlanetsRepository }         from '../../../planets/repository/planets.repository';
import { ConfirmDialogComponent }    from '../confirm-dialog/confirm-dialog.component';

@Component({
    selector:    'app-details-toolbar',
    standalone:  true,
    imports:     [MatButtonModule, DialogModule],
    templateUrl: './details-toolbar.component.html',
    styleUrl:    './details-toolbar.component.scss',
})
export class DetailsToolbarComponent {

    @Input() planet!: Planet;

    constructor(
        private readonly _dialog: MatDialog,
        private readonly _repository: PlanetsRepository,
        private readonly _destroyRef: DestroyRef,
        private readonly _router: Router,
    ) {
    }

    public onDelete() {
        const confirmRef = this._dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data:  {
                action:   'delete',
                itemName: this.planet.planetName || 'planet',
            },
        });

        confirmRef.afterClosed().subscribe((confirmed: boolean) => {
            this._repository.deletePlanet(this.planet.id).pipe(
                takeUntilDestroyed(this._destroyRef),
            ).subscribe(planet => {
                console.info(planet.planetName + ' has been deleted.');
                this._router.navigate(['/']);
            })
        });
    }

    openEditDialog(): void {
        const dialogRef = this._dialog.open(PlanetFormDialogComponent, {
            width:        '600px',
            disableClose: true,
            data:         {mode: 'edit', planet: this.planet},
        });

        dialogRef.afterClosed().subscribe((result?: Planet) => {
            if (result) {
                console.info('Planet updated:', result);
                const currentUrl = this._router.url;
                // In real world this would be updating a state
                this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                    this._router.navigateByUrl(currentUrl);
                });
            }
        });
    }

}
