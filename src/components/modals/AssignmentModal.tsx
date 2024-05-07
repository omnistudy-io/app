// Component imports
import * as Dialog from "@radix-ui/react-dialog";
import { DatePicker } from "../ui/DatePicker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

// Hook, util, and schema imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/useToast";
import get from "@/utils/get";
import post from "@/utils/post";
import { CourseSchema } from "@/schema";

// Icon imports
import { X } from "lucide-react";

export default function AssignmentsModal(props: AssignmentsModalProps) {

  // Hooks
  const { toast } = useToast();
  const navigate = useNavigate();

  // State management
  const [courses, setCourses] = useState<CourseSchema[] | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<CourseSchema | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date());

  // Get initial data - all courses for the user
  useEffect(() => {
    get((data: CourseSchema[]) => {
      setCourses(data);
    }, "courses", "/users/{uid}/courses");
  }, []);

  /**
   * Handle the form submission - create a new assignment
   */
  const handleSubmit = () => {
    if (!selectedCourse || !title || !description || !dueDate) {
      toast({ title: "Oops!", description: "Please make sure to fill out all fields to create an assignment." });
      return;
    }

    // Create the assignment data
    const data = {
      course_id: selectedCourse.id,
      title: title,
      description: description,
      due_at: dueDate.toISOString().split(".")[0],
    }

    // Post the data to the server
    post((data: any) => {
      if(data.code > 299) {
        toast({ title: "An error occurred!", description: "An unknown error occurred while creating the assignment, please try again later." });
        return;
      }
      // Successful creation
      toast({ title: "Success!", description: "Assignment created successfully." });
      navigate(`/assignments/${data.assignment.id}`)
    }, "/assignments", data);

    props.setShow(false);
  };

  /**
   * Update the selected course
   * @param value The value of the selected course
   */
  function updateSelectedCourse(value: string) {
    if (value === "None") {
      setSelectedCourse(null);
    } else {
      const course = courses?.find((course) => `${course.id}` === value);
      if (course) {
        setSelectedCourse(course);
      }
    }
  }

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
              Add new assignment
            </Dialog.Title>
            <button
              className="text-black hover:text-[#00adb5] transition-all duration-300 ease-in-out"
              onClick={() => props.setShow(false)}
            >
              <X />
            </button>
          </div>
          <div className="flex flex-col gap-y-2">

            {/* Course and title fields */}
            <div className="flex w-full gap-x-4">
              <div className="flex flex-col text-left w-full">
                <label className="text-sm ml-1">Course</label>
                <Select 
                  value={selectedCourse ? `${selectedCourse.id}` : "None"} 
                  onValueChange={updateSelectedCourse}
                >
                    <SelectTrigger className="bg-[#f5f5f5] border-gray-300">
                        <SelectValue placeholder="None" />
                    </SelectTrigger>
                    <SelectContent>
                        {/* Render all course options */}
                        <SelectItem value="None">None</SelectItem>
                        {courses && courses.map((course, i) => {
                            return <SelectItem
                                key={i}
                                value={`${course.id}`}
                            >{course.subject} {course.number}: {course.title}</SelectItem>
                        })}
                    </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col text-left w-full">
                <label className="text-sm ml-1">Assignment Title</label>
                <input
                  type="text"
                  className="text-sm border-1 border-gray-300 bg-stone-100 rounded-md focus:outline-[#34354a] p-2 border"
                  placeholder="Enter title here"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            {/* Description field */}
            <div>
              <label className="text-sm ml-1">Description</label>
              <Textarea 
                className="bg-[#f5f5f5] border-gray-300"
                placeholder="Be as descriptive as possible, our AI will help you with the rest!"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Due date field */}
            <div className="flex w-full gap-x-4 justify-center">
              <div className="flex flex-col text-left w-full">
                <label className="text-sm ml-1">Due Date</label>
                {/* Datepicker component can be used here */}
                <DatePicker 
                  value={dueDate ? dueDate : new Date()} 
                  onChange={setDueDate} 
                />
              </div>
            </div>

          </div>

          {/* Footer buttons */}
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

type AssignmentsModalProps = {
  show: boolean;
  setShow: (value: boolean) => void;
};
