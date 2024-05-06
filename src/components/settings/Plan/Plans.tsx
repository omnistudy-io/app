import PlanCard from "./PlanCard";
import { useGet } from "@/hooks/useApi";
import { PlanSchema, UserPlanSchema } from "@/schema";

import { useState, useEffect } from "react";
import get from "@/utils/get";

export default function Plan() {

    // Get all plans
    const [plans, setPlans] = useState<PlanSchema[] | null>(null);
    // Get the user's plan
    const [userPlan, setUserPlan] = useState<UserPlanSchema | null>(null);

    useEffect(() => {
        get(setPlans, "plans", "/plans");
        get(setUserPlan, "user_plan", "/users/{uid}/plan");
    });

    return (
        <div className="flex flex-col gap-y-4">
            <div className="border-b border-[#34354a] pb-4">
                <h2 className="text-xl">Plan Settings</h2>
                <p className="text-[#868686] text-sm">
                    Pick a plan that suits your needs.
                </p>
            </div>
            <div className="flex flex-col gap-4">
                {userPlan && plans?.map((plan: PlanSchema, index: number) => (
                  <PlanCard key={index} plan={plan} userPlan={userPlan} />
                ))}
            </div>
        </div>
    );
}
