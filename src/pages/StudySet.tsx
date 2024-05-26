// Component imports
import { DashboardContainer } from "@/components/ui/DashboardContainer";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/Pagination";
import NotFound from "./NotFound";
import ConfirmModal from "@/components/modals/ConfirmModal";

// Hook, util, and schema imports
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/useToast";
import { UserStudySetSchema, UserStudySetQuestionSchema } from "@/schema";
import get from "@/utils/get";
import del from "@/utils/del";
import AuthContext from "@/context/AuthContext";

// Icon imports
import { NotebookIcon as StudySetIcon } from "lucide-react";


export default function StudySet() {

    // Hooks
    const { id } = useParams<{ id: string }>();
    const { user } = useContext(AuthContext);
    const { toast } = useToast();
    const navigate = useNavigate();

    // State management
    const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
    const [studySet, setStudySet] = useState<UserStudySetSchema & StudyQuestions | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<number>(1);

    useEffect(() => {
        get(setStudySet, "studySet", `/study-sets/${id}`);
    }, []);

    function gotoPrevQuestion() {
        if (currentQuestion > 1) {
            setCurrentQuestion(currentQuestion - 1);
        }
    }

    function gotoNextQuestion() {
        if(studySet) {
            if (currentQuestion < studySet?.questions.length) {
                setCurrentQuestion(currentQuestion + 1);
            }
        }
    }

    // If the study set does not exist or the user does not own it, return a 404 page
    if (!studySet || studySet?.user_id != user?.id) {
        return (
            <NotFound />
        )
    }

    // TODO: Implement edit study set functionality
    async function handleEdit() {

    }

    /**
     * Delete a study set handler
     */
    async function handleDelete() {
        del((data: any) => { 
            // If the request was not successful, show an error toast
            if(data.code !== 200) {
              toast({ title: "Failed to delete study set", description: "An error occured while deleting the study set, please try again later." });
            }
            // If the request was successful, show a success toast and navigate to the courses page
            else {
              toast({ title: "Success", description: `Study set ${studySet?.title} deleted successfully.` });
              navigate("/study-sets");
            }
          }, `/study-sets/${id}`); 
    }

    /**
     * Dropdown options for the study set
     */
    const dropdownOptions = [
        { label: "Delete Study Set", onClick: () => { setShowConfirmDelete(true) }, isDelete: true },
    ]

    return (
        <DashboardContainer
            subHeader={"Study Set"}
            header={studySet?.title || "Study Set"}
            headerIcon={<StudySetIcon />}
            callToAction="Options"
            callToActionText="Options"
            dropdown={true}
            dropdownOptions={dropdownOptions}
        >

            {/* Confirm deletion modal */}
            <ConfirmModal
                title="Delete Study Set"
                message="Are you sure you want to delete this study set? This action cannot be undone."
                show={showConfirmDelete}
                setShow={setShowConfirmDelete}
                confirmText="Delete"
                confirmCallback={handleDelete}
            />

            {/* Page content */}
            <div className="p-2 flex flex-row justify-center relative mb-4">
                {studySet != null && studySet.questions.map((q, i) => {
                    return <StudySetQuestionCard 
                        key={q.id} 
                        q={q} 
                        i={i} 
                        current={currentQuestion}
                    />
                })}
            </div>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            className="cursor-pointer"
                            includeText={false} 
                            onClick={() => gotoPrevQuestion()}
                        />
                    </PaginationItem>
                    {[...Array(studySet?.questions.length)].map((_, i) => {
                        return <PaginationItem key={i}>
                            <PaginationLink href="#" isActive={(i + 1) == currentQuestion} onClick={() => setCurrentQuestion(i + 1)}>{i + 1}</PaginationLink>
                        </PaginationItem>
                    })}
                    <PaginationItem>
                        <PaginationNext
                            className="cursor-pointer"
                            includeText={false}
                            onClick={() => gotoNextQuestion()} 
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

        </DashboardContainer>
    );
}


/**
 * Study Set Question Card
 * 
 * @returns JSX for a study set question card
 */
function StudySetQuestionCard(props: StudySetQuestionCardProps) {

    const [showAnswer, setShowAnswer] = useState<boolean>(false);

    // Hide answer when out of view
    useEffect(() => {
        if(props.i + 1 != props.current) 
            setShowAnswer(false);
    }, [props.current]);

    return(
        <div 
            key={props.q.id} 
            style={{ position: "relative", left: `${((props.i + 1) - props.current) * 2000}px` }}
            className={`${(props.i + 1) - props.current !== 0 ? "w-0 h-0 p-0 border-0" : "w-full h-fit p-4 border"} bg-white shadow-sm border-stone-200 rounded-lg`}
        >
            <div className="h-80 flex justify-center items-center">
                <div className="absolute top-5 left-5 text-stone-400">
                    <h2>Question {props.i + 1}</h2>
                </div>

                <div className="text-center">
                    {/* Question */}
                    <h1 className="text-3xl mb-6 font-bold">
                        {props.q.question.replace("[FITB]", "_____________")}
                    </h1>
                    {/* Optional choices */}
                    <div className="text-left mb-6">
                        {props.q.options && Object.keys(JSON.parse(props.q.options)).map((key: string, i) => {
                            const options = JSON.parse(props.q.options!);
                            return <p key={i} className="text-2xl text-stone-400 mb-2">{key}: {options[`${key}`]}</p>
                        })}
                    </div>
                    {/* Answer */}
                    <h1 className="text-2xl text-[#00adb5] hover:underline cursor-pointer" onClick={() => setShowAnswer(!showAnswer)}>
                        {showAnswer ? 
                            props.q.options ? `${props.q.answer}: ${JSON.parse(props.q.options)[`${props.q.answer}`]}` : props.q.answer
                        : "Show Answer"}
                    </h1>
                </div>
            </div>
        </div>
    );
}


// Type definitions
type StudyQuestions = {
    questions: UserStudySetQuestionSchema[];
}
type StudySetQuestionCardProps = {
    q: UserStudySetQuestionSchema;
    i: number;
    current: number;
}