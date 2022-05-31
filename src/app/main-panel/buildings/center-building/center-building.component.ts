import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { Building } from '../../classes/Building';

@Component({
  selector: 'app-center-building',
  templateUrl: './center-building.component.html',
  styleUrls: ['./center-building.component.scss']
})
export class CenterBuildingComponent implements OnInit {

  buildingInformation: Building;
  constructor(private userInformationService: UserInformationService) { 
    this.buildingInformation = new Building("Center Building", this.userInformationService.currentVillage.buildingsLevels.centerBuildingLevel, 
    "The main building of your village. Level it up to a certain level will make you be able to level up all other buildings to this level. As soon as your main building reaches level 10, You can create another village.");
  }

  ngOnInit(): void {
  }

}
