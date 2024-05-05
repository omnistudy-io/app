// Component imports
import { DashboardContainer } from "@/components/ui/DashboardContainer";

// Icon imports
import { TimerIcon as ExamsIcon } from "lucide-react";

export default function Exams() {
    return(
        <DashboardContainer
            subHeader={"Exams"}
            header="Exams"
            headerIcon={<ExamsIcon />}
            callToAction={() => {}}
            callToActionText={"Create New"}
            dropDown={false}
        >
            <h1>Exams</h1>
        </DashboardContainer>
    );
}