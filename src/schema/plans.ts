export interface PlanSchema {
    id: number;
    level: number;
    name: string;
    price: number;
}

export interface PlansRows extends Array<PlanSchema> {};