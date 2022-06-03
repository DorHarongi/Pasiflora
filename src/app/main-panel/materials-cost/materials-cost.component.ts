import { Component, Input, OnInit } from '@angular/core';
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { MaterialsCost } from 'utils';

@Component({
  selector: 'app-materials-cost',
  templateUrl: './materials-cost.component.html',
  styleUrls: ['./materials-cost.component.scss']
})
export class MaterialsCostComponent implements OnInit {

  @Input() materialsCost!: MaterialsCost;

  constructor(private userInformationService: UserInformationService) { }

  ngOnInit(): void {
  }

  checkIfEnoughWoodToUpgrade(): boolean
  {
    return this.userInformationService.currentVillage.resourcesAmounts.woodAmount >= this.materialsCost.wood;
  }

  checkIfEnoughCropToUpgrade(): boolean
  {
    return this.userInformationService.currentVillage.resourcesAmounts.cropAmount >= this.materialsCost.crop;
  }

  checkIfEnoughStonesToUpgrade(): boolean
  {
    return this.userInformationService.currentVillage.resourcesAmounts.stonesAmount >= this.materialsCost.stones;
  }

}
