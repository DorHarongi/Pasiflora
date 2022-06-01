import { Component, OnInit } from '@angular/core';
import { arsenalUpgradeMaterialCostByLevels, troopUnlockByLevel } from 'utils'
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { Building } from '../../classes/Building';

@Component({
  selector: 'app-arsenal',
  templateUrl: './arsenal.component.html',
  styleUrls: ['./arsenal.component.scss']
})
export class ArsenalComponent implements OnInit {

  buildingInformation: Building;
  nextLevelUnlock: string;

  constructor(private userInformationService: UserInformationService) { 
    this.buildingInformation = new Building("arsenal", "Arsenal", this.userInformationService.currentVillage.buildingsLevels.arsenalLevel,
    "In the arsenal you can train your army troops. Level up your arsenal to unlock new troops",
    arsenalUpgradeMaterialCostByLevels[this.userInformationService.currentVillage.buildingsLevels.arsenalLevel + 1]);
    this.nextLevelUnlock = troopUnlockByLevel[this.userInformationService.currentVillage.buildingsLevels.arsenalLevel + 1];
  }

  ngOnInit(): void {
  }

}
