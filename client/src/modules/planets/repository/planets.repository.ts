import { HttpClient }      from '@angular/common/http';
import {
    inject,
    Injectable,
}                          from '@angular/core';
import { Observable }      from 'rxjs';
import { Planet }          from './planet';
import { CreatePlanetDto } from './planet.dto';

@Injectable({providedIn: 'root'})
export class PlanetsRepository {
    private readonly http    = inject(HttpClient);
    private readonly baseUrl = '/api/planets';

    /**
     * Create a new planet
     */
    createPlanet(data: CreatePlanetDto | FormData): Observable<Planet> {
        return this.http.post<Planet>(this.baseUrl, data);
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
}