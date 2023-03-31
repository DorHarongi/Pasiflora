import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../main-panel/models/User';
import { UserInformationService } from '../user-information/user-information.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isloggedIn: boolean;

  constructor(private http: HttpClient, private userInformationService: UserInformationService, private router: Router) {
    this.isloggedIn = false;
   }
   

  login(username: string, password: string): Observable<User>
   {
     let observable: Observable<User> = this.http.post<User>("http://localhost:3000/users/login", {
       username: username,
       password: password
     });
      observable.subscribe((user: User)=>{
        this.isloggedIn = true;
        this.userInformationService.setUserInformation(user);
        this.router.navigate(['home']);
      });
      return observable;
    }

   isUserLoggedIn(): boolean {
    return this.isloggedIn;
  }
}
