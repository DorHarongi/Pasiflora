import { Component, OnInit } from '@angular/core';
import { quartersUpgradeMaterialCostByLevels } from 'utils';
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { Building } from '../../classes/Building';

@Component({
  selector: 'app-quarters',
  templateUrl: './quarters.component.html',
  styleUrls: ['./quarters.component.scss']
})
export class QuartersComponent implements OnInit {

  buildingInformation: Building;
  constructor(private userInformationService: UserInformationService) { 
    this.buildingInformation = new Building("Quarters", this.userInformationService.currentVillage.buildingsLevels.quartersLevel, 
    "The quarters of your village population. Level it up to increase your maximum population so you can train more troops and workers.",
    quartersUpgradeMaterialCostByLevels[this.userInformationService.currentVillage.buildingsLevels.quartersLevel + 1]);
  }

  ngOnInit(): void {
  }

}
