import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { environment } from 'environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsers() {
    const url = environment.USERS_API;
    return this.http
      .get(url)

      .pipe
      // other operators can add here
      ();
  }
}
