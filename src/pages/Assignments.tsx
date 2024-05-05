import { useState } from "react";
import AssignmentTable from "@/components/assignment/AssignmentTable";
import { DashboardContainer } from "@/components/ui/DashboardContainer";
import { Clipboard as AssignmentsIcon } from "lucide-react";
import AssignmentModal from "@/components/assignment/AssignmentModal";
import AssignmentDisplay from "@/components/assignment/AssignmentDisplay";
import { Card } from "@/components/ui/Card";
import { useGet } from "@/hooks/useApi";

export default function Assignments() {
  const [showForm, setShowForm] = useState(false);

  const { data, loading, error } = useGet("/users/1/assignments");

  return (
    <DashboardContainer
      subHeader="Assignments"
      header="Your Assignments"
      headerIcon={<AssignmentsIcon />}
      callToAction={() => {
        setShowForm(!showForm);
      }}
      callToActionText="Add New Assignment"
      dropDown={false}
    >
      <AssignmentModal show={showForm} setShow={setShowForm} />
      <section className="flex flex-col gap-4">
        <div className="flex gap-x-4">
          <Card className="px-4 py-6 bg-[#f5f5f5] flex items-center justify-between basis-1/2">
            <h3 className="text-2xl">Total Assignments</h3>
            <span className="text-4xl">
              {data ? data.assignments.length : "0"}
            </span>
          </Card>
          <Card className="px-4 py-6 bg-[#f5f5f5] flex items-center justify-between basis-1/2">
            <h3 className="text-2xl">Overdue Assignments</h3>
            <span className="text-4xl">2</span>
          </Card>
        </div>
        {/* <AssignmentTable /> */}
        <AssignmentDisplay />
      </section>
    </DashboardContainer>
  );
}
