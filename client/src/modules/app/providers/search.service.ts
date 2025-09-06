import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {
    private readonly _term = new BehaviorSubject<string>('');
    public readonly term$ = this._term.asObservable();

    update(term: string) {
        this._term.next(term);
    }
}