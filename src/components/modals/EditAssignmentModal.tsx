// Component imports
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/Textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/Select";
import { DatePicker } from "@/components/ui/DatePicker";

// Tools imports
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "@/context/AuthContext";
import get from "@/utils/get";
import put from "@/utils/put";
import { AssignmentSchema, CourseSchema } from "@/schema";
import { useToast } from "@/hooks/useToast";

// Icon imports
import { X } from "lucide-react";


export default function EditAssignmentModal(props: EditAssignmentModalProps) {
    // Hooks
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { toast } = useToast();

    // Data state management                                       
    const [courses, setCourses] = useState<CourseSchema[] | null>(null);
    const [courseId, setCourseId] = useState<number | null>(props.assignment ? props.assignment.course_id : null);
    const [title, setTitle] = useState<string>(props.assignment ? props.assignment.title : "");
    const [description, setDescription] = useState<string>(props.assignment ? props.assignment.description : "");
    const [dueDate, setDueDate] = useState<Date | undefined>(props.assignment ? new Date(props.assignment.due_at) : new Date());
    const [actualPoints, setActualPoints] = useState<number>(props.assignment ? props.assignment.actual_points : 0);
    const [possiblePoints, setPossiblePoints] = useState<number>(props.assignment ? props.assignment.possible_points : 0);
    const [weight, setWeight] = useState<number>(props.assignment ? props.assignment.weight : 0.0);

    // Logic state management
    const [isEdited, setIsEdited] = useState<boolean>(false);

    /**
     * Handle the saving of the course edits
     */
    function handleSave() {
        console.log("Handling save...");
        const data = {
            course_id: courseId,
            title,
            description,
            due_at: dueDate ? dueDate.toISOString().split(".")[0] : (new Date()).toISOString().split(".")[0],
            actual_points: actualPoints,
            possible_points: possiblePoints,
            weight,
        }

        put((data: any) => {
            if(data.code < 300) {
                toast({ title: "Success!", description: `Assignment ${props.assignment!.title} was updated successfully.` });
                window.location.reload();
            }
            else {  
                toast({ title: "An error occurred!", description: `An unexpected error occured while trying to update ${props.assignment!.title}. Please try again.` })
            }
        }, `/assignments/${props.assignment!.id}`, data);
    }

    function updateSelectedCourse(data: any) {
        
    }

    /**
     * Given the original course data, examine each data state object to see
     * if it differs from the original data. If any fields do, then changes exist.
     * @returns boolean indicating whether changes exist to the original data
     */
    function newChangesExist() {
        if(props.assignment) {
            // If any states are not what the props are, then changes exist
            if(
                props.assignment
            ) {
                return true;
            }
            else 
                return false;
        }
        else
            return false;
    }

    // On any value change, check for changes
    const depends: any[] = [];
    useEffect(() => {
        get(setCourses, "courses", "/courses");
        setIsEdited(newChangesExist());
    }, depends);

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
                        Edit {props.assignment && props.assignment.title} assignment
                    </Dialog.Title>
                    <button
                        className="text-black hover:text-[#00adb5] transition-all duration-300 ease-in-out"
                        onClick={() => props.setShow(false)}
                    >
                        <X />
                    </button>
                </div>
                <fieldset className="flex flex-col gap-y-4">
                    <div className="flex flex-col w-full gap-y-4">
                    {/* Selected course */}
                    <div className="flex flex-row gap-x-4 w-full">
                        <div className="flex flex-col text-left w-full">
                            <label className="text-sm ml-1">Course</label>
                            <Select value={courseId ? `${courseId}` : "None"} onValueChange={(value: string) => setCourseId(value == "None" ? null : parseInt(value))}>
                                <SelectTrigger className="bg-stone-100">
                                    <SelectValue placeholder="None" />
                                </SelectTrigger>
                                <SelectContent>
                                    {/* Render all assignment options for the selected course */}
                                    <SelectItem value="None">None</SelectItem>
                                    {courses && courses.map((course: CourseSchema, i) => {
                                        return <SelectItem
                                            key={i}
                                            value={`${course.id}`}
                                        >{course.subject} {course.number}: {course.title}</SelectItem>
                                    })}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {/* Course title */}
                    <div className="flex flex-col text-left basis-1/2">
                        <label className="text-sm ml-1">Assignment Title</label>
                        <input
                            type="text"
                            className="text-sm border bg-stone-100 rounded-md outline-none focus:border-[#34354a] p-2"
                            placeholder="Machine Architecture and Organization"
                            onChange={(e) => setTitle(e.target.value)}
                            defaultValue={title}
                        />
                    </div>
                    </div>

                    {/* Professor and Room */}
                    <div className="flex w-full gap-x-4">
                        <div className="flex flex-col text-left w-full">
                            <label className="text-sm ml-1">Points Earned</label>
                            <input
                                type="number"
                                min="1"
                                className="text-sm border bg-stone-100 rounded-md outline-none focus:border-[#34354a] p-2"
                                placeholder="87"
                                onChange={(e) => setActualPoints(parseInt(e.target.value))}
                                defaultValue={actualPoints}
                            />
                        </div>
                        <div className="flex flex-col text-left w-full">
                            <label className="text-sm ml-1">Points Possible</label>
                            <input
                                type="number"
                                min="1"
                                className="text-sm border bg-stone-100 rounded-md outline-none focus:border-[#34354a] p-2"
                                placeholder="100"
                                onChange={(e) => setPossiblePoints(parseInt(e.target.value))}
                                defaultValue={possiblePoints}
                            />
                        </div>
                    </div>

                    {/* Weight and due date */}
                    <div className="flex w-full gap-x-4">
                        <div className="flex flex-col text-left w-full">
                            <label className="text-sm ml-1">Weight (%)</label>
                            <input
                                type="number"
                                min="1"
                                max="100"
                                className="text-sm border bg-stone-100 rounded-md outline-none focus:border-[#34354a] p-2"
                                placeholder="5%"
                                onChange={(e) => setWeight(parseInt(e.target.value) / 100)}
                                defaultValue={`${weight * 100}`}
                            />
                        </div>
                        <div className="flex flex-col text-left w-full">
                            <label className="text-sm ml-1">Due Date</label>
                            <DatePicker
                                value={dueDate ? dueDate : new Date()}
                                onChange={setDueDate}
                            />
                        </div>
                    </div>

                    {/* Description field */}
                    <div className="mb-2">
                    <label className="text-sm ml-1">Description</label>
                    <Textarea
                        className="bg-[#f5f5f5] border-gray-300"
                        placeholder="A description does not exist for this course"
                        onChange={(e) => setDescription(e.target.value)}
                        defaultValue={description}
                    />
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

// ---------- TYPE DEFINITIONS ---------- //
type EditAssignmentModalProps = {
    show: boolean;
    setShow: (value: boolean) => void;
    assignment: AssignmentSchema | null;
};
