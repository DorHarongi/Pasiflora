import { Component, OnInit } from '@angular/core';
import { embassyUpgradeMaterialCostByLevels } from 'utils';
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { Building } from '../../classes/Building';

@Component({
  selector: 'app-embassy',
  templateUrl: './embassy.component.html',
  styleUrls: ['./embassy.component.scss']
})
export class EmbassyComponent implements OnInit {

  buildingInformation: Building;
  constructor(private userInformationService: UserInformationService) { 
    this.buildingInformation = new Building("Embassy", this.userInformationService.currentVillage.buildingsLevels.embassyLevel, 
    "The embassy is where support troops of your clan live. The higher level your embassy is, the more troops it can store",
    embassyUpgradeMaterialCostByLevels[this.userInformationService.currentVillage.buildingsLevels.embassyLevel + 1]);
  }

  ngOnInit(): void {
  }

}
