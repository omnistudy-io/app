import { ReactNode } from "react";
import { motion } from "framer-motion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "./DropDownMenu";
import { ChevronDownIcon } from "lucide-react";

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
        <div className="flex w-full justify-between pb-0 p-4" onDoubleClick={() => props.setEditTitle ? props.setEditTitle!(true) : null}>
          
          {/* Edit title */}
          {props.editTitle ? 
            <input 
              type="text" 
              className="text-4xl w-fit border-2 border-[#00adb5] focus:ring-0 focus:outline-none rounded-md" 
              defaultValue={props.header as string} 
              onBlur={(e) => props.dispatchTitleChange!(e.target.value)}
              onKeyDown={(e) => { e.key === 'Enter' && e.currentTarget.blur() }}
              autoFocus
            /> 
            : 
            <h2 className="text-4xl">{props.header}</h2>
          }

          {props.callToAction &&
            (props.dropdown ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    className="py-2 px-4 rounded-md bg-[#00adb5] text-white shadow-lg flex flex-row items-center gap-x-2"
                  >
                    {props.callToActionText}
                    <ChevronDownIcon size={20} />
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {props.dropdownOptions?.map((option) => (
                    <DropdownMenuItem
                      key={option.label}
                      onClick={option.onClick}
                      className={`${option.isDelete ? `text-red-500` : ``} cursor-pointer`}
                    >
                      <span className={`${option.isDelete ? 'cursor-pointer hover:text-red-500' : ''}`}>{option.label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="py-2 px-6 rounded-md bg-[#00adb5] text-white shadow-lg flex flex-row items-center gap-x-1"
                onClick={props.callToAction}
              >
                {props.callToActionIcon}
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
  callToActionIcon?: ReactNode;
  dropdown: boolean;
  dropdownOptions?: DropdownOption[];
  link?: string;
  editTitle?: boolean;
  setEditTitle?: (edit: boolean) => void;
  dispatchTitleChange?: (title: string) => void;
};

type DropdownOption = {
  label: string;
  isDelete?: boolean;
  onClick: () => void;
};
