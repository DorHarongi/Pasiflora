import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-right-toolbar',
  templateUrl: './right-toolbar.component.html',
  styleUrls: ['./right-toolbar.component.scss']
})
export class RightToolbarComponent implements OnInit {

  constructor(private loginService: LoginService) { }

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
    this.cropProduction = this.loginService.userInformation.villages[0].cropProductionPerSecond * 3600;
    this.woodProduction = this.loginService.userInformation.villages[0].woodProductionPerSecond * 3600;
    this.stoneProduction = this.loginService.userInformation.villages[0].stoneProductionPerSecond * 3600;

    this.spearFighters = this.loginService.userInformation.villages[0].troops.troop1Amount;
    this.swordFighters = this.loginService.userInformation.villages[0].troops.troop2Amount;
    this.axeFighters = this.loginService.userInformation.villages[0].troops.troop3Amount;
    this.archers = this.loginService.userInformation.villages[0].troops.troop4Amount;
    this.magicians = this.loginService.userInformation.villages[0].troops.troop5Amount;
    this.horsemen = this.loginService.userInformation.villages[0].troops.troop6Amount;
    this.catapults = this.loginService.userInformation.villages[0].troops.troop7Amount;

    this.widthStyle = {
      "width": screen.width - 1296 + "px"
    };

  }
}
