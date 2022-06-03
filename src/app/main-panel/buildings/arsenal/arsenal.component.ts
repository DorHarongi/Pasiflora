import { Component, OnInit } from '@angular/core';
import { arsenalUpgradeMaterialCostByLevels, troopUnlockByLevel, spearFighterMinimumArsenalLevel, swordFighterMinimumArsenalLevel, axeFighterMinimumArsenalLevel,
         archerMinimumArsenalLevel, magicianMinimumArsenalLevel, horsemenMinimumArsenalLevel, catapultsMinimumArsenalLevel, MaterialsCost,
         swordFighterMaterialsCost, spearFighterMaterialsCost, axeFighterMaterialsCost, archerMaterialsCost, magicianMaterialsCost, horsemenMaterialsCost, catapultsMaterialsCost,
         spearFighterAttackingStat, spearFighterDefenceStat, swordFighterAttackingStat, swordFighterDefenceStat, axeFighterAttackingStat, axeFighterDefenceStat,
         archerAttackingStat, archerDefenceStat, magicianAttackingStat, magicianDefenceStat, horsemenAttackingStat, horsemenDefenceStat, catapultsAttackingStat, 
         catapultsDefenceStat } from 'utils'
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { Building } from '../../classes/Building';

@Component({
  selector: 'app-arsenal',
  templateUrl: './arsenal.component.html',
  styleUrls: ['./arsenal.component.scss']
})
export class ArsenalComponent implements OnInit {

  buildingInformation: Building;
  nextLevelUnlock: string;

  spearFighters: number = 0;
  swordFighters: number = 0;
  axeFighters: number = 0;
  archers: number = 0;
  magicians: number = 0;
  horsemen: number = 0;
  catapults: number = 0;

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


  constructor(private userInformationService: UserInformationService) { 
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

  troopAmountChange(event: any)
  {

    if(this.limitMaximumInputLength(event))
      return;

    this.totalMaterialsCost.wood =
     spearFighterMaterialsCost.wood * this.spearFighters +
     swordFighterMaterialsCost.wood * this.swordFighters +
     axeFighterMaterialsCost.wood * this.axeFighters +
     archerMaterialsCost.wood * this.archers +
     magicianMaterialsCost.wood * this.magicians +
     horsemenMaterialsCost.wood * this.horsemen +
     catapultsMaterialsCost.wood * this.catapults;

     this.totalMaterialsCost.stones =
     spearFighterMaterialsCost.stones * this.spearFighters +
     swordFighterMaterialsCost.stones * this.swordFighters +
     axeFighterMaterialsCost.stones * this.axeFighters +
     archerMaterialsCost.stones * this.archers +
     magicianMaterialsCost.stones * this.magicians +
     horsemenMaterialsCost.stones * this.horsemen +
     catapultsMaterialsCost.stones * this.catapults;

     this.totalMaterialsCost.crop =
     spearFighterMaterialsCost.crop * this.spearFighters +
     swordFighterMaterialsCost.crop * this.swordFighters +
     axeFighterMaterialsCost.crop * this.axeFighters +
     archerMaterialsCost.crop * this.archers +
     magicianMaterialsCost.crop * this.magicians +
     horsemenMaterialsCost.crop * this.horsemen +
     catapultsMaterialsCost.crop * this.catapults;
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

  limitMaximumInputLength(event: any): boolean
  {
    if(event.target.value > 100000)
    {
      event.target.value = 100000;
      return true;
    }
    return false;
  }

}
