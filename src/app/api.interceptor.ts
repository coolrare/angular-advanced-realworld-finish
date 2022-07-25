import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if(token) {
      const newRequest = request.clone({
        setHeaders:{
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}
