// Component imports
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/Textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { DatePicker } from "@/components/ui/DatePicker";

// Tools imports
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/useToast";
import put from "@/utils/put";
import { ExamSchema, CourseSchema } from "@/schema";

// Icons imports
import { X } from "lucide-react";

// Component definition
export default function EditExamModal(props: EditExamModalProps) {
    // Hooks
    const { toast } = useToast();

    // Data state management
    const [courses, setCourses] = useState<CourseSchema[] | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<CourseSchema | null>(null);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [building, setBuilding] = useState<string>("");
    const [room, setRoom] = useState<string>("");
    const [seat, setSeat] = useState<string>("");
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [actualPoints, setActualPoints] = useState<number>(0);
    const [possiblePoints, setPossiblePoints] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);
    const [startTime, setStartTime] = useState<string >("08:00");
    const [endTime, setEndTime] = useState<string>("10:00");

    // Logic state management
    const [isEdited, setIsEdited] = useState<boolean>(false);

    function handleSave() {

    }

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
                        <button
                            className="text-black hover:text-[#00adb5] transition-all duration-300 ease-in-out"
                            onClick={() => props.setShow(false)}
                        >
                            <X/>
                        </button>
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
                                    onValueChange={() => {}}
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

                        {/* Actual, possible points and weight */}
                        <div className="flex w-full gap-x-4">
                            <div className="flex flex-col text-left w-full">
                                <label className="text-sm ml-1">Points Earned</label>
                                <input
                                    type="number"
                                    className="text-sm border-1 border-gray-300 bg-stone-100 rounded-md focus:outline-[#34354a] p-2 border"
                                    placeholder="89"
                                    defaultValue={props.exam.actual_points}
                                    onChange={(e) => setActualPoints(parseInt(e.target.value))}
                                />
                            </div>
                            <div className="flex flex-col text-left w-full">
                                <label className="text-sm ml-1">Points Possible</label>
                                <input 
                                    className="p-2 text-sm border-1 border-gray-300 ring-1 ring-gray-300 bg-stone-100 rounded-md focus:border-gray-500 focus:ring-0"
                                    type="number" 
                                    placeholder="100"
                                    defaultValue={props.exam.possible_points}
                                    onChange={(e) => setPossiblePoints(parseInt(e.target.value))}
                                />
                            </div>
                            <div className="flex flex-col text-left w-full">
                                <label className="text-sm ml-1">Weight (%)</label>
                                <input 
                                    className="p-2 text-sm border-1 border-gray-300 ring-1 ring-gray-300 bg-stone-100 rounded-md focus:border-gray-500 focus:ring-0"
                                    type="number" 
                                    placeholder="5"
                                    defaultValue={props.exam.weight * 100}
                                    onChange={(e) => setWeight(parseInt(e.target.value) / 100)}
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
                            className={`py-1.5 px-4 text-white rounded-md transition-all duration-200 ${isEdited ? "bg-[#00adb5] cursor-pointer" : "bg-stone-400"}`}
                            onClick={handleSave}
                            disabled={!isEdited}
                        >
                        Save changes
                    </motion.button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

// Type definitions
type EditExamModalProps = {
    show: boolean;
    setShow: (show: boolean) => void;
    exam: ExamSchema & CourseSnapshot;
}
type CourseSnapshot = {
    courseNumber: string;
    courseSubject: string;
    courseTitle: string;
};  