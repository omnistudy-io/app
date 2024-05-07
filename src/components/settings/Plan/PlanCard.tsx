import { Card } from "@/components/ui/Card";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, Check, Rocket, XIcon } from "lucide-react";
import { PlanSchema, UserPlanSchema } from "@/schema";

export default function PlanCard(props: PlanProps) {
  return (
    <Card
      className="flex-1 border-none rounded-lg bg-[#f5f5f5] p-4 h-full"
      key={props.key?.toString()}
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-bold">{props.plan.name} Plan</h3>
        <span>
          <b className="text-3xl">${props.plan.price}</b>
          /mo
        </span>
        <p className="text-sm">{props.plan.description}</p>
      </div>
      <div className="flex flex-col gap-3 my-4">
        {props.plan.features.map((feature, index) => (
          <div key={index} className="flex gap-3 items-center">
            {!feature.included ?
              <XIcon
                strokeWidth={3}
                className="w-[20px] h-[20px] border-[1.9px] border-red-500 p-[.125rem] rounded-full text-red-500"
              />
              : 
              <Check
                strokeWidth={3}
                className="w-[20px] h-[20px] border-[1.9px] border-[#00adb5] p-[.125rem] rounded-full text-[#00adb5]"
              />
            }
            <span className="text-sm">{feature.description}</span>
          </div>
        ))}
      </div>
      {/* data.plan */}
      {props.plan.id === props.userPlan.plan_id ? (
        <button
          disabled
          className="bg-[#868686] text-white py-2 rounded-lg w-full flex items-center justify-center gap-2 shadow"
        >
          <Rocket /> Current Plan
        </button>
      ) : (
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="bg-[#00adb5] text-white py-2 rounded-lg w-full flex items-center justify-center gap-2 shadow"
        >
          <ArrowLeftRight /> Upgrade
        </motion.button>
      )}
    </Card>
  );
}

// ---------- TYPE DEFINITIONS ---------- //

type PlanProps = {
  plan: PlanSchema;
  userPlan: UserPlanSchema; 
  key: ReactNode;
};
