import { DashboardContainer } from "@/components/ui/DashboardContainer";
import { CircleAlertIcon } from "lucide-react";

export default function NotFound() {
    return (
        <DashboardContainer
            subHeader={"Not Found"}
            header="404 Not Found"
            headerIcon={<CircleAlertIcon />}
            dropDown={false}
        >
            <div className="flex flex-col items-start justify-center w-full h-full">
                <p className="text-lg">The page you are looking for does not exist.</p>
                <button onClick={() => window.history.back()} className="mt-4 bg-[#00adb5] text-white px-4 py-2 rounded-lg">Go Back</button>
            </div>
        </DashboardContainer>

    );
}