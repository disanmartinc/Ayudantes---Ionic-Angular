import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { registerLocaleData } from '@angular/common'; // Importar registro de locales
import localeEsCL from '@angular/common/locales/es-CL'; // Localización para Chile
import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';

addIcons(allIcons);

// Registrar localización para Chile
registerLocaleData(localeEsCL, 'es-CL');


bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
})
  .catch(err => {
    console.error('Error durante el arranque de la aplicación:', err);
  });