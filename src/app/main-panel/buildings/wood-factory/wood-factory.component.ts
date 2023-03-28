import { Component, OnDestroy, OnInit } from '@angular/core';
import { woodFactoryUpgradeMaterialCostByLevels, factoriesProductionSpeedByLevel, singleWorkerProductionSpeedPerSecond } from 'utils';
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { Building } from '../../classes/Building';
import { ResourcesWorkers } from '../../models/resourcesWorkers';
import { User } from '../../models/User';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-wood-factory',
  templateUrl: './wood-factory.component.html',
  styleUrls: ['./wood-factory.component.scss']
})
export class WoodFactoryComponent implements OnInit, OnDestroy {

  buildingInformation: Building;
  currentProductionPerHour: number;
  nextLevelProductionPerHour: number;
  singleWorkerProductionPerHour: number;
  woodWorkers: number;
  subscription!: Subscription;

  constructor(private userInformationService: UserInformationService, private http: HttpClient, private router: Router) {
     
    this.buildingInformation = new Building("woodFactory", "Wood Factory", userInformationService.currentVillage.buildingsLevels.woodFactoryLevel, 
    "The wood factory produces the wood of your village. The higher its level and the more wood workers you employ there, the faster the production is.",
    woodFactoryUpgradeMaterialCostByLevels[this.userInformationService.currentVillage.buildingsLevels.woodFactoryLevel + 1]);

    this.currentProductionPerHour = factoriesProductionSpeedByLevel[this.userInformationService.currentVillage.buildingsLevels.woodFactoryLevel] * 3600;
    this.nextLevelProductionPerHour = factoriesProductionSpeedByLevel[this.userInformationService.currentVillage.buildingsLevels.woodFactoryLevel + 1] * 3600;
    this.singleWorkerProductionPerHour = singleWorkerProductionSpeedPerSecond * 3600;

    this.woodWorkers = this.userInformationService.currentVillage.resourcesWorkers.woodWorkers;
  }
  ngOnDestroy(): void {
    if(this.subscription)
      this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  updateWorkers(workers: number)
  {
    this.woodWorkers = workers;
  }

  hireWorkers()
  {
    let village = this.userInformationService.currentVillage;
    let resourcesWorkers: ResourcesWorkers = new ResourcesWorkers(this.woodWorkers - village.resourcesWorkers.woodWorkers, 0, 0);
    let observable: Observable<User>  = this.http.post<User>("http://localhost:3000/workers",
    {
      username: this.userInformationService.userInformation.username,
      villageIndex: this.userInformationService.currentVillageIndex,
      resourcesWorkers: resourcesWorkers
    });
    this.subscription = observable.subscribe((user: User)=>{
      this.userInformationService.setUserInformation(user);
      this.router.navigateByUrl('home');
    });
  }
}
