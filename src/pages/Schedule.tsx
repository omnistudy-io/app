import { DashboardContainer } from "@/components/ui/DashboardContainer";
import { Calendar as ScheduleIcon } from "lucide-react";

export default function Schedule() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <DashboardContainer
      header={"Your Schedule"}
      subHeader={"Schedule"}
      headerIcon={<ScheduleIcon />}
      dropdown={false}
    >
      hello
    </DashboardContainer>
  );
}
