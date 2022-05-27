import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss']
})
export class TopToolbarComponent implements OnInit {

  woodAmount!: number;
  stonesAmount!: number;
  cropAmount!: number;
  math = Math;

  constructor(private loginSevice: LoginService) { 
    this.woodAmount = loginSevice.userInformation.villages[0].resourcesAmounts.woodAmount;
    this.stonesAmount = loginSevice.userInformation.villages[0].resourcesAmounts.stonesAmount;
    this.cropAmount = loginSevice.userInformation.villages[0].resourcesAmounts.cropAmount;
    setInterval(()=>{
      this.woodAmount += loginSevice.userInformation.villages[0].woodProductionPerSecond;
      this.stonesAmount += loginSevice.userInformation.villages[0].stoneProductionPerSecond;
      this.cropAmount += loginSevice.userInformation.villages[0].cropProductionPerSecond;
    }, 1000)
  }

  ngOnInit(): void {
  }

}
