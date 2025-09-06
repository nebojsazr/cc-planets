import { provideHttpClient }    from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations }    from '@angular/platform-browser/animations';
import { provideRouter }        from '@angular/router';
import { APP_ROUTES }           from './modules/app/app-routing.module';
import { AppComponent }         from './modules/app/app.component';

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter([...APP_ROUTES]),
        provideHttpClient(),
        provideAnimations(),
    ],
}).catch(err => console.error(err));
