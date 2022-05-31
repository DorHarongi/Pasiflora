export class Building
{
    title!: string;
    level!: number;
    description!: string;

    constructor(title: string, level: number, description: string)
    {
        this.title = title;
        this.level = level;
        this.description = description;
    }
}