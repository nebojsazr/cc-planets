import { Routes } from '@angular/router';
import {
    BrowsePlanetsComponent,
    PlanetDetailsPageComponent,
}                 from './pages';

export const PLANETS_ROUTES: Routes = [
    {
        path:      '',
        component: BrowsePlanetsComponent,
    },
    {
        path:      ':id',
        component: PlanetDetailsPageComponent,
    },
]
