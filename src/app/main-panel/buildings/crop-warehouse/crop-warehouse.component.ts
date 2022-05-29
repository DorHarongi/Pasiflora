import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { Building } from '../../models/Building';

@Component({
  selector: 'app-crop-warehouse',
  templateUrl: './crop-warehouse.component.html',
  styleUrls: ['./crop-warehouse.component.scss']
})
export class CropWarehouseComponent implements OnInit {

  buildingInformation: Building;
  constructor(loginService: LoginService) { 
    this.buildingInformation = new Building("Crop Warehouse", loginService.userInformation.villages[0].buildingsLevels.cropWarehouseLevel, 
    "The crop warehouse stores the crop of your village. The higher its level, the more crop you can store.");
  }

  ngOnInit(): void {
  }

}
