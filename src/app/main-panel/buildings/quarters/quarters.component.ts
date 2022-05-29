import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { Building } from '../../models/Building';

@Component({
  selector: 'app-quarters',
  templateUrl: './quarters.component.html',
  styleUrls: ['./quarters.component.scss']
})
export class QuartersComponent implements OnInit {

  buildingInformation: Building;
  constructor(loginService: LoginService) { 
    this.buildingInformation = new Building("Quarters", loginService.userInformation.villages[0].buildingsLevels.quartersLevel, 
    "The quarters of your village population. Level it up to increase your maximum population so you can train more troops and workers.");
  }

  ngOnInit(): void {
  }

}
