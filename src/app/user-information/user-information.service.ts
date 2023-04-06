import { Injectable } from '@angular/core';
import { ResourcesAmounts } from '../main-panel/models/resourcesAmounts';
import { User } from '../main-panel/models/User';
import { Village } from '../main-panel/models/Village';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserInformationService {
  userInformation!: User;
  currentVillage!: Village;
  currentVillageIndex!: number;
  villageChanged$: Observable<any>;
  private villageChagnedSubject: Subject<void>;
  
  constructor(private http: HttpClient) {
    this.villageChagnedSubject = new Subject<any>();
    this.villageChanged$ = this.villageChagnedSubject.asObservable();
   }

  setUserInformation(user: User)
  {
    this.userInformation = user;

    if(!this.currentVillage && !this.currentVillageIndex) // first time when loading the app
    {
      this.currentVillage = this.userInformation?.villages[0];
      this.currentVillageIndex = 0;
    }
    else // after a request to the server like training troops
    {
      this.currentVillage = this.userInformation.villages[this.currentVillageIndex];
      this.villageChagnedSubject.next();
    }
  }

  switchVillage(index: number)
  {
    this.requestVillage(index).subscribe((village: Village)=>{
      this.userInformation.villages[index] = village; // get updated village for updated resources, updated troops in case of attack
      this.currentVillageIndex = index;
      this.currentVillage = this.userInformation.villages[index];
      this.villageChagnedSubject.next();
    })
  }

  updateUser(): void
  {
    this.requestUser().subscribe((user: User)=>{
      this.setUserInformation(user);
    })
  }

  private requestVillage(newVillageIndex: number): Observable<Village>
  {
    return this.http.post<Village>("http://localhost:3000/users/village",
    {
      username: this.userInformation.username,
      villageIndex: newVillageIndex,
    });
  }

  private requestUser(): Observable<User>
  {
    let username = this.userInformation.username;
    return this.http.get<User>("http://localhost:3000/users/" + username);
  }

}
