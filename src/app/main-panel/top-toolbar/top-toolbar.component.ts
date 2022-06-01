import { Component, OnDestroy, OnInit } from '@angular/core';
import { warehouseStorageByLevel } from 'utils';
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { ResourcesAmounts } from '../models/resourcesAmounts';

@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss']
})
export class TopToolbarComponent implements OnInit, OnDestroy {

  woodAmount!: number;
  stonesAmount!: number;
  cropAmount!: number;

  maxWoodStorage: number;
  maxStonesStorage: number;
  maxCropStorage: number;
  
  math = Math;

  interval;

  constructor(private userInformationService: UserInformationService) { 
    this.woodAmount = this.userInformationService.currentVillage.resourcesAmounts.woodAmount;
    this.stonesAmount = this.userInformationService.currentVillage.resourcesAmounts.stonesAmount;
    this.cropAmount = this.userInformationService.currentVillage.resourcesAmounts.cropAmount;
    this.interval = setInterval(()=>{
      this.woodAmount += this.userInformationService.currentVillage.woodProductionPerSecond;
      this.stonesAmount += this.userInformationService.currentVillage.stoneProductionPerSecond;
      this.cropAmount += this.userInformationService.currentVillage.cropProductionPerSecond;

      if(this.woodAmount > this.maxWoodStorage)
        this.woodAmount = this.maxWoodStorage;
      if(this.cropAmount > this.maxCropStorage)
        this.cropAmount = this.maxCropStorage;
      if(this.stonesAmount > this.maxStonesStorage)
        this.stonesAmount = this.maxStonesStorage;

      this.userInformationService.updateResourcesAmount(new ResourcesAmounts(this.woodAmount, this.stonesAmount, this.cropAmount));

    }, 1000)

    this.maxWoodStorage = warehouseStorageByLevel[this.userInformationService.currentVillage.buildingsLevels.woodWarehouseLevel];
    this.maxStonesStorage = warehouseStorageByLevel[this.userInformationService.currentVillage.buildingsLevels.stoneWarehouseLevel];
    this.maxCropStorage = warehouseStorageByLevel[this.userInformationService.currentVillage.buildingsLevels.cropWarehouseLevel];

  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  ngOnInit(): void {
  }

}
