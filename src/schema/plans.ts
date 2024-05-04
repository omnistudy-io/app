export interface PlanSchema {
    id: number;
    level: number;
    name: string;
    price: number;
    description: string;
    features: PlanFeature[]
}

interface PlanFeature {
    id: number;
    description: string;
    included: boolean;
}

export interface PlansRows extends Array<PlanSchema> {};