import {
    Injectable,
    signal,
    Signal,
} from '@angular/core';
import {
    Observable,
    Subject,
} from 'rxjs';
import { ToolbarType } from '../../planets/model';

export interface IHeader {
    title: string;
    toolbarType: ToolbarType
}

@Injectable({ providedIn: 'root' })
export class HeaderStateService {
    
    private readonly _headerState = signal<IHeader | null>(null);
    
    readonly headerState = this._headerState.asReadonly();
    
    public updateHeaderState(headerState: IHeader): void {
        this._headerState.set(headerState);
    }
}