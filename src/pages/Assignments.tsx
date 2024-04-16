import { useState } from "react";
import AssignmentTable from "@/components/assignment/AssignmentTable";
import { DashboardContainer } from "@/components/ui/DashboardContainer";
import { Clipboard as AssignmentsIcon } from "lucide-react";
import AssignmentModal from "@/components/assignment/AssignmentModal";

export default function Assignments() {
  const [showForm, setShowForm] = useState(false);

  return (
    <DashboardContainer
        header="Assignments"
        headerIcon={<AssignmentsIcon />}
        callToAction={() => {
            setShowForm(!showForm);
        }}
        callToActionText="Add New Assignment"
    >
      <AssignmentModal show={showForm} setShow={setShowForm} />
      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-4">
        </div>
        <div className="flex gap-4">
          <AssignmentTable />
        </div>
      </section>
    </DashboardContainer>
  );
}
