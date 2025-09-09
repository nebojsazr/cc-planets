import {
    Component,
    Inject,
}                          from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
    MAT_DIALOG_DATA,
    MatDialogModule,
    MatDialogRef,
}                          from '@angular/material/dialog';

export type Action = 'create' | 'edit' | 'delete';

@Component({
    selector:   'app-confirm-dialog',
    template:   `
                    <h2 mat-dialog-title>Confirm {{ data.action }}</h2>
                    <mat-dialog-content>
                        Are you sure you want to {{ data.action }} <strong>{{ data.itemName }}</strong>?
                    </mat-dialog-content>
                    <mat-dialog-actions align="end">
                        <button mat-stroked-button (click)="dialogRef.close(false)">Cancel</button>
                        <button mat-flat-button color="warn" (click)="dialogRef.close(true)">Confirm</button>
                    </mat-dialog-actions>
                `,
    standalone: true,
    imports:    [MatDialogModule, MatButtonModule],
})
export class ConfirmDialogComponent {
    constructor(
        public readonly dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public readonly data: { action: Action; itemName: string },
    ) {}
}