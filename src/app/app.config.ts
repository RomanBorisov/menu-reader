import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker';
import { InitService } from './services/init.service';
import { APP_INITIALIZER, ApplicationConfig, inject, isDevMode, provideZoneChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideAnimations(),
        provideHttpClient(),
        provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
        }),
        {
            provide: APP_INITIALIZER,
            useFactory: () => {
                const service = inject(InitService);

                return () => service.init();
            },
            multi: true
        }
    ]
};
