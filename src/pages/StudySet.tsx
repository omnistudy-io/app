import { DashboardContainer } from "@/components/ui/DashboardContainer";
import { UserStudySetSchema, UserStudySetQuestionSchema } from "@/schema";
import { NotebookIcon as StudySetIcon } from "lucide-react";

import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/Pagination";

import get from "@/utils/get";
import AuthContext from "@/context/AuthContext";
import NotFound from "./NotFound";

type StudyQuestions = {
    questions: UserStudySetQuestionSchema[];
}

export default function StudySet() {

    // Hooks
    const { id } = useParams<{ id: string }>();
    const { user } = useContext(AuthContext);

    // State management
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

    return (
        <DashboardContainer
            subHeader={"Study Set"}
            header={studySet?.title || "Study Set"}
            headerIcon={<StudySetIcon />}
            callToAction={() => {
                // setShowForm(!showForm);
            }}
            callToActionText="Edit Study Set"
            dropDown={false}
        >
            <div className="p-2 flex flex-row justify-center relative mb-4">
                {studySet != null && studySet.questions.map((q, i) => {
                    return <div 
                        key={q.id} 
                        style={{ position: "relative", left: `${((i + 1) - currentQuestion) * 2000}px` }}
                        className={`${(i + 1) - currentQuestion !== 0 ? "w-0 h-0 p-0 border-0" : "w-full p-4 border"} bg-white shadow-sm border-stone-200 rounded-lg`}
                    >
                        <div className="h-40 flex justify-center items-center">
                            <div className="absolute top-5 left-5 text-stone-400">
                                <h2>Question {i + 1}</h2>
                            </div>

                            <div className="text-center">
                                <h1 className="text-3xl mb-6"><b>{q.question.replace("[FITB]", "_____________")}</b></h1>
                                <h1 className="text-2xl text-[#00adb5] hover:underline cursor-pointer">
                                    {q.answer}
                                </h1>
                            </div>
                        </div>
                    </div>
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