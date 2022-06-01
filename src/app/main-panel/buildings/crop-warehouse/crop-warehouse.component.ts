import { Component, OnInit } from '@angular/core';
import { cropWarehouseUpgradeMaterialCostByLevels, warehouseStorageByLevel} from 'utils';
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { Building } from '../../classes/Building';

@Component({
  selector: 'app-crop-warehouse',
  templateUrl: './crop-warehouse.component.html',
  styleUrls: ['./crop-warehouse.component.scss']
})
export class CropWarehouseComponent implements OnInit {

  buildingInformation: Building;
  currentMaximumStorage!: number;
  nextLevelMaximumStorage!: number;

  constructor(private userInformationService: UserInformationService) { 
    this.buildingInformation = new Building("cropWarehouse", "Crop Warehouse", this.userInformationService.currentVillage.buildingsLevels.cropWarehouseLevel, 
    "The crop warehouse stores the crop of your village. The higher its level, the more crop you can store.",
    cropWarehouseUpgradeMaterialCostByLevels[this.userInformationService.currentVillage.buildingsLevels.cropWarehouseLevel + 1]);

    this.currentMaximumStorage = warehouseStorageByLevel[this.buildingInformation.level];
    this.nextLevelMaximumStorage = warehouseStorageByLevel[this.buildingInformation.level + 1];
  }

  ngOnInit(): void {
  }

}
