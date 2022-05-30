import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { Building } from '../../models/Building';

@Component({
  selector: 'app-stone-mine',
  templateUrl: './stone-mine.component.html',
  styleUrls: ['./stone-mine.component.scss']
})
export class StoneMineComponent implements OnInit {

  buildingInformation: Building;
  constructor(private userInformationService: UserInformationService) { 
    this.buildingInformation = new Building("Stone Mine", this.userInformationService.currentVillage.buildingsLevels.stoneMineLevel, 
    "The stone mine produces the stones of your village. The higher its level and the more wood workers you employ there, the faster the production is.");
  }

  ngOnInit(): void {
  }

}
