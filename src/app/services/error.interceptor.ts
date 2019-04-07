import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log(request)
    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
      // console.log(err)
      if (err.status === 403 && request.url.includes('admin')) {
        console.log('403 admin')
        this.authService.logout();
        this.router.navigate(['/login-admin'])
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}