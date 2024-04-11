import { ReactNode } from "react";
import { motion } from "framer-motion";

export const DashboardContainer = (props: DashboardContainerProps) => {
  return (
    <div
      className={`h-full bg-[#fff] rounded-xl border border-solid border-[#86868675] ${
        props.className || ""
      }`}
    >
      <div className=" border-b-1 border-[#868686]">
        <div>
          <h5 className="text-xl font-bold p-4 mb-10 border-b border-solid border-[#86868675] flex items-center gap-x-3">
            {props.headerIcon}
            {props.header}
          </h5>
        </div>
        <div className="flex w-full justify-between p-4">
          <h1 className="text-4xl">{props.header}</h1>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="py-2.5 px-10 rounded bg-[#00adb5] text-white shadow-custom"
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
