import { Component, OnInit } from '@angular/core';
import { woodWarehouseUpgradeMaterialCostByLevels} from 'utils';
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { Building } from '../../classes/Building';

@Component({
  selector: 'app-stone-mine',
  templateUrl: './stone-mine.component.html',
  styleUrls: ['./stone-mine.component.scss']
})
export class StoneMineComponent implements OnInit {

  buildingInformation: Building;
  constructor(private userInformationService: UserInformationService) { 
    this.buildingInformation = new Building("Stone Mine", this.userInformationService.currentVillage.buildingsLevels.stoneMineLevel, 
    "The stone mine produces the stones of your village. The higher its level and the more wood workers you employ there, the faster the production is.",
    woodWarehouseUpgradeMaterialCostByLevels[this.userInformationService.currentVillage.buildingsLevels.woodWarehouseLevel + 1]);
  }

  ngOnInit(): void {
  }

}
