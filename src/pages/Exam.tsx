// Component imports
import { DashboardContainer } from "@/components/ui/DashboardContainer";
import NotFound from "./NotFound";
import ConfirmModal from "@/components/modals/ConfirmModal";

// Hook, util, and schema imports
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/useToast";
import get from "@/utils/get";
import del from "@/utils/del";
import AuthContext from "@/context/AuthContext";
import { CourseSchema, ExamSchema } from "@/schema";

// Icon imports


export default function Exam() {

    // Hooks
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const { toast } = useToast();
    const navigate = useNavigate();

    // State management
    const [exam, setExam] = useState<(ExamSchema & CourseSnapshot) | null>(null);
    const [course, setCourse] = useState<CourseSchema | null>(null);
    const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

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

    // TODO: Implement edit exam functionality
    async function handleEdit() {

    }

    // TODO: Implement delete exam functionality
    async function handleDelete() {
        del((data: any) => { 
            // If the request was not successful, show an error toast
            if(data.code !== 200) {
              toast({ title: "Failed to delete exam", description: "An error occured while deleting the exam, please try again later." });
            }
            // If the request was successful, show a success toast and navigate to the courses page
            else {
              toast({ title: "Success", description: `Exam ${exam?.title} deleted successfully.` });
              navigate("/exams");
            }
          }, `/exams/${id}`); 
    }

    /**
     * Dropdown options for the exam
     */
    const options = [
        { label: "Edit Exam", onClick: handleEdit },
        { label: "Delete Exam", onClick: () => { setShowConfirmDelete(true) } }
    ];

    return(
        <DashboardContainer
            subHeader={`${exam?.courseSubject} ${exam?.courseNumber}: ${exam?.courseTitle}`}
            header={`${exam?.title} Exam`}
            callToAction="Options"
            callToActionText="Options"
            dropdown={true}
            dropdownOptions={options}
        >
            {/* Confirm Delete Modal */}
            <ConfirmModal
                title="Delete Exam"
                message={`Are you sure you want to delete this ${exam?.title} exam?`}
                show={showConfirmDelete}
                setShow={setShowConfirmDelete}
                confirmText="Delete"
                confirmCallback={handleDelete}
            />

            <section>

            </section>
        </DashboardContainer>
    );
}

// Type definitions
type CourseSnapshot = {
    courseNumber: string;
    courseSubject: string;
    courseTitle: string;
}