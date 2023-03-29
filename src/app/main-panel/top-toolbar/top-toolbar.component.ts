import { Component, OnDestroy, OnInit } from '@angular/core';
import { warehouseStorageByLevel, quartersPopulationByLevel } from 'utils';
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { ResourcesAmounts } from '../models/resourcesAmounts';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Village } from '../models/Village';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss']
})
export class TopToolbarComponent implements OnInit, OnDestroy {

  woodAmount!: number;
  stonesAmount!: number;
  cropAmount!: number;

  maxWoodStorage: number = 0;
  maxStonesStorage: number = 0;
  maxCropStorage: number = 0;
  
  maximumPopulation: number = 0;
  usedPopulation: number = 0;
  math = Math;

  interval: any;
  subscription!: Subscription;

  constructor(private userInformationService: UserInformationService, private router: Router) { 
    this.updateVillage();
  }
  
  ngOnDestroy(): void {
    clearInterval(this.interval);
    if(this.subscription)
      this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.userInformationService.villageChanged$.subscribe(()=>{
      clearInterval(this.interval); // clear previous village interval
      this.updateVillage();
    })
  }


  calculateTotalWorkers(village: Village)
  {
    return village.resourcesWorkers.cropWorkers + village.resourcesWorkers.stoneWorkers + village.resourcesWorkers.woodWorkers;
  }

  calculateTotalTroops(village: Village)
  {
    return village.troops.archers + village.troops.axeFighters + village.troops.catapults + village.troops.horsemen + village.troops.magicians + village.troops.spearFighters 
    + village.troops.swordFighters;
  }

  goToStatistics()
  {
    this.router.navigate(['Statistics']);
  }

  goToMessages()
  {
    this.router.navigate(['Messages']);
  }

  updateVillage()
  {
    let village: Village = this.userInformationService.currentVillage;
    this.woodAmount = village.resourcesAmounts.woodAmount;
    this.stonesAmount = village.resourcesAmounts.stonesAmount;
    this.cropAmount = village.resourcesAmounts.cropAmount;
    this.interval = setInterval(()=>{
      this.woodAmount += village.woodProductionPerSecond;
      this.stonesAmount += village.stoneProductionPerSecond;
      this.cropAmount += village.cropProductionPerSecond;

      if(this.woodAmount > this.maxWoodStorage)
        this.woodAmount = this.maxWoodStorage;
      if(this.cropAmount > this.maxCropStorage)
        this.cropAmount = this.maxCropStorage;
      if(this.stonesAmount > this.maxStonesStorage)
        this.stonesAmount = this.maxStonesStorage;

      this.userInformationService.updateResourcesAmount(new ResourcesAmounts(this.woodAmount, this.stonesAmount, this.cropAmount));

    }, 1000)

    this.maxWoodStorage = warehouseStorageByLevel[village.buildingsLevels.woodWarehouseLevel];
    this.maxStonesStorage = warehouseStorageByLevel[village.buildingsLevels.stoneWarehouseLevel];
    this.maxCropStorage = warehouseStorageByLevel[village.buildingsLevels.cropWarehouseLevel];

    this.maximumPopulation = quartersPopulationByLevel[village.buildingsLevels.quartersLevel];
    this.usedPopulation = this.calculateTotalTroops(village) + this.calculateTotalWorkers(village);
  }

}
