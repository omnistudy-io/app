import { ReactNode } from "react";
import { motion } from "framer-motion";

export const DashboardContainer = (props: DashboardContainerProps) => {
  return (
    <div
      className={` h-full bg-[#fff] rounded-xl border border-solid border-[#86868675] overflow-scroll ${
        props.className || ""
      }`}
    >
      <div className="w-full overflow-hidden">
        <div className="border-b border-solid border-[#34354a] p-4 mb-4">
          <h1 className="text-xl font-bold flex items-center gap-x-3">
            {props.headerIcon}
            {props.header}
          </h1>
        </div>
        <div className="flex w-full justify-between pb-0 p-4">
          <h2 className="text-4xl">Your {props.header}</h2>
          {props.callToAction && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="py-2 px-6 rounded-md bg-[#00adb5] text-white shadow-lg"
              onClick={props.callToAction}
            >
              {props.callToActionText}
            </motion.button>
          )}
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
  callToAction?: any;
  callToActionText?: string;
  link?: string;
};
