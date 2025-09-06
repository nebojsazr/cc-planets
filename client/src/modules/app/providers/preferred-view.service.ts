import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ViewType = 'table' | 'card';

@Injectable({ providedIn: 'root' })
export class PreferredViewService {
    
    public get currentView(): ViewType {
        return this._view$.value;
    }
    
    private _view$: BehaviorSubject<ViewType> = new BehaviorSubject<ViewType>('table');

    public readonly view$ = this._view$.asObservable();

    public updateView(value: ViewType) {
        this._view$.next(value);
    }
}