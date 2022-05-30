import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { Building } from '../../models/Building';

@Component({
  selector: 'app-wood-warehouse',
  templateUrl: './wood-warehouse.component.html',
  styleUrls: ['./wood-warehouse.component.scss']
})
export class WoodWarehouseComponent implements OnInit {

  buildingInformation: Building;
  constructor(private userInformationService: UserInformationService) { 
    this.buildingInformation = new Building("Wood Warehouse", this.userInformationService.currentVillage.buildingsLevels.woodWarehouseLevel, 
    "The wood warehouse stores the wood of your village. The higher its level, the more wood you can store.");
  }

  ngOnInit(): void {
  }

}
