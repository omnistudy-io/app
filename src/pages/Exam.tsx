// Component imports
import { DashboardContainer } from "@/components/ui/DashboardContainer";
import NotFound from "./NotFound";

// Hook, util, and schema imports
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CourseSchema, ExamSchema } from "@/schema";
import get from "@/utils/get";
import AuthContext from "@/context/AuthContext";

export default function Exam() {

    // Hooks
    const { id } = useParams();
    const { user } = useContext(AuthContext);

    // State management
    const [exam, setExam] = useState<(ExamSchema & CourseSnapshot) | null>(null);
    const [course, setCourse] = useState<CourseSchema | null>(null);

    // Get initial data
    useEffect(() => {
        get((data: (ExamSchema & CourseSnapshot)) => {
            setExam(data);
            if(data)
                get(setCourse, "course", `/courses/${data.course_id}`);
        }, "exam", `/exams/${id}`);
    }, []);

    // If the exam does not exist, return a 404 page
    if (!exam) {
        return (
            <NotFound />
        );
    }

    // If user does not own exam, return a 404 page
    if(course?.user_id != user?.id) {
        return(
            <NotFound />
        )
    }

    return(
        <DashboardContainer
            subHeader={`${exam?.courseSubject} ${exam?.courseNumber}: ${exam?.courseTitle}`}
            header={`${exam?.title} Exam`}
            callToAction={() => {}}
            callToActionText={"Create New"}
            dropDown={false}
        >
            <h1>Exam Stuff Here</h1>
        </DashboardContainer>
    );
}

// Type definitions
type CourseSnapshot = {
    courseNumber: string;
    courseSubject: string;
    courseTitle: string;
}