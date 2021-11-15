import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './../auth.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // // we can access token by storing the behaviorSubject
    // // into a variable and then by using .value.token over it

    // const user = this.authService.user;
    // if (!user.value) {
    //   return next.handle(req);
    // } else {
    //   const modifiedReq = req.clone({
    //     params: new HttpParams().append('auth', user.value.token),
    //   });
    //   return next.handle(modifiedReq);
    // }

    // // OR By Max Method:
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
