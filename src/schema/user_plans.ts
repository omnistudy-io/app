export interface UserPlanSchema {
    id: number;
    user_id: number;
    plan_id: number;
    stripe_id: number;
    active: boolean;
    start_date: string;
    renew_date: string;
    total_spent: number;
}

export interface UserPlansRows extends Array<UserPlanSchema> {};