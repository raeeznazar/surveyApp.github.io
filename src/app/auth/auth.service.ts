import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment.prod';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject(null);
  constructor(private http: HttpClient, private router: Router) {}

  ///signin data from API  , observable
  signin(username: string, password: string) {
    return this.http
      .post(environment.LOGIN_API, {
        username: username,
        password: password,
      })
      .pipe(
        tap((resData) => {
          const user = resData;
          this.user.next(user);

          ////store user in the local storage for auto login
          localStorage.setItem('userData', JSON.stringify(user));
        })
      );
  }

  ///autologin

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loaderUser = userData;

    if (loaderUser.token) {
      this.user.next(loaderUser);
    }
  }

  // Logout method
  logout() {
    this.user.next(null);
    this.router.navigate(['auth']);
    localStorage.removeItem('userData');
  }

  autoLogout(expirationDuration:number){
    setTimeout(()=>{
      
    })
  }
}
