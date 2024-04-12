import { ReactNode } from "react";
import { motion } from "framer-motion";

export const DashboardContainer = (props: DashboardContainerProps) => {
  return (
    <div
      className={` h-full bg-[#fff] rounded-xl border border-solid border-[#86868675] ${
        props.className || ""
      }`}
    >
      <div>
        <div>
          <h1 className="text-xl font-bold p-4 mb-4 border-b border-solid border-[#34354a] flex items-center gap-x-3">
            {props.headerIcon}
            {props.header}
          </h1>
        </div>
        <div className="flex w-full justify-between pb-0 p-4">
          <h2 className="text-4xl">{props.header}</h2>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="py-2.5 px-8 rounded-lg bg-[#00adb5] text-white shadow-lg"
            onClick={props.callToAction}
          >
            {props.callToActionText}
          </motion.button>
        </div>
      </div>
      <div className="p-4">{props.children}</div>
    </div>
  );
};

// ---------- TYPE DEFINITIONS ---------- //

type DashboardContainerProps = {
  className?: string;
  children: ReactNode;
  header: ReactNode;
  headerIcon: ReactNode;
  callToAction: any;
  callToActionText: string;
  link?: string;
};
