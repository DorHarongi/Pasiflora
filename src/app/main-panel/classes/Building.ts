import { MaterialsCost } from 'utils';
export class Building
{
    title!: string;
    level!: number;
    description!: string;
    levelUpMaterialCost!: MaterialsCost;
    constructor(title: string, level: number, description: string, levelUpMaterialCost: MaterialsCost)
    {
        this.title = title;
        this.level = level;
        this.description = description;
        this.levelUpMaterialCost = levelUpMaterialCost;
    }
}