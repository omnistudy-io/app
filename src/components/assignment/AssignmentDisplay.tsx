import { useEffect, useState } from "react";
import { Card } from "../ui/Card";
import { useGet } from "@/hooks/useApi";
import formatDate from "@/utils/formatDate";
import { AssignmentSchema } from "@/schema";
import { Check, Clock } from "lucide-react";
import { toast } from "@/hooks/useToast";
import { Link } from "react-router-dom";

export default function AssignmentDisplay(props: AssignmentDisplayProps) {
  // const { data, loading, error } = useGet("/users/{userId}/assignments");

  const [assignmentStatus, setAssignmentStatus] = useState<any[]>([]);

  const endpoint = props.endpoint || "/users/{userId}/assignments";

  const { data } = useGet(endpoint);

  useEffect(() => {
    if (data) {
      setAssignmentStatus(data.assignments.map(() => false));
    }
  }, [data]);

  const handleAssignmentStatus = (index: number) => {
    setAssignmentStatus((prevStatus: any) => {
      const newStatus = [...prevStatus];
      newStatus[index] = !newStatus[index];
      return newStatus;
    });
  };

  return (
    <Card className={`${props.className} p-4 bg-[#f5f5f5] h-full`}>
      <div className="mb-4">
        <h3 className="text-2xl mb-2">
          <Link to="/assignments">Assignments</Link>
        </h3>
        <div className="grid grid-cols-4 border-y border-[#34354a] text-sm">
          <span className="flex items-center">Name</span>
          <span className="flex items-center">Class</span>
          <span className="py-2 pr-4">Status</span>
          <span className="flex items-center justify-end">Due Date</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 text-left">
        {data?.assignments.map(
          (
            assignment: AssignmentSchema & { courseTitle: string },
            index: number
          ) => (
            <div className="grid grid-cols-4 text-sm gap-x-2" key={index}>
              <div className="flex items-center">
                <span>{assignment.title}</span>
              </div>
              <div className="flex items-center whitespace-nowrap overflow-hidden">
                <span>{assignment.courseTitle}</span>
              </div>
              <div className="flex items-center">
                {/* Use assignmentStatus[index] to determine the status */}
                <span
                  onClick={() => {
                    handleAssignmentStatus(index);
                    toast({
                      title: `${assignment.title}`,
                      description: !assignmentStatus[index]
                        ? "Done"
                        : "In Progress",
                    });
                  }}
                  className={`py-1 px-3 rounded cursor-pointer hover:shadow ${
                    assignmentStatus[index]
                      ? "bg-[#00adb520]"
                      : "bg-[#86868620]"
                  }`}
                >
                  {assignmentStatus[index] ? (
                    <div className="flex items-center gap-x-2">
                      <Check
                        strokeWidth={3}
                        className="w-[20px] h-[20px] border-[1.9px] border-[#00adb5] p-[.125rem] rounded-full text-[#00adb5]"
                      />
                      Done
                    </div>
                  ) : (
                    <div className="flex items-center gap-x-2">
                      <Clock className="h-[20px] w-[20px]" /> In Progress
                    </div>
                  )}
                </span>
              </div>
              <div className="flex items-center justify-end">
                <span>{formatDate(assignment.due_at)}</span>
              </div>
            </div>
          )
        )}
      </div>
    </Card>
  );
}

// ---------- TYPE DEFINITIONS ---------- //

type AssignmentDisplayProps = {
  className?: string;
  endpoint?: string;
};
