import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { Building } from '../../models/Building';

@Component({
  selector: 'app-embassy',
  templateUrl: './embassy.component.html',
  styleUrls: ['./embassy.component.scss']
})
export class EmbassyComponent implements OnInit {

  buildingInformation: Building;
  constructor(loginService: LoginService) { 
    this.buildingInformation = new Building("Embassy", loginService.userInformation.villages[0].buildingsLevels.embassyLevel, 
    "The embassy is where support troops of your clan live. The higher level your embassy is, the more troops it can store");
  }

  ngOnInit(): void {
  }

}
