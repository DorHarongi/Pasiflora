import { Component, OnInit } from '@angular/core';
import { woodFactoryUpgradeMaterialCostByLevels } from 'utils';
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { Building } from '../../classes/Building';

@Component({
  selector: 'app-wood-factory',
  templateUrl: './wood-factory.component.html',
  styleUrls: ['./wood-factory.component.scss']
})
export class WoodFactoryComponent implements OnInit {

  buildingInformation: Building;
  constructor(private userInformationService: UserInformationService) { 
    this.buildingInformation = new Building("Wood Factory", userInformationService.currentVillage.buildingsLevels.woodFactoryLevel, 
    "The wood factory produces the wood of your village. The higher its level and the more wood workers you employ there, the faster the production is.",
    woodFactoryUpgradeMaterialCostByLevels[this.userInformationService.currentVillage.buildingsLevels.woodFactoryLevel + 1]);
  }

  ngOnInit(): void {
  }

}
