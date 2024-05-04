import { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./DropDownMenu";

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
            {props.subHeader}
          </h1>
        </div>
        <div className="flex w-full justify-between pb-0 p-4">
          <h2 className="text-4xl">{props.header}</h2>
          {props.callToAction &&
            (props.dropDown ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    className="py-2 px-6 rounded-md bg-[#00adb5] text-white shadow-lg"
                  >
                    {props.callToActionText}
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {props.doropDownOptions?.map((option) => (
                    <DropdownMenuItem
                      key={option.label}
                      onClick={option.onClick}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="py-2 px-6 rounded-md bg-[#00adb5] text-white shadow-lg"
                onClick={props.callToAction}
              >
                {props.callToActionText}
              </motion.button>
            ))}
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
  subHeader: ReactNode;
  headerIcon?: ReactNode;
  callToAction?: any;
  callToActionText?: string;
  dropDown: boolean;
  doropDownOptions?: DropdownOption[];
  link?: string;
};

type DropdownOption = {
  label: string;
  onClick: () => void;
};
