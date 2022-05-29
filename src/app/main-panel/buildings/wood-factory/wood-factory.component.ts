import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { Building } from '../../models/Building';

@Component({
  selector: 'app-wood-factory',
  templateUrl: './wood-factory.component.html',
  styleUrls: ['./wood-factory.component.scss']
})
export class WoodFactoryComponent implements OnInit {

  buildingInformation: Building;
  constructor(loginService: LoginService) { 
    this.buildingInformation = new Building("Wood Factory", loginService.userInformation.villages[0].buildingsLevels.woodFactoryLevel, 
    "The wood factory produces the wood of your village. The higher its level and the more wood workers you employ there, the faster the production is.");
  }

  ngOnInit(): void {
  }

}
