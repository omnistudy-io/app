import PlanCard from "./PlanCard";
import { useGet } from "@/hooks/useApi";
import { PlanSchema } from "@/schema";

export default function Plan() {

    // Get all plans
    const { data: pData, loading: pLoading, error: pError } = useGet("/plans");
    const plans = pData?.plans;

    // Get the user's plan
    const { data: upData, loading: upLoading, error: upError } = useGet("/users/1/plan");
    const userPlan = upData?.user_plan;

    return (
        <div className="flex flex-col gap-y-4">
            <div className="border-b border-[#34354a] pb-4">
                <h2 className="text-xl">Plan Settings</h2>
                <p className="text-[#868686] text-sm">
                    Pick a plan that suits your needs.
                </p>
            </div>
            <div className="flex flex-col gap-4">
                {plans?.map((plan: PlanSchema, index: number) => (
                    <PlanCard key={index} plan={plan} userPlan={userPlan} />
                ))}
            </div>
        </div>
    );
}
