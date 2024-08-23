import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('token');
  const alertService = inject(AlertService);
  const authService = inject(AuthService);

  let authReq = req; // Inicializa authReq con req por defecto

  // Solo clona la petición y agrega el encabezado si existe el token
  if (authToken) {
    const tokenData = JSON.parse(atob(authToken.split('.')[1]));
    const isTokenExpired = tokenData.exp < Date.now() / 1000;

    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
        ContentType: 'application/json; charset=utf-8'
      }
    });

    return next(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400 && isTokenExpired) {
          alertService.showAlert({ message: 'Sesión expirada. Inicia sesión nuevamente.' });
          authService.logOut();
        }
        return throwError(() => error);
      })
    );
  } else {
    // Si no hay token, simplemente pasa la petición original
    return next(req);
  }
};