import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { arsenalUpgradeMaterialCostByLevels, troopUnlockByLevel, spearFighterMinimumArsenalLevel, swordFighterMinimumArsenalLevel, axeFighterMinimumArsenalLevel,
         archerMinimumArsenalLevel, magicianMinimumArsenalLevel, horsemenMinimumArsenalLevel, catapultsMinimumArsenalLevel, MaterialsCost,
         swordFighterMaterialsCost, spearFighterMaterialsCost, axeFighterMaterialsCost, archerMaterialsCost, magicianMaterialsCost, horsemenMaterialsCost, catapultsMaterialsCost,
         spearFighterAttackingStat, spearFighterDefenceStat, swordFighterAttackingStat, swordFighterDefenceStat, axeFighterAttackingStat, axeFighterDefenceStat,
         archerAttackingStat, archerDefenceStat, magicianAttackingStat, magicianDefenceStat, horsemenAttackingStat, horsemenDefenceStat, catapultsAttackingStat, 
         catapultsDefenceStat,
         quartersPopulationByLevel } from 'utils'
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { Building } from '../../classes/Building';
import { TroopsAmounts } from '../../models/troopsAmounts';
import { User } from '../../models/User';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Village } from '../../models/Village';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-arsenal',
  templateUrl: './arsenal.component.html',
  styleUrls: ['./arsenal.component.scss']
})
export class ArsenalComponent implements OnInit {

  buildingInformation: Building;
  nextLevelUnlock: string;

  troops: TroopsAmounts = new TroopsAmounts(0, 0, 0, 0, 0, 0, 0);

  canTrainSpearFighters: boolean;
  canTrainSwordFighters: boolean;
  canTrainAxeFighters: boolean;
  canTrainArchers: boolean;
  canTrainMagicians: boolean;
  canTrainHorsemen: boolean;
  canTrainCatapults: boolean;

  totalMaterialsCost: MaterialsCost = {wood: 0, stones: 0, crop: 0};

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


  constructor(private userInformationService: UserInformationService, private http:HttpClient, private router: Router, private changerDector: ChangeDetectorRef) { 

    this.buildingInformation = new Building("arsenal", "Arsenal", this.userInformationService.currentVillage.buildingsLevels.arsenalLevel,
    "In the arsenal you can train your army troops. Level up your arsenal to unlock new troops",
    arsenalUpgradeMaterialCostByLevels[this.userInformationService.currentVillage.buildingsLevels.arsenalLevel + 1]);
    this.nextLevelUnlock = troopUnlockByLevel[this.userInformationService.currentVillage.buildingsLevels.arsenalLevel + 1];

    this.canTrainSpearFighters = this.userInformationService.currentVillage.buildingsLevels.arsenalLevel >= spearFighterMinimumArsenalLevel;
    this.canTrainSwordFighters = this.userInformationService.currentVillage.buildingsLevels.arsenalLevel >= swordFighterMinimumArsenalLevel;
    this.canTrainAxeFighters = this.userInformationService.currentVillage.buildingsLevels.arsenalLevel >= axeFighterMinimumArsenalLevel;
    this.canTrainArchers = this.userInformationService.currentVillage.buildingsLevels.arsenalLevel >= archerMinimumArsenalLevel;
    this.canTrainMagicians = this.userInformationService.currentVillage.buildingsLevels.arsenalLevel >= magicianMinimumArsenalLevel;
    this.canTrainHorsemen = this.userInformationService.currentVillage.buildingsLevels.arsenalLevel >= horsemenMinimumArsenalLevel;
    this.canTrainCatapults = this.userInformationService.currentVillage.buildingsLevels.arsenalLevel >= catapultsMinimumArsenalLevel;
  }

  ngOnInit(): void {
  }

  spearFightersInputChange(value: any)
  {
    this.troops.spearFighters = this.fixInputValue(value, this.troops.spearFighters);
    this.changerDector.detectChanges();
    this.updateMaterialsCost();
  }

