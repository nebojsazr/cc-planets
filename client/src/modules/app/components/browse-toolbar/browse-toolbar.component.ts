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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule }    from '@angular/material/form-field';
import { MatIconModule }         from '@angular/material/icon';
import { MatInputModule }        from '@angular/material/input';
import {
    debounceTime,
    distinctUntilChanged,
    filter,
} from 'rxjs';
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
    ],
    templateUrl:     './browse-toolbar.component.html',
    styleUrl:        './browse-toolbar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseToolbarComponent implements OnInit {

    public preferredView!: ViewType;
    
    public searchControl = new FormControl('');

    constructor(
        private readonly _preferredViewService: PreferredViewService,
        private readonly _searchService: SearchService,
        private readonly _destroyRef: DestroyRef,
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

}
