import { Card } from "@/components/ui/Card";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, Check, Rocket } from "lucide-react";

export default function PlanCard(props: PlanProps) {
  return (
    <Card className=" rounded-lg bg-[#f5f5f5] p-3" key={props.key?.toString()}>
      <div className="border-b border-[#34354a] pb-2">
        <div className="flex justify-between">
          <h3 className="font-bold text-md">{props.plan.name}</h3>
          <span className="text-sm">
            <b className="text-2xl">${props.plan.price}</b>/mth
          </span>
        </div>
        <p className="text-[#868686] text-sm">{props.plan.description}</p>
      </div>
      <div className="pt-3 flex flex-col">
        <div className="mb-4">
          <h4 className="font-bold">Features</h4>
          <p className="text-[#868686] text-sm">
            {props.plan.featuredHighlight}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {props.plan.features.map((feature, index) => (
            <div className="flex gap-x-2 items-center">
              <Check className="w-[20px] h-[20px] bg-[#00adb5] p-1 rounded-full text-white" />
              <p className="text-sm" key={index}>
                {feature}
              </p>
            </div>
          ))}
        </div>
        <div>
          {props.plan.name === "Free" ? (
            <motion.button
              disabled
              className="px-6 py-2 rounded-lg bg-[#868686] text-white shadow-lg mt-4 flex gap-x-2 items-center"
            >
              <Rocket className="h-[20px] w-[20px]" /> Current Plan
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-lg bg-[#00adb5] text-white shadow-lg mt-4 flex gap-x-2 items-center"
            >
              <ArrowLeftRight className="h-[20px] w-[20px]" /> Switch Plan
            </motion.button>
          )}
        </div>
      </div>
    </Card>
  );
}

// ---------- TYPE DEFINITIONS ---------- //

type PlanProps = {
  plan: Plan;
  key: ReactNode;
};

type Plan = {
  name: string;
  price: number;
  features: string[];
  description: string;
  featuredHighlight: string;
};
