import {
    Injectable,
    signal,
}                      from '@angular/core';
import { ToolbarType } from '../../planets/model';
import { Planet }      from '../../planets/repository/planet';

export interface IHeader {
    title: string;
    toolbarType: ToolbarType,
    item?: Planet,
}

@Injectable({providedIn: 'root'})
export class HeaderStateService {

    public readonly headerState = signal<IHeader | null>(null);

}