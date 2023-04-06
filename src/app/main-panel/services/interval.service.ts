import { Injectable } from '@angular/core';
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { Village } from '../models/Village';
import { energyProductionSpeedPerSecond, maxEnergy, warehouseStorageByLevel } from 'utils';
import { User } from '../models/User';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class IntervalService {

  resourceGatheringInterval!: any;

  constructor(private userInformationService: UserInformationService) {
    this.userInformationService.villageChanged$.subscribe(()=>{
      this.startResourceGatheringInterval();
      this.listenToApplicationMinimizing();
    })
   }
  
  listenToApplicationMinimizing(){
    let self = this;
    document.addEventListener("visibilitychange", function() {
      if (document.hidden) {
        clearInterval(self.resourceGatheringInterval);
      } else {
        //todo dont use switch village, make a function for request the entire user.
        self.userInformationService.updateUser();
        self.startResourceGatheringInterval();
      }
    });
  }

  startResourceGatheringInterval(): void
  {
    clearInterval(this.resourceGatheringInterval);
    this.resourceGatheringInterval = setInterval(()=>{
      let currentVillage: Village = this.userInformationService.currentVillage;
      let userInformation: User = this.userInformationService.userInformation;
      let maxWoodStorage: number = warehouseStorageByLevel[currentVillage.buildingsLevels.woodWarehouseLevel];
      let maxStonesStorage: number = warehouseStorageByLevel[currentVillage.buildingsLevels.stoneWarehouseLevel];
      let maxCropStorage: number = warehouseStorageByLevel[currentVillage.buildingsLevels.cropWarehouseLevel];


      currentVillage.resourcesAmounts.woodAmount += currentVillage.woodProductionPerSecond;
      currentVillage.resourcesAmounts.stonesAmount += currentVillage.stoneProductionPerSecond;
      currentVillage.resourcesAmounts.cropAmount += currentVillage.cropProductionPerSecond;
      userInformation.energy += energyProductionSpeedPerSecond;

      if(currentVillage.resourcesAmounts.woodAmount > maxWoodStorage)
        currentVillage.resourcesAmounts.woodAmount = maxWoodStorage;
      if(currentVillage.resourcesAmounts.cropAmount > maxCropStorage)
        currentVillage.resourcesAmounts.cropAmount = maxCropStorage;
      if(currentVillage.resourcesAmounts.stonesAmount > maxStonesStorage)
        currentVillage.resourcesAmounts.stonesAmount = maxStonesStorage;
      if(userInformation.energy > maxEnergy)
        userInformation.energy = maxEnergy;

    }, 1000)
  }
}
