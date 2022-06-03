import { Component, OnInit } from '@angular/core';
import { arsenalUpgradeMaterialCostByLevels, troopUnlockByLevel, spearFighterMinimumArsenalLevel, swordFighterMinimumArsenalLevel, axeFighterMinimumArsenalLevel,
         archerMinimumArsenalLevel, magicianMinimumArsenalLevel, horsemenMinimumArsenalLevel, catapultsMinimumArsenalLevel, MaterialsCost,
         swordFighterMaterialsCost, spearFighterMaterialsCost, axeFighterMaterialsCost, archerMaterialsCost, magicianMaterialsCost, horsemenMaterialsCost, catapultsMaterialsCost,
         spearFighterAttackingStat, spearFighterDefenceStat, swordFighterAttackingStat, swordFighterDefenceStat, axeFighterAttackingStat, axeFighterDefenceStat,
         archerAttackingStat, archerDefenceStat, magicianAttackingStat, magicianDefenceStat, horsemenAttackingStat, horsemenDefenceStat, catapultsAttackingStat, 
         catapultsDefenceStat } from 'utils'
import { UserInformationService } from 'src/app/user-information/user-information.service';
import { Building } from '../../classes/Building';
import { TroopsAmounts } from '../../models/troopsAmounts';
import { User } from '../../models/User';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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


  constructor(private userInformationService: UserInformationService, private http:HttpClient, private router: Router) { 

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

  limitMaximumInputLength(event: any): boolean
  {
    if(event.target.value > 100000)
    {
      event.target.value = 100000;
      return true;
    }
    return false;
  }

  trainTroops()
  {
    if(this.checkIfEnoughMaterialsToTrain())
    {
      this.http.post<User>("http://localhost:3000/troops-training",
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
