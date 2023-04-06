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

  updateResourcesAmount(resourcesAmounts: ResourcesAmounts)
  {
    this.currentVillage.resourcesAmounts = resourcesAmounts;
  }

  updateEnergy(energy: number){
    this.userInformation.energy = energy;
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

  requestVillage(newVillageIndex: number): Observable<Village>
  {
    return this.http.post<Village>("http://localhost:3000/users/village",
    {
      username: this.userInformation.username,
      villageIndex: newVillageIndex,
    });
  }

}
