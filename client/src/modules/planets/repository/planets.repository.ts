import { HttpClient } from '@angular/common/http';
import {
    inject,
    Injectable,
}                     from '@angular/core';
import {
    map,
    Observable,
} from 'rxjs';
import { Planet }     from './planet';

@Injectable({providedIn: 'root'})
export class PlanetsRepository {
    private readonly http    = inject(HttpClient);
    private readonly baseUrl = '/api/planets';

    /**
     * Create a new planet
     */
    createPlanet(data: Record<string, any> | FormData): Observable<Planet> {
        return this.http.post<Planet>(this.baseUrl, data);
    }

    /**
     * Update the existing planet
     */
    updatePlanet(id: string, data: Record<string, any> | FormData): Observable<Planet> {
        return this.http.put<Planet>(`${this.baseUrl}/${id}`, data);
    }

    /**
     * Retrieve all planets.
     */
    getPlanets(): Observable<Planet[]> {
        return this.http.get<Planet[]>(this.baseUrl);
    }

    /**
     * Retrieve single planet.
     */
    getSinglePlanets(id: string): Observable<Planet> {
        return this.http.get<Planet>(`${this.baseUrl}/${id}`);
    }

    /**
     * Delete single planet.
     */
    deletePlanet(id: string): Observable<Planet> {
        return this.http.delete<Planet[]>(`${this.baseUrl}/${id}`).pipe(
            map(planets => planets[0]),
        );
    }
}