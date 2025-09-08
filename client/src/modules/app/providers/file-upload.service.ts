import { Injectable }      from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class FileUploadService {
    readonly file$       = new BehaviorSubject<File | null>(null);
    readonly previewUrl$ = new BehaviorSubject<string | null>(null);

    selectFile(file: File): void {
        if (!file.type.startsWith('image/')) {
            throw new Error('Invalid file type. Must be an image.');
        }

        const MAX = 5 * 1024 * 1024;

        if (file.size > MAX) {
            throw new Error('Image is too large (max 5 MB).');
        }
        this.file$.next(file);

        const reader  = new FileReader();
        reader.onload = () => this.previewUrl$.next(reader.result as string);
        reader.readAsDataURL(file);
    }

    clear(): void {
        this.file$.next(null);
        this.previewUrl$.next(null);
    }

    buildFormData(dto: any): FormData {
        const fd = new FormData();
        Object.entries(dto).forEach(([key, val]) => {
            if (val !== undefined && val !== null) {
                if (typeof val === 'object') {
                    fd.append(key, JSON.stringify(val)); // nested handled as JSON
                } else {
                    fd.append(key, String(val));
                }
            }
        });
        const file = this.file$.value;
        if (file) {
            fd.append('file', file, file.name);
        }
        return fd;
    }
}
