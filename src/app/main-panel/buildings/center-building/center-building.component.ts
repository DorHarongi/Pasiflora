import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { Building } from '../../models/Building';

@Component({
  selector: 'app-center-building',
  templateUrl: './center-building.component.html',
  styleUrls: ['./center-building.component.scss']
})
export class CenterBuildingComponent implements OnInit {

  buildingInformation: Building;
  constructor(loginService: LoginService) { 
    this.buildingInformation = new Building("Center Building", loginService.userInformation.villages[0].buildingsLevels.centerBuildingLevel, 
    "The main building of your village. Level it up to a certain level will make you be able to level up all other buildings to this level. As soon as your main building reaches level 10, You can create another village.");
  }

  ngOnInit(): void {
  }

}
