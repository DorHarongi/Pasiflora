import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { Village } from '../models/Village';
import { quartersPopulationByLevel} from 'utils';

@Component({
  selector: 'app-hire-workers',
  templateUrl: './hire-workers.component.html',
  styleUrls: ['./hire-workers.component.scss']
})
export class HireWorkersComponent implements OnInit {

  @Input()
  workers!: number;

  @Output() onWorkersChange = new EventEmitter<number>();

  maxPossibleWorkers: number;


  constructor(private userInformationService: UserInformationService) { 
    this.maxPossibleWorkers = this.checkFreePopulation();
  }

  ngOnInit(): void {
    this.maxPossibleWorkers += this.workers;
  }

  checkFreePopulation(): number
  {
    let village: Village = this.userInformationService.currentVillage;
    let maximumPopulation: number = quartersPopulationByLevel[village.buildingsLevels.quartersLevel];
    let usedPopulation: number = this.calculateTotalTroops(village) + this.calculateTotalWorkers(village);
    let freePopulation = maximumPopulation - usedPopulation;
    return freePopulation;
  }

  calculateTotalWorkers(village: Village): number
  {
    return village.resourcesWorkers.stoneWorkers + village.resourcesWorkers.woodWorkers + village.resourcesWorkers.cropWorkers;
  }

  calculateTotalTroops(village: Village): number
  {
    return village.troops.archers + village.troops.axeFighters + village.troops.catapults + village.troops.horsemen + village.troops.magicians + village.troops.spearFighters 
    + village.troops.swordFighters;
  }

  workersInputChange(value: number)
  {
    this.workers = this.fixInputValue(value, this.maxPossibleWorkers);
    this.maxPossibleWorkers = this.checkFreePopulation();
    this.onWorkersChange.emit(this.workers);

  }

  fixInputValue(value: number, maxValue: number): number
  {
    let freePoulation: number = maxValue;
    if(value > freePoulation || value < 0)
    {
      return 0;
    }
    return value;
  }

  maxWorkers()
  {
    this.workers = this.maxPossibleWorkers;
    this.maxPossibleWorkers = 0;
    this.onWorkersChange.emit(this.workers);
  }
  

}
