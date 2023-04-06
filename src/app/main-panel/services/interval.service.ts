import { Injectable } from '@angular/core';
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { Village } from '../models/Village';
import { energyProductionSpeedPerSecond, maxEnergy, warehouseStorageByLevel } from 'utils';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})

export class IntervalService {

  resourceGatheringInterval!: any;
  getUserInterval!: any;

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
        self.stopIntervals();
      } else {
        //todo research memory leak when switching tabs quickly
        self.userInformationService.updateUser();
        self.startIntervals();
      }
    });
  }

  startIntervals(): void{
    this.startResourceGatheringInterval();
    this.startGetUserInterval();
  }

  stopIntervals(): void{
    clearInterval(this.resourceGatheringInterval);
    clearInterval(this.getUserInterval);
  }

  private startResourceGatheringInterval(): void
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

  private startGetUserInterval() // mainly meant for updating if you got attacked
  {
    clearInterval(this.getUserInterval);
    this.getUserInterval = setInterval(()=>{
      this.userInformationService.updateUser();
    }, 1000 * 10)
  }
}
