import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../main-panel/models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isloggedIn: boolean;
  userInformation!: User;


  constructor(private http: HttpClient) {
    this.isloggedIn = false;
   }
   

  login(username: string, password: string): Observable<User>
   {
     let observable: Observable<User> = this.http.post<User>("http://localhost:3000/users/login", {
       username: username,
       password: password
     })
      observable.subscribe((user)=>{
        this.isloggedIn = true;
        this.userInformation = user;
    })
    return observable;
    }

   isUserLoggedIn(): boolean {
    return this.isloggedIn;
  }
}
