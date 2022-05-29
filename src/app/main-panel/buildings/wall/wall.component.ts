import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { Building } from '../../models/Building';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {

  buildingInformation: Building;
  constructor(loginService: LoginService) { 
    this.buildingInformation = new Building("Wall", loginService.userInformation.villages[0].buildingsLevels.wallLevel, 
    "The wall is your village first layer of defense. The higher level it is, the harder it will be for attackers to reach your village");
  }

  ngOnInit(): void {
  }

}
