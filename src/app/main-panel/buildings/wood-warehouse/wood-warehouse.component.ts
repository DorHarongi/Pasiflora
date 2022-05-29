import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { Building } from '../../models/Building';

@Component({
  selector: 'app-wood-warehouse',
  templateUrl: './wood-warehouse.component.html',
  styleUrls: ['./wood-warehouse.component.scss']
})
export class WoodWarehouseComponent implements OnInit {

  buildingInformation: Building;
  constructor(loginService: LoginService) { 
    this.buildingInformation = new Building("Wood Warehouse", loginService.userInformation.villages[0].buildingsLevels.woodWarehouseLevel, 
    "The wood warehouse stores the wood of your village. The higher its level, the more wood you can store.");
  }

  ngOnInit(): void {
  }

}
