import { Injectable } from '@angular/core';
import { ResourcesAmounts } from '../main-panel/models/resourcesAmounts';
import { User } from '../main-panel/models/User';
import { Village } from '../main-panel/models/Village';
import { MaterialsCost } from 'utils';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInformationService {
  userInformation!: User;
  currentVillage!: Village;
  currentVillageIndex!: number;
  villageChanged$: Observable<any>;
  private villageChagnedSubject: Subject<void>;
  
  constructor() {
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
      //this.villageChagnedSubject.next();
    }
  }

  updateResourcesAmount(resourcesAmounts: ResourcesAmounts)
  {
    this.currentVillage.resourcesAmounts = resourcesAmounts;
  }

  switchVillage(index: number)
  {
    this.currentVillageIndex = index;
    this.currentVillage = this.userInformation.villages[index];
    this.villageChagnedSubject.next();
  }

}
