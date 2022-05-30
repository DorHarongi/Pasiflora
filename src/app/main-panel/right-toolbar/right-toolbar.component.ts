import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { UserInformationService } from 'src/app/user-information/user-information.service';

@Component({
  selector: 'app-right-toolbar',
  templateUrl: './right-toolbar.component.html',
  styleUrls: ['./right-toolbar.component.scss']
})
export class RightToolbarComponent implements OnInit {

  constructor(private userInformationService: UserInformationService) { }

  cropProduction!: number;
  woodProduction!: number;
  stoneProduction!: number;

  widthStyle = {};

  spearFighters!: number;
  swordFighters!: number;
  axeFighters!: number;
  archers!: number;
  magicians!: number;
  horsemen!: number;
  catapults !: number;


  ngOnInit(): void {
    this.cropProduction = this.userInformationService.currentVillage.cropProductionPerSecond * 3600;
    this.woodProduction = this.userInformationService.currentVillage.woodProductionPerSecond * 3600;
    this.stoneProduction =this.userInformationService.currentVillage.stoneProductionPerSecond * 3600;

    this.spearFighters = this.userInformationService.currentVillage.troops.troop1Amount;
    this.swordFighters = this.userInformationService.currentVillage.troops.troop2Amount;
    this.axeFighters = this.userInformationService.currentVillage.troops.troop3Amount;
    this.archers = this.userInformationService.currentVillage.troops.troop4Amount;
    this.magicians = this.userInformationService.currentVillage.troops.troop5Amount;
    this.horsemen = this.userInformationService.currentVillage.troops.troop6Amount;
    this.catapults = this.userInformationService.currentVillage.troops.troop7Amount;

    this.widthStyle = {
      "width": screen.width - 1296 + "px"
    };

  }
}
