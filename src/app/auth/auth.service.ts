import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({providedIn:'root'})

export class AuthService{
    constructor(private http: HttpClient){}

    signin(username:string, password:string){
      return this.http.post(
            'LOGIN_API',
            {
                username: username,
                password:password
            }
        )
    }
}