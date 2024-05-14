import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import get from "@/utils/get";
import post from "@/utils/post";
import { Textarea } from "@/components/ui/Textarea";

import { CourseSchema } from "@/schema";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { DatePicker } from "../ui/DatePicker";
import CourseModalEvent from "./CourseModalEvent";
import AuthContext from "@/context/AuthContext";
import formatDate from "@/utils/formatDate";

export default function CoursesModal(props: CoursesModalProps) {
  // Hooks
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // State management
  const [courseSubject, setCourseSubject] = useState("");
  const [courseNumber, setCourseNumber] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [professor, setProfessor] = useState("");
  const [building, setBuilding] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [description, setDescription] = useState<string>("");

  // Keep track of start date and datepicker visibility
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());

  // Keep track of end date and datepicker visibility
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  const [showScheduleDropdown, setShowScheduleDropdown] = useState(false);
  const [scheduleEvents, setScheduleEvents] = useState<Array<any>>([]);

  function newEventHandler(e: React.MouseEvent) {
    setScheduleEvents([
      ...scheduleEvents,
      {
        id: uuidv4(),
        rule: "repeat",
        days: [],
        date: new Date(),
        startTime: "08:00",
        endTime: "09:00",
      },
    ]);
  }

  const handleCourseSubjectChange = (value: any) => {
    const parts = value.split(" ");

    if (parts.length >= 2) {
      setCourseNumber(parts[1]);
      setCourseSubject(parts[0]);
    } else {
      setCourseNumber("");
      setCourseSubject(value);
    }
  };

  const handleRoomNumberChange = (value: any) => {
    const parts = value.split(" ");

    if (parts.length > 2) {
      // If the value was something like "Owens Science 435" building would be set to "Owens Science"
      setBuilding(parts.slice(0, 1).join(" "));
      setRoomNumber(parts[2]);
    } else if (parts.length === 2) {
      setBuilding(parts[0]);
      setRoomNumber(parts[1]);
    } else {
      setBuilding("");
      setRoomNumber(value);
    }
  };

  const handleSubmit = () => {
    if (
      !courseNumber ||
      !description ||
      !courseTitle ||
      !professor ||
      !roomNumber
    ) {
      alert("Please fill out all fields");
      return;
    }

    console.log(scheduleEvents);

    // Modify schedule events days to be an array of booleans
    scheduleEvents.forEach((event) => {
      event.days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
        (day) => event.days.includes(day)
      );
    });

    const data = {
      course: {
        user_id: user?.id,
        title: courseTitle,
        description: description,
        subject: courseSubject,
        number: courseNumber,
        professor: professor,
        room: roomNumber,
        building: building,
        color: "#00adb5",
        thumbnail_url: "",
        start_date: startDate!.toISOString().split("T")[0],
        end_date: endDate!.toISOString().split("T")[0],
      },
      eventDefs: scheduleEvents,
    };

    console.log(data);

    // Make the POST request
    post(
      (data: any) => {
        get(props.updateCourses, "courses", "/users/{uid}/courses");
        navigate(`/courses/${data.course.id}`);
      },
      "/courses",
      data
    );

    props.setShow(false);
  };

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
              Add new course
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
                  className="text-sm border bg-stone-100 rounded-md outline-none focus:border-[#34354a] p-2"
                  placeholder="CSci 2021"
                  onChange={(e) => handleCourseSubjectChange(e.target.value)}
                />
              </div>
              <div className="flex flex-col text-left w-full">
                <label className="text-sm ml-1">Course Title:</label>
                <input
                  type="text"
                  className="text-sm border bg-stone-100 rounded-md outline-none focus:border-[#34354a] p-2"
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
                  className="text-sm border bg-stone-100 rounded-md outline-none focus:border-[#34354a] p-2"
                  placeholder="Antonia Zhai"
                  onChange={(e) => setProfessor(e.target.value)}
                />
              </div>
              <div className="flex flex-col text-left w-full">
                <label className="text-sm ml-1">Room Number:</label>
                <input
                  type="text"
                  className="text-sm border bg-stone-100 rounded-md outline-none focus:border-[#34354a] p-2"
                  placeholder="Smith 331"
                  onChange={(e) => handleRoomNumberChange(e.target.value)}
                />
              </div>
            </div>

            {/* Start and end date pickers */}
            <div className="flex w-full gap-x-4 justify-center">
              <div className="flex flex-col text-left w-full">
                <label className="text-sm ml-1">Start Date:</label>
                <DatePicker
                  value={startDate ? startDate : new Date()}
                  onChange={setStartDate}
                />
              </div>
              <div className="flex flex-col text-left w-full">
                <label className="text-sm ml-1">End Date:</label>
                <DatePicker
                  value={endDate ? endDate : new Date()}
                  onChange={setEndDate}
                />
              </div>
            </div>

            {/* Description field */}
            <div className="mb-2">
              <label className="text-sm ml-1">Description</label>
              <Textarea
                className="bg-[#f5f5f5] border-gray-300"
                placeholder="Be as descriptive as possible, our AI will help you with the rest!"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Schedule body */}
            <div className={`rounded-lg border-gray-300 border`}>
              <div id="accordion-collapse" data-accordion="collapse">
                <h2
                  className="border-gray-300"
                  id="accordion-collapse-heading-1"
                  onClick={() => setShowScheduleDropdown(!showScheduleDropdown)}
                >
                  <button
                    type="button"
                    className={`${
                      showScheduleDropdown ? "rounded-t-lg" : "rounded-lg"
                    } flex items-center justify-between w-full p-2 font-medium rtl:text-right text-stone-800 focus:ring-gray-200 dark:text-gray-400 hover:bg-gray-100 gap-3 !bg-stone-100 border-gray-300`}
                    data-accordion-target="#accordion-collapse-body-1"
                    aria-expanded="true"
                    aria-controls="accordion-collapse-body-1"
                  >
                    <span>Schedule</span>
                    <svg
                      data-accordion-icon
                      className={`w-3 h-3 shrink-0 ${
                        showScheduleDropdown ? "" : "rotate-180"
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </button>
                </h2>
                {showScheduleDropdown && (
                  <div
                    id="accordion-collapse-body-1"
                    aria-labelledby="accordion-collapse-heading-1"
                  >
                    <div className="p-2 border-gray-200 max-h-[400px] overflow-y-scroll">
                      {/* New event and clear buttons */}
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

                      {/* Render all events */}
                      {scheduleEvents.map((event, i) => {
                        return (
                          <CourseModalEvent
                            key={event.id}
                            datepickerOptions={{}}
                            event={event}
                            scheduleEvents={scheduleEvents}
                            setScheduleEvents={setScheduleEvents}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
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
              Create
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
  updateCourses: React.Dispatch<React.SetStateAction<CourseSchema[]>>;
};
