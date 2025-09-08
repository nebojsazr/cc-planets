import { AsyncPipe }               from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
}                                  from '@angular/core';
import { RouterOutlet }            from '@angular/router';
import { ToolbarType }             from '../planets/model';
import { BrowseToolbarComponent }  from './components/browse-toolbar/browse-toolbar.component';
import { DetailsToolbarComponent } from './components/details-toolbar/details-toolbar.component';
import { HeaderStateService }      from './providers/header-state.service';


@Component({
    selector:        'app-root',
    templateUrl:     './app.component.html',
    styleUrl:        './app.component.scss',
    standalone:      true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
        RouterOutlet,
        AsyncPipe,
        BrowseToolbarComponent,
        DetailsToolbarComponent,
    ],
})
export class AppComponent {
    public ToolbarType = ToolbarType;

    constructor(public headerStateService: HeaderStateService) {
    }
}
