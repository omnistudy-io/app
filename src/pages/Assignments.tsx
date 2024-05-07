// Component imports
import { DashboardContainer } from "@/components/ui/DashboardContainer";
import AssignmentModal from "@/components/modals/AssignmentModal";
import AssignmentDisplay from "@/components/assignment/AssignmentDisplay";
import { Card } from "@/components/ui/Card";

// Hook, util, and schema imports
import { useEffect, useState } from "react";
import get from "@/utils/get";
import { AssignmentSchema } from "@/schema";

// Icon imports
import { Clipboard as AssignmentsIcon, PlusIcon } from "lucide-react";

export default function Assignments() {
  const [showForm, setShowForm] = useState(false);

  const [assignments, setAssignments] = useState<(AssignmentSchema & CourseSnapshot)[] | null>(null);
  const [overdue, setOverdue] = useState<number>(0);

  // Get initial data
  useEffect(() => {
    get((data: (AssignmentSchema & CourseSnapshot)[]) => {
      setAssignments(data);
      if(data)
        setOverdue(data.filter((assignment) => new Date(assignment.due_at) < new Date()).length);
    }, "assignments", "/users/{uid}/assignments");
  }, []);

  return (
    <DashboardContainer
      subHeader="Assignments"
      header="Your Assignments"
      headerIcon={<AssignmentsIcon />}
      callToAction={() => {
        setShowForm(!showForm);
      }}
      callToActionText="New Assignment"
      callToActionIcon={<PlusIcon size={16} />}
      dropdown={false}
    >
      <AssignmentModal show={showForm} setShow={setShowForm} />
      <section className="flex flex-col gap-4">
        <div className="flex gap-x-4">
          <Card className="px-4 py-6 bg-[#f5f5f5] flex items-center justify-between basis-1/2">
            <h3 className="text-2xl">Total Assignments</h3>
            <span className="text-4xl">
              {assignments ? assignments.length : 0}
            </span>
          </Card>
          <Card className="px-4 py-6 bg-[#f5f5f5] flex items-center justify-between basis-1/2">
            <h3 className="text-2xl">Overdue Assignments</h3>
            <span className="text-4xl">{overdue}</span>
          </Card>
        </div>
        <AssignmentDisplay />
      </section>
    </DashboardContainer>
  );
}

// Type definitions
type CourseSnapshot = {
  courseTitle: string;
  courseNumber: string;
  courseSubject: string;
};