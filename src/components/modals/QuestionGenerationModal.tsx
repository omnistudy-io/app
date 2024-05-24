// Component imports
import * as Dialog from "@radix-ui/react-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { motion } from "framer-motion";

// Tools imports
import { useState, useContext, useEffect } from "react";
import get from "@/utils/get";
import post from "@/utils/post";
import { useToast } from "@/hooks/useToast";
import AuthContext from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

// Icon imports
import { X, TriangleAlert } from "lucide-react";
import { AssignmentSchema, DocumentSchema } from "@/schema";

export default function QuestionGenerationModal(props: QuestionGenerationModalProps) {

    // Hooks
    const { toast } = useToast();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Data state management
    const [selectedDocument, setSelectedDocument] = useState<DocumentSchema | null>(props.documents.length > 0 ? props.documents[0] : null);
    const [numQuestions, setNumQuestions] = useState<string>("");
    const [questionTypes, setQuestionTypes] = useState<string[]>([]); // ["MCQ", "SA", "TF", "FITB"]
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [todayGenSets, setTodayGenSets] = useState<number>(0);

    function updateSelectedDocument(value: string) {
        const doc = props.documents.find((doc) => `${doc.id}` == value);
        setSelectedDocument(doc!);
    }
    
    function handleQuestionTypeChange(type: string, checked: boolean) {
        if(!checked) {
            const newTypes = questionTypes.filter((t) => t != type);
            setQuestionTypes(newTypes);
        }
        else {
            setQuestionTypes([...questionTypes, type]);
        }
    }

    function handleSubmit() {
        // Check if daily limit has been reached
        if(todayGenSets >= 3) {
            toast({ title: "Daily limit reached!", description: "You can only generate 3 sets per day. Upgrade your plan to increase your limit." });
            return;
        }

        if(!selectedDocument || !numQuestions || questionTypes.length == 0 || !title || !description) {
            toast({ title: "Oops!", description: "Please make sure to fill out all fields to generate questions." })
            return;
        }

        // Close this modal and show loading modal
        props.setShow(false);
        props.setShowLoading(true);

        // Make request to AI server
        post((data: any) => {
            // Error generating questions
            if(!data || data.code > 299) {
                toast({ title: "An error occurred!", description: "An unknown error occurred while generating questions, please try again later." });
                return;
            }
            // Error free, create study set
            else {
                post((data: any) => {
                    // Error creating study set in db
                    if(data.code > 299) {
                        toast({ title: "An error occurred!", description: "An unknown error occurred while creating the study set, please try again later." });
                        return;
                    }
                    // Success
                    else {
                        toast({ title: "Success!", description: "Study set created successfully." });
                        navigate(`/study-sets/${data.studySet.id}`);
                    }
                }, "/study-sets", {
                    user_id: user!.id,
                    title: title,
                    description: description,
                    questions: data.questions
                }); 
            }
            // Close the loading modal
            props.setShowLoading(false);
        }, "/ai/qgen", {
            doc_paths: [selectedDocument.url],
            num_questions: numQuestions,
            question_types: questionTypes
        });
    }

    useEffect(() => {
        get(setTodayGenSets, "count", "/users/{uid}/sstoday");
    }, []);

    return(
        <Dialog.Root open={props.show}>
            <Dialog.Portal>
                <Dialog.Overlay
                onClick={() => props.setShow(false)}
                className="bg-[#00000090] fixed inset-0 data-[state=open]:animate-overlayShow data-[state=closed]:animate-overlayHide"
                />
                <Dialog.Content className="data-[state=open]:animate-contentShow data-[state=closed]:animate-contentHide fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <div className="flex justify-between items-center mb-4 px-1 pb-2 border-b border-[#34354a]">
                        <Dialog.Title className="m-0 text-[17px] font-medium">
                            Generate questions
                        </Dialog.Title>
                        <button
                            className="text-black hover:text-[#00adb5] transition-all duration-300 ease-in-out"
                            onClick={() => props.setShow(false)}
                        >
                            <X />
                        </button>
                    </div>

                    {/* Form content container */}
                    <div className="flex flex-col gap-y-2">
                        {/* Study set title container */}
                        <div className="flex flex-col text-left w-full">
                            <label className="text-sm ml-1">Study Set Title</label>
                            <input
                                type="text"
                                className="text-sm border-1 border-gray-300 bg-stone-100 rounded-md focus:outline-[#34354a] p-2 border"
                                placeholder="Enter title here"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        {/* Course and num questions fields */}
                        <div className="flex w-full gap-x-4">
                            <div className="flex flex-col text-left w-full">
                                <label className="text-sm ml-1">Document</label>
                                <Select 
                                    value={selectedDocument ? `${selectedDocument.id}` : "None"}
                                    onValueChange={updateSelectedDocument}
                                >
                                    <SelectTrigger className="bg-[#f5f5f5] border-gray-300">
                                        {props.documents.length == 0 ? 
                                            <SelectValue placeholder="None" /> 
                                        :
                                            <SelectValue placeholder={props.documents[0].title} />
                                        }
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/* Render all document options */}
                                        {props.documents && props.documents.map((document, i) => {
                                            return <SelectItem
                                                key={i}
                                                value={`${document.id}`}
                                            >{document.title}</SelectItem>
                                        })}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col text-left w-full">
                                <label className="text-sm ml-1">Number of Questions</label>
                                <input
                                    type="number"
                                    className="text-sm border-1 border-gray-300 bg-stone-100 rounded-md focus:outline-[#34354a] p-2 border"
                                    placeholder="Enter number of questions here"
                                    onChange={(e) => setNumQuestions(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Question types field */}
                        <div className="flex flex-col gap-y-1">
                            <label className="text-sm ml-1">Question Types</label>
                            <div className="flex flex-row ml-1 gap-x-4">
                                <div className="flex flex-row gap-x-1">
                                    <input
                                        type="checkbox" 
                                        onChange={(e) => handleQuestionTypeChange("MCQ", e.target.checked)}
                                    />
                                    <label>Multiple Choice</label>
                                </div>
                                <div className="flex flex-row gap-x-1">
                                    <input 
                                        type="checkbox" 
                                        onChange={(e) => handleQuestionTypeChange("SHORT", e.target.checked)}
                                    />
                                    <label>Short Answer</label>
                                </div>
                                <div className="flex flex-row gap-x-1">
                                    <input 
                                        type="checkbox" 
                                        onChange={(e) => handleQuestionTypeChange("TOF", e.target.checked)}
                                    />
                                    <label>True or False</label>
                                </div>
                                <div className="flex flex-row gap-x-1">
                                    <input 
                                        type="checkbox" 
                                        onChange={(e) => handleQuestionTypeChange("FITB", e.target.checked)}
                                    />
                                    <label>Fill In The Blank</label>
                                </div>
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

                        {/* Show number of sets generated today */}
                        <div className={`text-md flex flex-row gap-x-1 items-center ${todayGenSets >= 3 ? "text-red-500" : "text-stone-400"}`}>
                            {todayGenSets >= 3 && <TriangleAlert className="h-4 w-4" />}
                            {todayGenSets}/3 sets generated today
                        </div>

                    </div>

                    {/* Footer buttons */}
                    <div className="mt-[25px] flex justify-end gap-x-1">
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
                            Generate
                        </motion.button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    ); 
}

// Props
type QuestionGenerationModalProps = {
    show: boolean;
    setShow: (value: boolean) => void;
    setShowLoading: (value: boolean) => void;
    assignment: AssignmentSchema;
    documents: DocumentSchema[];
}