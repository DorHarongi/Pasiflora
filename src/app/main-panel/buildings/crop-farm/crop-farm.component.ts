import { Component, OnInit } from '@angular/core';
import { cropFarmUpgradeMaterialCostByLevels, factoriesProductionSpeedByLevel, singleWorkerProductionSpeedPerSecond} from 'utils';
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { Building } from '../../classes/Building';

@Component({
  selector: 'app-crop-farm',
  templateUrl: './crop-farm.component.html',
  styleUrls: ['./crop-farm.component.scss']
})
export class CropFarmComponent implements OnInit {

  buildingInformation: Building;
  currentProductionPerHour: number;
  nextLevelProductionPerHour: number;
  singleWorkerProductionPerHour: number;

  constructor(private userInformationService: UserInformationService) { 
    this.buildingInformation = new Building("cropFarm", "Crop Farm", this.userInformationService.currentVillage.buildingsLevels.cropFarmLevel, 
    "The crop farm produces the crop of your village. The higher its level and the more crop workers you employ there, the faster the production is.",
    cropFarmUpgradeMaterialCostByLevels[this.userInformationService.currentVillage.buildingsLevels.cropFarmLevel + 1]);

    this.currentProductionPerHour = factoriesProductionSpeedByLevel[this.userInformationService.currentVillage.buildingsLevels.cropFarmLevel] * 3600;
    this.nextLevelProductionPerHour = factoriesProductionSpeedByLevel[this.userInformationService.currentVillage.buildingsLevels.cropFarmLevel + 1] * 3600;
    this.singleWorkerProductionPerHour = singleWorkerProductionSpeedPerSecond * 3600;
  }

  ngOnInit(): void {
  }

}
