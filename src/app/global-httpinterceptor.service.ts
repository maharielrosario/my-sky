import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GlobalHTTPInterceptorService implements HttpInterceptor {
  constructor(public router: Router) {}
  intercept(
    req: HttpRequest<Record<string, unknown>>,
    next: HttpHandler
  ): Observable<HttpEvent<Record<string, unknown>>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('A client side error happened: ', error);
          } else {
            // The backend returned an unsuccessful response code.
            console.error(
              `A backend error happened. Error status : ${error.status} ${error.statusText}`
            );
            // TODO: Create switch case for 404 error -@Mahariel at 1/20/2021, 3:14:23 PM
          }
        } else {
          console.error('An unexpected happened', error);
        }
        return throwError(error);
      })
    );
  }
}
