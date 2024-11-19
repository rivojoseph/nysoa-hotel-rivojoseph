import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {TokenService} from "../_services/token.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService:TokenService,
    //private apiErrorService:ApiErrorService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.tokenService.getToken();
    // Si token à insérer dans le header
    if (token!==null){
      let clone = request.clone({
        headers: request.headers.set('Authorization','Bearer '+token)
      });
      return next.handle(clone).pipe(
        catchError(err => {
          if (err.status===403){
            localStorage.removeItem('token');
            this.tokenService.getAndSaveNewToken();
          }
          return throwError('Session expired');
        })
      );
    }
    return next.handle(request);
  }
}

export const TokenInterceptorProvide = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi:true
}
