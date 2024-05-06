import { useState } from "react";
import { motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { usePost } from "@/hooks/useApi";
import { DatePicker } from "../ui/DatePicker";

export default function AssignmentsModal(props: AssignmentsModalProps) {

  // State management
  const [assignmentNumber, setAssignmentNumber] = useState("");
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [showDueDate, setShowDueDate] = useState(false);

  const handleSubmit = () => {
    if (!assignmentTitle) {
      alert("Please fill out all fields");
      return;
    }

    props.setShow(false);
  };

  return (
    <Dialog.Root open={props.show}>
      <Dialog.Portal>
        <Dialog.Overlay
          onClick={() => props.setShow(false)}
          className="bg-[#00000090] fixed inset-0 data-[state=open]:animate-overlayShow data-[state=closed]:animate-overlayHide"
        />
        <Dialog.Content className="data-[state=open]:animate-contentShow data-[state=closed]:animate-contentHide fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <div className="flex justify-between items-center mb-6 px-1 pb-2 border-b border-[#34354a]">
            <Dialog.Title className="m-0 text-[17px] font-medium">
              Edit Assignment
            </Dialog.Title>
            <button
              className="text-black hover:text-[#00adb5] transition-all duration-300 ease-in-out"
              onClick={() => props.setShow(false)}
            >
              X
            </button>
          </div>
          <fieldset className="flex flex-col gap-y-4" id="field">
            <div className="flex w-full gap-x-4">
              <div className="flex flex-col text-left w-full">
                <label className="text-sm ml-1">Assignment Number:</label>
                <input
                  type="text"
                  className="text-sm border-1 border-gray-300 bg-stone-100 rounded-md focus:outline-[#34354a] p-2 border"
                  placeholder="Enter assignment number"
                  onChange={(e) => setAssignmentNumber(e.target.value)}
                />
              </div>
              <div className="flex flex-col text-left w-full">
                <label className="text-sm ml-1">Assignment Title:</label>
                <input
                  type="text"
                  className="text-sm border-1 border-gray-300 bg-stone-100 rounded-md focus:outline-[#34354a] p-2 border"
                  placeholder="Enter title here"
                  onChange={(e) => setAssignmentTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="flex w-full gap-x-4 justify-center">
              <div className="flex flex-col text-left w-full">
                <label className="text-sm ml-1">Due Date:</label>
                {/* Datepicker component can be used here */}
                <DatePicker />
              </div>
            </div>
          </fieldset>
          <div className="mt-[25px] flex justify-end gap-x-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="py-1.5 px-4 hover:bg-[#00adb5] hover:text-white rounded-md hover:shadow-lg transition-all duration-300 ease-in-out"
              onClick={() => props.setShow(false)}
            >
              Close
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="py-1.5 px-4 bg-[#00adb5] text-white rounded-md"
              onClick={handleSubmit}
            >
              Save changes
            </motion.button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

type AssignmentsModalProps = {
  show: boolean;
  setShow: (value: boolean) => void;
};
