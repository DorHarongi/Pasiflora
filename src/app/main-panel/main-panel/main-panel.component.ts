import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
import { BuildingsLevels } from '../models/buildingsLevels';
import { BuildingTypes } from '../models/BuildingTypes';
import { Village } from '../models/Village';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit {

  hoveredBuildingIndex: number = -1;
  village!: Village;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void
  {
    this.village = this.loginService.userInformation.villages[0];
  }

  handleClickedBuilding(index: number)
  {
    this.router.navigateByUrl("/" + BuildingTypes[index]);
  }

  handleHoveredBuilding(event: any, index: number)
  {
    this.hoveredBuildingIndex = index;
  }

  handleMouseLeave()
  {
    this.hoveredBuildingIndex = -1;
  }

  print(event: any) // for building polygons around buiildings
  {
    // console.log(event.clientX + "," + event.clientY);
  }

}
