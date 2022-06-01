import { Component, OnInit } from '@angular/core';
import { embassyUpgradeMaterialCostByLevels, embassyMaximumDefenseTroopsByLevels, embassyMinimumLevelForClanJoin } from 'utils';
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { Building } from '../../classes/Building';

@Component({
  selector: 'app-embassy',
  templateUrl: './embassy.component.html',
  styleUrls: ['./embassy.component.scss']
})
export class EmbassyComponent implements OnInit {

  buildingInformation: Building;
  currentMaximumDefenceTroops: number;
  nextLevelMaximumDefenceTroops: number;
  embassyMinimumLevelForClanJoin: number;

  constructor(private userInformationService: UserInformationService) { 
    this.buildingInformation = new Building("Embassy", this.userInformationService.currentVillage.buildingsLevels.embassyLevel, 
    "The embassy is where support troops of your clan live. The higher level your embassy is, the more troops it can store",
    embassyUpgradeMaterialCostByLevels[this.userInformationService.currentVillage.buildingsLevels.embassyLevel + 1]);

    this.currentMaximumDefenceTroops = embassyMaximumDefenseTroopsByLevels[this.userInformationService.currentVillage.buildingsLevels.embassyLevel];
    this.nextLevelMaximumDefenceTroops = embassyMaximumDefenseTroopsByLevels[this.userInformationService.currentVillage.buildingsLevels.embassyLevel + 1];
    this.embassyMinimumLevelForClanJoin = embassyMinimumLevelForClanJoin;
  }

  ngOnInit(): void {
  }

}
