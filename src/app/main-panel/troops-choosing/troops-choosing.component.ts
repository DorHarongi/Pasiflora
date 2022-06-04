import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { TroopsAmounts } from '../models/troopsAmounts';
import { spearFighterMinimumArsenalLevel, swordFighterMinimumArsenalLevel, axeFighterMinimumArsenalLevel,
  archerMinimumArsenalLevel, magicianMinimumArsenalLevel, horsemenMinimumArsenalLevel, catapultsMinimumArsenalLevel,
  spearFighterAttackingStat, spearFighterDefenceStat, swordFighterAttackingStat, swordFighterDefenceStat, axeFighterAttackingStat, axeFighterDefenceStat,
  archerAttackingStat, archerDefenceStat, magicianAttackingStat, magicianDefenceStat, horsemenAttackingStat, horsemenDefenceStat, catapultsAttackingStat, 
  catapultsDefenceStat,
  quartersPopulationByLevel } from 'utils'
import { Village } from '../models/Village';

@Component({
  selector: 'app-troops-choosing',
  templateUrl: './troops-choosing.component.html',
  styleUrls: ['./troops-choosing.component.scss']
})
export class TroopsChoosingComponent implements OnInit {

  @Output() onTroopsChange = new EventEmitter<TroopsAmounts>();

  constructor(private userInformationService: UserInformationService, private changeDetector: ChangeDetectorRef) { 
    this.canTrainSpearFighters = this.userInformationService.currentVillage.buildingsLevels.arsenalLevel >= spearFighterMinimumArsenalLevel;
    this.canTrainSwordFighters = this.userInformationService.currentVillage.buildingsLevels.arsenalLevel >= swordFighterMinimumArsenalLevel;
    this.canTrainAxeFighters = this.userInformationService.currentVillage.buildingsLevels.arsenalLevel >= axeFighterMinimumArsenalLevel;
    this.canTrainArchers = this.userInformationService.currentVillage.buildingsLevels.arsenalLevel >= archerMinimumArsenalLevel;
    this.canTrainMagicians = this.userInformationService.currentVillage.buildingsLevels.arsenalLevel >= magicianMinimumArsenalLevel;
    this.canTrainHorsemen = this.userInformationService.currentVillage.buildingsLevels.arsenalLevel >= horsemenMinimumArsenalLevel;
    this.canTrainCatapults = this.userInformationService.currentVillage.buildingsLevels.arsenalLevel >= catapultsMinimumArsenalLevel;
    
  }

  troops: TroopsAmounts = new TroopsAmounts(0, 0, 0, 0, 0, 0, 0);
  spearFighterAttackingStat: number = spearFighterAttackingStat;
  spearFighterDefenceStat: number = spearFighterDefenceStat;
  swordFighterAttackingStat: number = swordFighterAttackingStat;
  swordFighterDefenceStat: number = swordFighterDefenceStat;
  axeFighterAttackingStat: number = axeFighterAttackingStat;
  axeFighterDefenceStat: number = axeFighterDefenceStat;
  archerAttackingStat: number = archerAttackingStat;
  archerDefenceStat: number = archerDefenceStat;
  magicianAttackingStat: number = magicianAttackingStat;
  magicianDefenceStat: number = magicianDefenceStat;
  horsemenAttackingStat: number = horsemenAttackingStat;
  horsemenDefenceStat: number = horsemenDefenceStat;
  catapultsAttackingStat: number = catapultsAttackingStat;
  catapultsDefenceStat: number = catapultsDefenceStat;


  canTrainSpearFighters: boolean;
  canTrainSwordFighters: boolean;
  canTrainAxeFighters: boolean;
  canTrainArchers: boolean;
  canTrainMagicians: boolean;
  canTrainHorsemen: boolean;
  canTrainCatapults: boolean;


  ngOnInit(): void {
  }

  checkFreePopulation(): number
  {
    let village: Village = this.userInformationService.currentVillage;
    let maximumPopulation: number = quartersPopulationByLevel[village.buildingsLevels.quartersLevel];
    let usedPopulation: number = this.calculateTotalTroops(village) + this.calculateTotalWorkers(village);
    let freePopulation = maximumPopulation - usedPopulation;
    if(freePopulation <= 0) // only needed because there is a bug with ngmodel - can be remove after fixed
      return 0;
    return freePopulation;
  }

  calculateTotalWorkers(village: Village)
  {
    return village.resourcesWorkers.cropWorkers + village.resourcesWorkers.stoneWorkers + village.resourcesWorkers.woodWorkers;
  }

  calculateTotalTroops(village: Village)
  {
    return village.troops.archers + village.troops.axeFighters + village.troops.catapults + village.troops.horsemen + village.troops.magicians + village.troops.spearFighters 
    + village.troops.swordFighters + 
    this.troops.archers + this.troops.axeFighters + this.troops.catapults + this.troops.horsemen + this.troops.magicians + this.troops.spearFighters + this.troops.swordFighters;
  }

  spearFightersInputChange(value: any)
  {
    this.troops.spearFighters = this.fixInputValue(value, this.troops.spearFighters);
    this.changeDetector.detectChanges();
    this.onTroopsChange.emit(this.troops);
  }

  swordFightersInputChange(value: any)
  {
    this.troops.swordFighters = this.fixInputValue(value, this.troops.swordFighters);
    this.changeDetector.detectChanges();
    this.onTroopsChange.emit(this.troops);
  }

  axeFightersInputChange(value: any)
  {
    this.troops.axeFighters = this.fixInputValue(value, this.troops.axeFighters);
    this.changeDetector.detectChanges();
    this.onTroopsChange.emit(this.troops);
  }

  archersInputChange(value: any)
  {
    this.troops.archers = this.fixInputValue(value, this.troops.archers);
    this.changeDetector.detectChanges();
    this.onTroopsChange.emit(this.troops);
  }

  magiciansInputChange(value: any)
  {
    this.troops.magicians = this.fixInputValue(value, this.troops.magicians);
    this.changeDetector.detectChanges();
    this.onTroopsChange.emit(this.troops);
  }

  horsemenInputChange(value: any)
  {
    this.troops.horsemen = this.fixInputValue(value, this.troops.horsemen);
    this.changeDetector.detectChanges();
    this.onTroopsChange.emit(this.troops);
  }
  
  catapultsInputChange(value: any)
  {
    this.troops.catapults = this.fixInputValue(value, this.troops.catapults);
    this.changeDetector.detectChanges();
    this.onTroopsChange.emit(this.troops);
  }
  
  fixInputValue(value: number, oldValue: number): number
  {
    let freePoulation: number = this.checkFreePopulation() + oldValue;
    console.log(freePoulation);
    if(value > freePoulation)
    {
      return freePoulation;
    }
    return value;
  }

}
