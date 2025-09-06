import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes,
}                   from '@angular/router';

export const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'planets',
        pathMatch: 'full'
    },
    {
        path: 'planets',
        loadChildren: (): Promise<any> => import('../planets/planets.routes').then((r: any) => r.PLANETS_ROUTES),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
