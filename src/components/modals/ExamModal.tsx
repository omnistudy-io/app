// Component imports
import * as Dialog from "@radix-ui/react-dialog";
import { DatePicker } from "../ui/DatePicker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import Spinner from "@/components/ui/Spinner";

// Hook, util, and schema imports
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/useToast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import get from "@/utils/get";
import post from "@/utils/post";
import { CourseSchema } from "@/schema";

// Icon imports
import { X } from "lucide-react";


export default function ExamModal(props: ExamModalProps) {

    // Hooks
    const { toast } = useToast();
    const navigate = useNavigate();

    // State management
    const [loading, setLoading] = useState<boolean>(false);
    const [courses, setCourses] = useState<CourseSchema[] | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<CourseSchema | null>(null);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [building, setBuilding] = useState<string>("");
    const [room, setRoom] = useState<string>("");
    const [seat, setSeat] = useState<string>("");
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [startTime, setStartTime] = useState<string >("08:00");
    const [endTime, setEndTime] = useState<string>("10:00");

    /**
     * Update the selected course for the exam
     * @param value The new course id
     */
    function updateSelectedCourse(value: string) {
        const course = courses?.find((course) => `${course.id}` === value);
        setSelectedCourse(course ? course : null);
    }

    /**
     * Handle the form submission - create a new exam
     */
    async function handleSubmit() {
        if(!selectedCourse || title === "" || !date || !description) {
            toast({ title: "Oops!", description: "Please make sure to fill out all required fields to create an exam." });
            return;
        }
        setLoading(true);

        // Create the exam data
        const justDateString = date?.toISOString().split("T")[0]; // "2022-10-10"
        const data = {
            course_id: selectedCourse?.id,
            title: title,
            description: description,
            building: building,
            room: room,
            seat: seat,
            date: date?.toISOString().split(".")[0],
            start_time: `${justDateString} ${startTime}`,
            end_time: `${justDateString} ${endTime}`,
        };

        // Post the data to the server
        post((data: any) => {
            if(data.code > 299) {
                toast({ title: "An error occurred!", description: "An unknown error occurred while creating the exam, please try again later." });
                return;
            }
            // Successful creation
            toast({ title: "Success!", description: "Exam created successfully." });
            navigate(`/exams/${data.exam.id}`);
        }, "/exams", data);
    }

    // Get initial data
    useEffect(() => {
        get((data: CourseSchema[]) => {
            setCourses(data);
        }, "courses", "/users/{uid}/courses");
    }, []);

    return(
        <Dialog.Root open={props.show}>
            <Dialog.Portal>
                <Dialog.Overlay
                    onClick={() => props.setShow(false)}
                    className="bg-[#00000090] fixed inset-0 data-[state=open]:animate-overlayShow data-[state=closed]:animate-overlayHide"
                />
                <Dialog.Content className="data-[state=open]:animate-contentShow data-[state=closed]:animate-contentHide fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">

                    {/* Modal header */}
                    <div className="flex justify-between items-center mb-6 px-1 pb-2 border-b border-[#34354a]">
                        <Dialog.Title className="m-0 text-[17px] font-medium">
                            Add new exam
                        </Dialog.Title>
                        {/* Only show close button when not loading */}
                        {!loading && <button
                            className="text-black hover:text-[#00adb5] transition-all duration-300 ease-in-out"
                            onClick={() => props.setShow(false)}
                        ><X /></button>}
                    </div>

                    {/* Modal content */}
                    <div className="flex flex-col gap-y-2">
                        {/* Course and title fields */}
                        <div className="flex w-full gap-x-4">
                            {/* Course selection menu */}
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
                            {/* Exam title field */}
                            <div className="flex flex-col text-left w-full">
                                <label className="text-sm ml-1">Exam Title</label>
                                <input
                                    type="text"
                                    className="text-sm border-1 border-gray-300 bg-stone-100 rounded-md focus:outline-[#34354a] p-2 border"
                                    placeholder="Enter title here"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Building and room fields */}
                        <div className="flex w-full gap-x-4">
                            <div className="flex flex-col text-left w-full">
                                <label className="text-sm ml-1">Building</label>
                                <input
                                    type="text"
                                    className="text-sm border-1 border-gray-300 bg-stone-100 rounded-md focus:outline-[#34354a] p-2 border"
                                    placeholder="Optional building"
                                    onChange={(e) => setBuilding(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col text-left w-full">
                                <label className="text-sm ml-1">Room</label>
                                <input
                                    type="text"
                                    className="text-sm border-1 border-gray-300 bg-stone-100 rounded-md focus:outline-[#34354a] p-2 border"
                                    placeholder="Optional room"
                                    onChange={(e) => setRoom(e.target.value)}
                                />
                            </div>
                        </div>  

                        {/* Seat, start and end time fields */}
                        <div className="flex w-full gap-x-4">
                            <div className="flex flex-col text-left w-full">
                                <label className="text-sm ml-1">Seat</label>
                                <input
                                    type="text"
                                    className="text-sm border-1 border-gray-300 bg-stone-100 rounded-md focus:outline-[#34354a] p-2 border"
                                    placeholder="Optional seat"
                                    onChange={(e) => setSeat(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col text-left w-full">
                                <label className="text-sm ml-1">Start Time</label>
                                <input 
                                    className="p-2 text-sm border-1 border-gray-300 ring-1 ring-gray-300 bg-stone-100 rounded-md focus:border-gray-500 focus:ring-0"
                                    type="time" 
                                    min="08:00" 
                                    max="18:00"  
                                    defaultValue="08:00"
                                    step="60"
                                    onChange={(e) => setStartTime(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col text-left w-full">
                                <label className="text-sm ml-1">End Time</label>
                                <input 
                                    className="p-2 text-sm border-1 border-gray-300 ring-1 ring-gray-300 bg-stone-100 rounded-md focus:border-gray-500 focus:ring-0"
                                    type="time" 
                                    min="08:00" 
                                    max="18:00"  
                                    defaultValue="10:00"
                                    step="60"
                                    onChange={(e) => setEndTime(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Due date field */}
                        <div className="flex w-full gap-x-4 justify-center">
                            <div className="flex flex-col text-left w-full">
                                <label className="text-sm ml-1">Due Date</label>
                                {/* Datepicker component can be used here */}
                                <DatePicker 
                                    className="border-gray-300 bg-[#f5f5f5]"
                                    value={date ? date : new Date()} 
                                    onChange={setDate} 
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

                    </div>

                    {/* Footer buttons */}
                    <div className="mt-[25px] flex justify-end gap-x-2">
                        {!loading && <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            className="py-1.5 px-4 hover:bg-[#00adb5] hover:text-white rounded-md hover:shadow-lg transition-all duration-300 ease-in-out"
                            onClick={() => props.setShow(false)}
                        >
                            Close
                        </motion.button>}
                        {!loading && <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            className="py-1.5 px-4 bg-[#00adb5] text-white rounded-md"
                            onClick={handleSubmit}
                        >
                            Create
                        </motion.button>}
                        <Spinner show={loading} className="w-8 h-8" />
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}


// Type definitions
type ExamModalProps = {
    show: boolean;
    setShow: (value: boolean) => void;
};