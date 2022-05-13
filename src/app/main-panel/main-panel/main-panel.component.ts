import { Component, OnInit } from '@angular/core';
import { BuildingTypes } from './models/BuildingTypes';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit {

  hoveredBuildingIndex: number = -1;
  //hoveredBuilding: string = "";
  selectedClass = "selectedBuilding";
  // hoveredBuildingNameStyle: object = {};

  constructor() { }

  ngOnInit(): void {
  }

  handleClickedBuilding(index: number)
  {
    console.log(BuildingTypes[index]);
  }

  handleHoveredBuilding(event: any, index: number)
  {
    //this.hoveredBuilding = BuildingTypes[index].toString();
    // this.hoveredBuildingNameStyle = {
    //   'left.px': event.pageX,
    //   'top.px': event.pageY
    // };
    // console.log(this.hoveredBuildingNameStyle);

    this.hoveredBuildingIndex = index;

  }

  handleMouseLeave()
  {
    this.hoveredBuildingIndex = -1;
    //this.hoveredBuilding = "";
  }

  print(event: any)
  {
    // console.log(event.clientX + "," + event.clientY);
  }

}
