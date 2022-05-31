import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { Building } from '../../classes/Building';

@Component({
  selector: 'app-stone-warehouse',
  templateUrl: './stone-warehouse.component.html',
  styleUrls: ['./stone-warehouse.component.scss']
})
export class StoneWarehouseComponent implements OnInit {

  buildingInformation: Building;
  constructor(private userInformationService: UserInformationService) { 
    this.buildingInformation = new Building("Stone Warehouse", this.userInformationService.currentVillage.buildingsLevels.stoneWarehouseLevel, 
    "The stone warehouse stores the stones of your village. The higher its level, the more stones you can store.");
  }

  ngOnInit(): void {
  }

}
