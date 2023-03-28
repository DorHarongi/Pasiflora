import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { BuildingTypes } from '../models/BuildingTypes';
import { Village } from '../models/Village';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit, OnDestroy {

  hoveredBuildingIndex: number = -1;
  village!: Village;
  subscription!: Subscription;
  constructor(private userInformationService: UserInformationService, private router: Router) { }

  ngOnDestroy(): void {
    if(this.subscription)
      this.subscription.unsubscribe();
  }

  ngOnInit(): void
  {
    this.village = this.userInformationService.currentVillage;
    this.subscription = this.userInformationService.villageChanged$.subscribe(()=>{
      this.village = this.userInformationService.currentVillage;
    })
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
