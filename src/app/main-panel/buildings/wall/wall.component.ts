import { Component, OnInit } from '@angular/core';
import { wallUpgradeMaterialCostByLevels } from 'utils';
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { Building } from '../../classes/Building';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {

  buildingInformation: Building;
  constructor(private userInformationService: UserInformationService) { 
    this.buildingInformation = new Building("Wall", this.userInformationService.currentVillage.buildingsLevels.wallLevel, 
    "The wall is your village first layer of defense. The higher level it is, the harder it will be for attackers to reach your village",
    wallUpgradeMaterialCostByLevels[this.userInformationService.currentVillage.buildingsLevels.wallLevel + 1]);
  }

  ngOnInit(): void {
  }

}
