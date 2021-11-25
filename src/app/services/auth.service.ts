import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    // defining interface AuthResponseData as a response structure we get from firebase
    return (
      this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
          {
            email: email,
            password: password,
            returnSecureToken: true,
          }
        )
        // using .pipe() func to catch the error from server,
        // and passing the modified message to the front-end component
        .pipe(
          catchError(this.handleError),
          tap((resData) => {
            // resData.expiresIn contains token expiry time in seconds as a string,
            // so we added '+' sign before it to convert it to integer form
            this.handleAuthentication(
              resData.email,
              resData.localId,
              resData.idToken,
              +resData.expiresIn
            );
          })
        )
    );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          // resData.expiresIn contains token expiry time in seconds as a string,
          // so we added '+' sign before it to convert it to integer form
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) return;
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      // subtracting Current Time from Expiration Time; here time difference is in miliseconds
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      // setting timeout for auto logout
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  // expirationDuration is in mili-seconds
  autoLogout(expirationDuration: number) {
    console.log('token expiring in: ' + expirationDuration + ' ms');
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    // Multiplying expiresIn with 1000 to convert it into mili-seconds,
    // which can then be added to current Time to get the expiryTime
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    // now updating the current user (subject) with currently logged in user
    this.user.next(user);
    // setting timer for auto logout, duration is passed in miliseconds
    this.autoLogout(expiresIn * 1000);
    // storing user's data in localStorage for auto-login
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unkown error occured!';
    // if response don't contain the conventional error structure
    console.log(errorRes);
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid email / password';
        break;
      case 'USER_DISABLED':
        errorMessage = 'User is disabled';
    }
    return throwError(errorMessage);
  }
}
