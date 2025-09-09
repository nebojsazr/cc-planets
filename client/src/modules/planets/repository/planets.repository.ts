import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    map,
    Observable,
}                     from 'rxjs';
import { Planet }     from './planet';

@Injectable({providedIn: 'root'})
export class PlanetsRepository {

    private readonly _baseUrl = '/api/planets'; // This should be environment

    constructor(private readonly _http: HttpClient) {
    }

    /**
     * Create a new planet
     */
    public createPlanet(data: Record<string, any> | FormData): Observable<Planet> {
        return this._http.post<Planet>(this._baseUrl, data);
    }

    /**
     * Update the existing planet
     */
    public updatePlanet(id: string, data: Record<string, any> | FormData): Observable<Planet> {
        return this._http.put<Planet>(`${this._baseUrl}/${id}`, data);
    }

    /**
     * Retrieve all planets.
     */
    public getPlanets(): Observable<Planet[]> {
        return this._http.get<Planet[]>(this._baseUrl);
    }

    /**
     * Retrieve single planet.
     */
    public getSinglePlanets(id: string): Observable<Planet> {
        return this._http.get<Planet>(`${this._baseUrl}/${id}`);
    }

    /**
     * Delete single planet.
     */
    public deletePlanet(id: string): Observable<Planet> {
        return this._http.delete<Planet[]>(`${this._baseUrl}/${id}`).pipe(
            map(planets => planets[0]),
        );
    }
}