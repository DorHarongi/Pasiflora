import { Component, OnInit } from '@angular/core';
import { stoneWarehouseUpgradeMaterialCostByLevels, warehouseStorageByLevel } from 'utils';
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { Building } from '../../classes/Building';

@Component({
  selector: 'app-stone-warehouse',
  templateUrl: './stone-warehouse.component.html',
  styleUrls: ['./stone-warehouse.component.scss']
})
export class StoneWarehouseComponent implements OnInit {

  buildingInformation: Building;
  currentMaximumStorage!: number;
  nextLevelMaximumStorage!: number;

  constructor(private userInformationService: UserInformationService) { 
    this.buildingInformation = new Building("stoneWarehouse", "Stone Warehouse", this.userInformationService.currentVillage.buildingsLevels.stoneWarehouseLevel, 
    "The stone warehouse stores the stones of your village. The higher its level, the more stones you can store.",
    stoneWarehouseUpgradeMaterialCostByLevels[this.userInformationService.currentVillage.buildingsLevels.stoneWarehouseLevel + 1]);

    this.currentMaximumStorage = warehouseStorageByLevel[this.buildingInformation.level];
    this.nextLevelMaximumStorage = warehouseStorageByLevel[this.buildingInformation.level + 1];
  }

  ngOnInit(): void {
  }

}
