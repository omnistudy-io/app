import { useState } from "react";
import { motion } from "framer-motion";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export default function CoursesModal(props: CoursesModalProps) {
  const [courseNumber, setCourseNumber] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [professor, setProfessor] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  // Keep track of start date and datepicker visibility
  const [startDate, setStartDate] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);

  // Keep track of end date and datepicker visibility
  const [endDate, setEndDate] = useState(new Date());
  const [showEndDate, setShowEndDate] = useState(false);

  const [showScheduleDropdown, setShowScheduleDropdown] = useState(false);
  const [scheduleEvents, setScheduleEvents] = useState<Array<any>>([]);

  // return props.show ? (
  //   <div className="flex justify-center items-center gap-4">
  //     *Shadcn Dialog here
  //     <button
  //       className="py-1 px-4 bg-[#00adb5] text-white rounded-md shadow-lg"
  //       onClick={() => {
  //         props.setShow(false);
  //       }}
  //     >
  //       Close
  //     </button>
  //   </div>
  // ) : null;
  return (
    <Dialog.Root open={props.show}>
      <Dialog.Portal>
        <Dialog.Overlay
          onClick={() => props.setShow(false)}
          className="bg-[#00000090] data-[state=open]:animate-overlayShow data-[state=closed]:animate-overlayHide fixed inset-0"
        />
        <Dialog.Content className="data-[state=open]:animate-contentShow data-[state=closed]:animate-contentHide fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <div className="flex justify-between items-center mb-6 px-1 pb-2 border-b border-[#34354a]">
            <Dialog.Title className=" m-0 text-[17px] font-medium">
              Edit profile
            </Dialog.Title>
            <button
              className="text-black hover:text-[#00adb5] transition-all duration-300 ease-in-out"
              onClick={() => props.setShow(false)}
            >
              <X />
            </button>
          </div>
          <fieldset className="flex flex-col gap-y-4">
            <div className="flex w-full gap-x-4">
              <div className="flex flex-col text-left w-full">
                <label className="text-sm ml-1">Course Number:</label>
                <input
                  type="text"
                  className="text-sm border bg-stone-100 rounded-md outline-none focus:border-[#34354a] p-3"
                  placeholder="CSci 2021"
                  onChange={(e) => setCourseNumber(e.target.value)}
                />
              </div>
              <div className="flex flex-col text-left w-full">
                <label className="text-sm ml-1">Course Title:</label>
                <input
                  type="text"
                  className="text-sm border bg-stone-100 rounded-md outline-none focus:border-[#34354a] p-3"
                  placeholder="Machine Architecture and Organization"
                  onChange={(e) => setCourseTitle(e.target.value)}
                />
              </div>
            </div>

            {/* Professor and Room */}
            <div className="flex w-full gap-x-4">
              <div className="flex flex-col text-left w-full">
                <label className="text-sm ml-1">Professor:</label>
                <input
                  type="text"
                  className="text-sm border bg-stone-100 rounded-md outline-none focus:border-[#34354a] p-3"
                  placeholder="Antonia Zhai"
                  onChange={(e) => setProfessor(e.target.value)}
                />
              </div>
              <div className="flex flex-col text-left w-full">
                <label className="text-sm ml-1">Room Number:</label>
                <input
                  type="text"
                  className="text-sm border bg-stone-100 rounded-md outline-none focus:border-[#34354a] p-3"
                  placeholder="Smith 331"
                  onChange={(e) => setRoomNumber(e.target.value)}
                />
              </div>
            </div>

            {/* Start and end date pickers */}
            <div className="flex w-full gap-x-4 justify-center">
              <div className="flex flex-col text-left w-full">
                <label className="text-sm ml-1">Start Date:</label>
                {/* <Datepicker
                            options={datepickerOptions}
                            onChange={(date) => { setStartDate(date) }}
                            show={showStartDate}
                            setShow={setShowStartDate}
                        /> */}
              </div>
              <div className="flex flex-col text-left w-full">
                <label className="text-sm ml-1">End Date:</label>
                {/* <Datepicker
                            options={datepickerOptions}
                            onChange={(date) => { setEndDate(date) }}
                            show={showEndDate}
                            setShow={setShowEndDate}
                        /> */}
              </div>
            </div>

            {/* Schedule body */}
            {/* <div className={`rounded-lg border-gray-300 border`}>
                    <div id="accordion-collapse" data-accordion="collapse">
                        <h2 className="border-gray-300" id="accordion-collapse-heading-1" onClick={() => setShowScheduleDropdown(!showScheduleDropdown)}>
                            <button 
                                type="button" 
                                className={`${showScheduleDropdown ? "rounded-t-lg" : "rounded-lg"} flex items-center justify-between w-full p-2 font-medium rtl:text-right text-stone-800 focus:ring-gray-200 dark:text-gray-400 hover:bg-gray-100 gap-3 !bg-stone-100 border-gray-300`}
                                data-accordion-target="#accordion-collapse-body-1" 
                                aria-expanded="true" 
                                aria-controls="accordion-collapse-body-1"
                            >
                                <span>Schedule</span>
                                <svg data-accordion-icon className={`w-3 h-3 shrink-0 ${showScheduleDropdown ? "" : "rotate-180"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                                </svg>
                            </button>
                        </h2>
                        {showScheduleDropdown && <div id="accordion-collapse-body-1" aria-labelledby="accordion-collapse-heading-1">
                            <div className="p-2 border-gray-200">

                                New event and clear buttons
                                <div className="flex flex-row">
                                    <p
                                        className="mr-auto text-left text-sm text-cyan-600 cursor-pointer hover:underline"
                                        onClick={newEventHandler}
                                    >
                                        + New Event
                                    </p>
                                    <p
                                        className="text-left text-sm text-cyan-600 cursor-pointer hover:underline"
                                        onClick={() => setScheduleEvents([])}
                                    >
                                        Clear
                                    </p>
                                </div>

                                Render all events
                                {scheduleEvents.map((event, i) => {
                                    return <CourseModalEvent
                                        key={event.id}
                                        datepickerOptions={datepickerOptions}
                                        event={event}
                                        scheduleEvents={scheduleEvents}
                                        setScheduleEvents={setScheduleEvents}
                                    />
                                })}
                            </div>
                        </div>}
                    </div>
                </div> */}
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
              onClick={() => props.setShow(false)}
            >
              Save changes
            </motion.button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// ---------- TYPE DEFINITIONS ---------- //

type CoursesModalProps = {
  show: boolean;
  setShow: (value: boolean) => void;
};
