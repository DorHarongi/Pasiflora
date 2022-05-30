import { Injectable } from '@angular/core';
import { ResourcesAmounts } from '../main-panel/models/resourcesAmounts';
import { User } from '../main-panel/models/User';
import { Village } from '../main-panel/models/Village';

@Injectable({
  providedIn: 'root'
})
export class UserInformationService {
  userInformation!: User;
  currentVillage!: Village;
  
  constructor() { }

  setUserInformation(user: User)
  {
    this.userInformation = user;
    this.currentVillage = this.userInformation?.villages[0];
  }

  updateResourcesAmount(resourcesAmounts: ResourcesAmounts)
  {
    this.currentVillage.resourcesAmounts = resourcesAmounts;
  }
}
