import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { ResourcesAmounts } from '../models/resourcesAmounts';

@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss']
})
export class TopToolbarComponent implements OnInit {

  woodAmount!: number;
  stonesAmount!: number;
  cropAmount!: number;
  math = Math;

  constructor(private userInformationService: UserInformationService) { 
    this.woodAmount = this.userInformationService.currentVillage.resourcesAmounts.woodAmount;
    this.stonesAmount = this.userInformationService.currentVillage.resourcesAmounts.stonesAmount;
    this.cropAmount = this.userInformationService.currentVillage.resourcesAmounts.cropAmount;
    setInterval(()=>{
      this.woodAmount += this.userInformationService.currentVillage.woodProductionPerSecond;
      this.stonesAmount += this.userInformationService.currentVillage.stoneProductionPerSecond;
      this.cropAmount += this.userInformationService.currentVillage.cropProductionPerSecond;

      this.userInformationService.updateResourcesAmount(new ResourcesAmounts(this.woodAmount, this.stonesAmount, this.cropAmount));

    }, 1000)
  }

  ngOnInit(): void {
  }

}
