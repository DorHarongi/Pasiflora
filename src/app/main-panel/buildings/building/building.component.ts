import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { Building } from '../../classes/Building';
import { User } from '../../models/User';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss'],
})
export class BuildingComponent implements OnInit {

  constructor(private router: Router, private userInformationService: UserInformationService, private http:HttpClient) { }

  @Input()
  building!: Building;
  

  ngOnInit(): void {
  }

  goBack()
  {
    this.router.navigateByUrl('home');
  }

  upgrade(): void{
    if(this.checkIfEnoughMaterialsToUpgrade())
    {
      this.http.post<User>("http://192.168.1.168:3000/buildings-upgrading/upgradeBuilding",
      {
        username: this.userInformationService.userInformation.username,
        villageIndex: this.userInformationService.currentVillageIndex,
        buildingName: this.building.name
      }).subscribe((user: User)=>{
        this.userInformationService.setUserInformation(user);
        this.router.navigateByUrl('home');
      })
    }
  }

  checkIfEnoughWoodToUpgrade(): boolean
  {
    return this.userInformationService.currentVillage.resourcesAmounts.woodAmount >= this.building.levelUpMaterialCost.wood;
  }

  checkIfEnoughCropToUpgrade(): boolean
  {
    return this.userInformationService.currentVillage.resourcesAmounts.cropAmount >= this.building.levelUpMaterialCost.crop;
  }

  checkIfEnoughStonesToUpgrade(): boolean
  {
    return this.userInformationService.currentVillage.resourcesAmounts.stonesAmount >= this.building.levelUpMaterialCost.stones;
  }

  checkIfEnoughMaterialsToUpgrade(): boolean
  {
    return this.checkIfEnoughWoodToUpgrade() && this.checkIfEnoughCropToUpgrade() && this.checkIfEnoughStonesToUpgrade();
  }

}
