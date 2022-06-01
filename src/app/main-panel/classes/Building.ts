import { MaterialsCost } from 'utils';
export class Building
{
    name!: string;
    title!: string;
    level!: number;
    description!: string;
    levelUpMaterialCost!: MaterialsCost;
    constructor(name: string, title: string, level: number, description: string, levelUpMaterialCost: MaterialsCost)
    {
        this.name = name;
        this.title = title;
        this.level = level;
        this.description = description;
        this.levelUpMaterialCost = levelUpMaterialCost;
    }
}