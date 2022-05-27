import { BuildingsLevels } from "./buildingsLevels";
import { ResourcesAmounts } from "./resourcesAmounts";
import { ResourcesWorkers } from "./resourcesWorkers";
import { TroopsAmounts } from "./troopsAmounts";
export class Village
{
    villageName!: string;
    resourcesAmounts!: ResourcesAmounts;
    buildingsLevels!: BuildingsLevels;
    population!: number;
    resourcesWorkers!: ResourcesWorkers;
    troops!: TroopsAmounts; 
    clanTroops!: TroopsAmounts;
    woodProductionPerSecond!: number;
    stoneProductionPerSecond!: number; 
    cropProductionPerSecond!: number;
}