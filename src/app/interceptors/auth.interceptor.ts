import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import swal from 'sweetalert2';


/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService, public router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError( e => {
        if(e.status == 401) {
          if (this._authService.isAuthenticated()) {
            this._authService.logout();
          }
          this.router.navigate(['/login']);
          return true;
        }

        if(e.status == 403) {
          swal('Acceso denegado', `${this._authService.usuario.username} no tiene acceso a este recurso`, 'warning');
          this.router.navigate(['/clientes']);
          return true;
        }
        return throwError(e);
      })
    );
  }
}
