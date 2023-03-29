import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { Village } from '../models/Village';

@Component({
  selector: 'app-right-toolbar',
  templateUrl: './right-toolbar.component.html',
  styleUrls: ['./right-toolbar.component.scss']
})
export class RightToolbarComponent implements OnInit, OnDestroy {

  constructor(private userInformationService: UserInformationService) { 

  }
  cropProduction!: number;
  woodProduction!: number;
  stoneProduction!: number;

  widthStyle = {};

  spearFighters!: number;
  swordFighters!: number;
  axeFighters!: number;
  archers!: number;
  magicians!: number;
  horsemen!: number;
  catapults !: number;

  villages: Array<string> = [];
  activeVillage: number = 0;

  subscription!: Subscription;


  ngOnInit(): void {

    this.updateVillage();

    this.villages = this.userInformationService.userInformation.villages.map((village: Village)=>{
      return village.villageName;
    });

    this.widthStyle = {
      "width": screen.width - 1296 + "px"
    };

    this.subscription = this.userInformationService.villageChanged$.subscribe(()=>{
      this.updateVillage();
    })

  }

  ngOnDestroy(): void {
    if(this.subscription)
      this.subscription.unsubscribe();
  }

  updateVillage()
  {
    this.activeVillage = this.userInformationService.currentVillageIndex;

    this.cropProduction = this.userInformationService.currentVillage.cropProductionPerSecond * 3600;
    this.woodProduction = this.userInformationService.currentVillage.woodProductionPerSecond * 3600;
    this.stoneProduction =this.userInformationService.currentVillage.stoneProductionPerSecond * 3600;

    this.spearFighters = this.userInformationService.currentVillage.troops.spearFighters;
    this.swordFighters = this.userInformationService.currentVillage.troops.swordFighters;
    this.axeFighters = this.userInformationService.currentVillage.troops.axeFighters;
    this.archers = this.userInformationService.currentVillage.troops.archers;
    this.magicians = this.userInformationService.currentVillage.troops.magicians;
    this.horsemen = this.userInformationService.currentVillage.troops.horsemen;
    this.catapults = this.userInformationService.currentVillage.troops.catapults;
  }

  switchToVillage(index: number) // clicked on a differnet village
  {
    this.userInformationService.switchVillage(index);
  }
}
