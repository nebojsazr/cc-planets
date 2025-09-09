import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    FormControl,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
    MatDialog,
    MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule }    from '@angular/material/form-field';
import { MatIconModule }         from '@angular/material/icon';
import { MatInputModule }        from '@angular/material/input';
import { Router } from '@angular/router';
import {
    debounceTime,
    distinctUntilChanged,
    filter,
} from 'rxjs';
import { PlanetFormDialogComponent } from '../../../planets/components/planet-form-dialog/planet-form-dialog.component';
import { Planet } from '../../../planets/repository/planet';
import {
    PreferredViewService,
    ViewType,
}                                from '../../providers/preferred-view.service';
import { SearchService } from '../../providers/search.service';

@Component({
    selector:        'app-browse-toolbar',
    standalone:      true,
    imports:         [
        MatButtonToggleModule,
        MatIconModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
    ],
    templateUrl:     './browse-toolbar.component.html',
    styleUrl:        './browse-toolbar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseToolbarComponent implements OnInit {

    public preferredView!: ViewType;
    
    public searchControl: FormControl = new FormControl('');

    constructor(
        private readonly _preferredViewService: PreferredViewService,
        private readonly _searchService: SearchService,
        private readonly _destroyRef: DestroyRef,
        private readonly _dialog: MatDialog,
        private readonly _router: Router,
    ) {}

    public ngOnInit(): void {
        // Set initial value for view
        this.preferredView = this._preferredViewService.currentView;
        
        // trigger chared observable on search change
        this.searchControl.valueChanges.pipe(
            // filter((val: string | null) => !!val && val.length >= 3),
            debounceTime(300),
            distinctUntilChanged(),
            takeUntilDestroyed(this._destroyRef),
        ).subscribe((val: string | null) => this._searchService.update(val || ''));
    }

    public onViewChange(viewType: ViewType): void {
        this._preferredViewService.updateView(viewType)
    }

    public openCreateDialog(): void {
        const dialogRef = this._dialog.open(PlanetFormDialogComponent, {
            width: '600px',
            disableClose: true,
            data: { mode: 'create' }
        });

        dialogRef.afterClosed().subscribe((result?: Planet) => {
            if (result) {
                // In real world scenario this would be updating a state
                const currentUrl = this._router.url;
                this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                    this._router.navigateByUrl(currentUrl);
                });
            }
        });
    }

}
