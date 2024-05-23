import { DashboardContainer } from "@/components/ui/DashboardContainer";
import { Calendar as ScheduleIcon } from "lucide-react";

export default function Schedule() {
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
