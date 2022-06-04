import { Component, OnInit } from '@angular/core';
import { cropFarmUpgradeMaterialCostByLevels, factoriesProductionSpeedByLevel, singleWorkerProductionSpeedPerSecond} from 'utils';
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { Building } from '../../classes/Building';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ResourcesWorkers } from '../../models/resourcesWorkers';
import { User } from '../../models/User';

@Component({
  selector: 'app-crop-farm',
  templateUrl: './crop-farm.component.html',
  styleUrls: ['./crop-farm.component.scss']
})
export class CropFarmComponent implements OnInit {

  buildingInformation: Building;
  currentProductionPerHour: number;
  nextLevelProductionPerHour: number;
  singleWorkerProductionPerHour: number;
  cropWorkers: number;

  constructor(private userInformationService: UserInformationService, private http: HttpClient, private router: Router) {

    this.buildingInformation = new Building("cropFarm", "Crop Farm", this.userInformationService.currentVillage.buildingsLevels.cropFarmLevel, 
    "The crop farm produces the crop of your village. The higher its level and the more crop workers you employ there, the faster the production is.",
    cropFarmUpgradeMaterialCostByLevels[this.userInformationService.currentVillage.buildingsLevels.cropFarmLevel + 1]);

    this.currentProductionPerHour = factoriesProductionSpeedByLevel[this.userInformationService.currentVillage.buildingsLevels.cropFarmLevel] * 3600;
    this.nextLevelProductionPerHour = factoriesProductionSpeedByLevel[this.userInformationService.currentVillage.buildingsLevels.cropFarmLevel + 1] * 3600;
    this.singleWorkerProductionPerHour = singleWorkerProductionSpeedPerSecond * 3600;

    this.cropWorkers = this.userInformationService.currentVillage.resourcesWorkers.cropWorkers;
  }

  ngOnInit(): void {
  }

  updateWorkers(workers: number)
  {
    this.cropWorkers = workers;
  }

  hireWorkers()
  {
    let village = this.userInformationService.currentVillage;
    let resourcesWorkers: ResourcesWorkers = new ResourcesWorkers(0, 0, this.cropWorkers - village.resourcesWorkers.cropWorkers);
    this.http.post<User>("http://192.168.1.168:3000/workers",
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
