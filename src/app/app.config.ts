import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideAnimations} from '@angular/platform-browser/animations'
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './Interceptors/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { requestInterceptor } from './Interceptors/request.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';

export const appConfig: ApplicationConfig = {providers: [provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, requestInterceptor])),
    provideAnimations()]};




// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     provideHttpClient([
//       { provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true },
//       { provide: HTTP_INTERCEPTORS, useClass: requestInterceptor, multi: true }
//     ]),
//     provideAnimations()
//   ]
// };



// 

//{provide:HTTP_INTERCEPTORS,useClass:authInterceptor,multi:true},
//          {provide:HTTP_INTERCEPTORS,useValue:requestInterceptor,multi:true},




// bootstrapApplication(AppComponent, {
//     imports: [HttpClientModule],
//     providers: [
//         provideHttpClient(withInterceptors([LoggingInterceptor])) // Chain your interceptors here
//     ]
// })