  swordFightersInputChange(value: any)
  {
    this.troops.swordFighters = this.fixInputValue(value, this.troops.swordFighters);
    this.changerDector.detectChanges();
    this.updateMaterialsCost();
  }

  axeFightersInputChange(value: any)
  {
    this.troops.axeFighters = this.fixInputValue(value, this.troops.axeFighters);
    this.changerDector.detectChanges();
    this.updateMaterialsCost();
  }

  archersInputChange(value: any)
  {
    this.troops.archers = this.fixInputValue(value, this.troops.archers);
    this.changerDector.detectChanges();
    this.updateMaterialsCost();
  }

  magiciansInputChange(value: any)
  {
    this.troops.magicians = this.fixInputValue(value, this.troops.magicians);
    this.changerDector.detectChanges();
    this.updateMaterialsCost();
  }

  horsemenInputChange(value: any)
  {
    this.troops.horsemen = this.fixInputValue(value, this.troops.horsemen);
    this.changerDector.detectChanges();
    this.updateMaterialsCost();
  }
  
  catapultsInputChange(value: any)
  {
    this.troops.catapults = this.fixInputValue(value, this.troops.catapults);
    this.changerDector.detectChanges();
    this.updateMaterialsCost();
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

  updateMaterialsCost()
  {
    this.totalMaterialsCost.wood =
     spearFighterMaterialsCost.wood * this.troops.spearFighters +
     swordFighterMaterialsCost.wood * this.troops.swordFighters +
     axeFighterMaterialsCost.wood * this.troops.axeFighters +
     archerMaterialsCost.wood * this.troops.archers +
     magicianMaterialsCost.wood * this.troops.magicians +
     horsemenMaterialsCost.wood * this.troops.horsemen +
     catapultsMaterialsCost.wood * this.troops.catapults;

     this.totalMaterialsCost.stones =
     spearFighterMaterialsCost.stones * this.troops.spearFighters +
     swordFighterMaterialsCost.stones * this.troops.swordFighters +
     axeFighterMaterialsCost.stones * this.troops.axeFighters +
     archerMaterialsCost.stones * this.troops.archers +
     magicianMaterialsCost.stones * this.troops.magicians +
     horsemenMaterialsCost.stones * this.troops.horsemen +
     catapultsMaterialsCost.stones * this.troops.catapults;

     this.totalMaterialsCost.crop =
     spearFighterMaterialsCost.crop * this.troops.spearFighters +
     swordFighterMaterialsCost.crop * this.troops.swordFighters +
     axeFighterMaterialsCost.crop * this.troops.axeFighters +
     archerMaterialsCost.crop * this.troops.archers +
     magicianMaterialsCost.crop * this.troops.magicians +
     horsemenMaterialsCost.crop * this.troops.horsemen +
     catapultsMaterialsCost.crop * this.troops.catapults;
  }


  checkIfEnoughWoodToTrain(): boolean
  {
    return this.userInformationService.currentVillage.resourcesAmounts.woodAmount >= this.totalMaterialsCost.wood;
  }

  checkIfEnoughCropToTrain(): boolean
  {
    return this.userInformationService.currentVillage.resourcesAmounts.cropAmount >= this.totalMaterialsCost.crop;
  }

  checkIfEnoughStonesToTrain(): boolean
  {
    return this.userInformationService.currentVillage.resourcesAmounts.stonesAmount >= this.totalMaterialsCost.stones;
  }

  checkIfEnoughMaterialsToTrain(): boolean
  {
    return this.checkIfEnoughWoodToTrain() && this.checkIfEnoughCropToTrain() && this.checkIfEnoughStonesToTrain();
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

  trainTroops()
  {
    if(this.checkIfEnoughMaterialsToTrain())
    {
      this.http.post<User>("http://192.168.1.168:3000/troops-training",
      {
        username: this.userInformationService.userInformation.username,
        villageIndex: this.userInformationService.currentVillageIndex,
        troopsAmount: this.troops
      }).subscribe((user: User)=>{
        this.userInformationService.setUserInformation(user);
        this.router.navigateByUrl('home');
      })
    }
  }

}
