// Component imports
import { DashboardContainer } from "@/components/ui/DashboardContainer";

// Hook, util, and schema imports
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ExamSchema } from "@/schema";
import get from "@/utils/get";

export default function Exam() {

    // Get params
    const { id } = useParams();

    // State management
    const [exam, setExam] = useState<(ExamSchema & CourseSnapshot) | null>(null);

    // Get initial data
    useEffect(() => {
        get(setExam, "exam", `/exams/${id}`);
    }, []);

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