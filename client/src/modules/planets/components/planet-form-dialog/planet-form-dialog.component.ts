import {
    AsyncPipe,
    UpperCasePipe,
}                              from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    TemplateRef,
    ViewChild,
}                              from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule }     from '@angular/material/button';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogModule,
    MatDialogRef,
}                              from '@angular/material/dialog';
import { MatFormFieldModule }  from '@angular/material/form-field';
import { MatInputModule }      from '@angular/material/input';
import {
    MatSnackBar,
    MatSnackBarModule,
}                              from '@angular/material/snack-bar';
import {
    finalize,
    Observable,
}                              from 'rxjs';
import { ConfirmDialogComponent } from '../../../app/components/confirm-dialog/confirm-dialog.component';
import { FileUploadService }   from '../../../app/providers/file-upload.service';
import { PlanetForm }          from '../../forms/planet.form';
import { Planet }              from '../../repository/planet';
import { PlanetsRepository }   from '../../repository/planets.repository';

type DialogData = { planet?: Planet };
type Mode = 'update' | 'create';

@Component({
    selector:        'app-planet-form-dialog',
    templateUrl:     './planet-form-dialog.component.html',
    styleUrls:       ['./planet-form-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone:      true,
    imports:         [
        ReactiveFormsModule,
        MatDialogModule,
        AsyncPipe,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        UpperCasePipe,
    ],
})
export class PlanetFormDialogComponent {

    public readonly form: PlanetForm;
    public readonly mode: Mode;
    public isSubmitting = false;

    public previewUrl$: Observable<string | null>;

    constructor(
        private readonly _dialogRef: MatDialogRef<PlanetFormDialogComponent, Planet | null>,
        private readonly _repository: PlanetsRepository,
        private readonly _fileUpload: FileUploadService,
        private readonly _dialog: MatDialog,
        private snack: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data?: DialogData,
    ) {
        this.form        = new PlanetForm(this.data?.planet);
        this.mode        = this.data?.planet ? 'update' : 'create'
        this.previewUrl$ = this._fileUpload.previewUrl$;
    }

    onFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files?.length) {
            try {
                this._fileUpload.selectFile(input.files![0]);
                this.form.get('image')?.setValue(input.files![0]);
            } catch (err: any) {
                this.snack.open(err.message, 'Close', {duration: 3000});
            }
        }
    }

    removeImage() {
        this._fileUpload.clear();
        this.form.get('image')?.reset();
    }

    submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const confirmRef = this._dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {
                action: this.mode,
                itemName: this.form.value.planetName || 'planet'
            }
        });

        confirmRef.afterClosed().subscribe((confirmed: boolean) => {
            if (!confirmed) return;

            this.isSubmitting = true;
            const dto         = this.form.toDto();
            const payload     = this._fileUpload.file$.value
                ? this._fileUpload.buildFormData(dto)
                : dto;

            const request$ =
                      this.mode === 'create'
                          ? this._repository.createPlanet(payload)
                          : this._repository.updatePlanet(this.data!.planet!.id, payload);

            request$
                .pipe(finalize(() => (this.isSubmitting = false)))
                .subscribe({
                    next:  (saved) => this._dialogRef.close(saved),
                    error: () => this.snack.open('Failed to save planet', 'Close', {duration: 3000}),
                });
        });
    }

    cancel() {
        this._dialogRef.close(null);
    }
}

