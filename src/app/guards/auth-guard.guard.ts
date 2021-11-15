import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // since canActivate can return Observable, Promise, UrlTree;
    // we can't return Subject or subscription here. So we are
    // transforming the BehaviorSubject's response through pipe and map
    // into an observable return
    return this.authService.user.pipe(
      take(1), // take the latest user's vale and get unsubscribe
      map((user) => {
        // !!user if (user is null) === !(user == null) = false
        // !!user if (user is not null) === !(user != null) = true
        const isAuth = !!user;
        if (isAuth) {
          return true;
        } else {
          // if auth is expired, we can redirect user
          // to auth screen instead of the targeted screen
          return this.router.createUrlTree(['/auth']);
        }
      })
    );
  }
}
