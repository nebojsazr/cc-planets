import {
    FormControl,
    FormGroup,
    Validators,
}                 from '@angular/forms';
import { Planet } from '../repository/planet';

export class PlanetForm extends FormGroup {
    constructor(planet?: Partial<Planet>) {
        super({
            planetName:     new FormControl(planet?.planetName ?? '', {
                nonNullable: true,
                validators:  [Validators.required, Validators.minLength(2), Validators.maxLength(120)],
            }),
            planetColor:    new FormControl(planet?.planetColor ?? '', {
                nonNullable: true,
                validators:  [Validators.required],
            }),
            planetRadiusKM: new FormControl(planet?.planetRadiusKM ?? null, {
                validators: [Validators.required, Validators.min(0)],
            }),
            distFromSun:    new FormControl(planet?.distInMillionsKM?.fromSun ?? null, {
                validators: [Validators.required, Validators.min(0)],
            }),
            distFromEarth:  new FormControl(planet?.distInMillionsKM?.fromEarth ?? null, {
                validators: [Validators.required, Validators.min(0)],
            }),
            description:    new FormControl(planet?.description ?? '', {
                validators: [Validators.maxLength(2000)],
            }),
            // image is handled separately
            image: new FormControl<File | null>(null),
        });
    }

    public toDto(): any {
        const v = this.getRawValue();
        return {
            planetName:       v.planetName.trim(),
            planetColor:      v.planetColor,
            planetRadiusKM:   v.planetRadiusKM,
            distInMillionsKM: {
                fromSun:   v.distFromSun,
                fromEarth: v.distFromEarth,
            },
            description:      v.description?.trim() ?? null,
        };
    }
}
