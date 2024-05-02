export interface PlanSchema {
    id: number;
    level: number;
    name: string;
    price: number;
    description: string;
    features: []
}

export interface PlansRows extends Array<PlanSchema> {};