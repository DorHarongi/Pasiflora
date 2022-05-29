import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { Building } from '../../models/Building';

@Component({
  selector: 'app-stone-mine',
  templateUrl: './stone-mine.component.html',
  styleUrls: ['./stone-mine.component.scss']
})
export class StoneMineComponent implements OnInit {

  buildingInformation: Building;
  constructor(loginService: LoginService) { 
    this.buildingInformation = new Building("Stone Mine", loginService.userInformation.villages[0].buildingsLevels.stoneMineLevel, 
    "The stone mine produces the stones of your village. The higher its level and the more wood workers you employ there, the faster the production is.");
  }

  ngOnInit(): void {
  }

}
