import { Component, OnInit } from '@angular/core';
import { stoneMineUpgradeMaterialCostByLevels, factoriesProductionSpeedByLevel, singleWorkerProductionSpeedPerSecond} from 'utils';
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { Building } from '../../classes/Building';
import { ResourcesWorkers } from '../../models/resourcesWorkers';
import { User } from '../../models/User';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stone-mine',
  templateUrl: './stone-mine.component.html',
  styleUrls: ['./stone-mine.component.scss']
})
export class StoneMineComponent implements OnInit {

  buildingInformation: Building;
  currentProductionPerHour: number;
  nextLevelProductionPerHour: number;
  singleWorkerProductionPerHour: number;
  stoneWorkers: number;

  constructor(private userInformationService: UserInformationService, private http: HttpClient, private router: Router) {
    
    this.buildingInformation = new Building("stoneMine", "Stone Mine", this.userInformationService.currentVillage.buildingsLevels.stoneMineLevel, 
    "The stone mine produces the stones of your village. The higher its level and the more wood workers you employ there, the faster the production is.",
    stoneMineUpgradeMaterialCostByLevels[this.userInformationService.currentVillage.buildingsLevels.stoneMineLevel + 1]);

    this.currentProductionPerHour = factoriesProductionSpeedByLevel[this.userInformationService.currentVillage.buildingsLevels.stoneMineLevel] * 3600;
    this.nextLevelProductionPerHour = factoriesProductionSpeedByLevel[this.userInformationService.currentVillage.buildingsLevels.stoneMineLevel + 1] * 3600;
    this.singleWorkerProductionPerHour = singleWorkerProductionSpeedPerSecond * 3600;

    this.stoneWorkers = this.userInformationService.currentVillage.resourcesWorkers.stoneWorkers;
  }

  ngOnInit(): void {
  }

  updateWorkers(workers: number)
  {
    this.stoneWorkers = workers;
  }

  hireWorkers()
  {
    let village = this.userInformationService.currentVillage;
    let resourcesWorkers: ResourcesWorkers = new ResourcesWorkers(0,this.stoneWorkers - village.resourcesWorkers.stoneWorkers, 0);
    this.http.post<User>("http://localhost:3000/workers",
    {
      username: this.userInformationService.userInformation.username,
      villageIndex: this.userInformationService.currentVillageIndex,
      resourcesWorkers: resourcesWorkers
    }).subscribe((user: User)=>{
      this.userInformationService.setUserInformation(user);
      this.router.navigateByUrl('home');
    })
  }

}
