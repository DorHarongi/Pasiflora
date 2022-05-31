import { Component, OnInit } from '@angular/core';
import { woodWarehouseUpgradeMaterialCostByLevels} from 'utils';
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { Building } from '../../classes/Building';

@Component({
  selector: 'app-crop-farm',
  templateUrl: './crop-farm.component.html',
  styleUrls: ['./crop-farm.component.scss']
})
export class CropFarmComponent implements OnInit {

  buildingInformation: Building;
  constructor(private userInformationService: UserInformationService) { 
    this.buildingInformation = new Building("Crop Farm", this.userInformationService.currentVillage.buildingsLevels.cropFarmLevel, 
    "The crop farm produces the crop of your village. The higher its level and the more crop workers you employ there, the faster the production is.",
    woodWarehouseUpgradeMaterialCostByLevels[this.userInformationService.currentVillage.buildingsLevels.woodWarehouseLevel + 1]);
  }

  ngOnInit(): void {
  }

}
