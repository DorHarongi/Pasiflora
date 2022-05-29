import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { Building } from '../../models/Building';

@Component({
  selector: 'app-stone-warehouse',
  templateUrl: './stone-warehouse.component.html',
  styleUrls: ['./stone-warehouse.component.scss']
})
export class StoneWarehouseComponent implements OnInit {

  buildingInformation: Building;
  constructor(loginService: LoginService) { 
    this.buildingInformation = new Building("Stone Warehouse", loginService.userInformation.villages[0].buildingsLevels.stoneWarehouseLevel, 
    "The stone warehouse stores the stones of your village. The higher its level, the more stones you can store.");
  }

  ngOnInit(): void {
  }

}
