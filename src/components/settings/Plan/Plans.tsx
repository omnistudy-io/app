import PlanCard from "./PlanCard";
import { useGet } from "@/hooks/useApi";
import { PlanSchema } from "@/schema";

const plans = [
  {
    name: "Free",
    price: 0,
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
    description: "Access to basic features",
  },
  {
    name: "OmniStudy Plan",
    price: 10,
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
    description: "Our most popular plan",
  },
  {
    name: "Advanced Plan",
    price: 20,
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
    description: "Access to advanced features",
  },
];

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
