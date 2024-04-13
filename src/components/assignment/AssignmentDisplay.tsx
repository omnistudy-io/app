import { useState } from "react";
import { Card } from "../ui/Card";

const assignments = [
  {
    name: "Final Exam",
    class: "CSci 4061",
    dueDate: "May 01",
  },
  {
    name: "Lab 08",
    class: "CSci 4061",
    dueDate: "April 02",
  },
  {
    name: "Lab 08",
    class: "CSci 4061",
    dueDate: "April 02",
  },
  {
    name: "Lab 08",
    class: "CSci 4061",
    dueDate: "April 02",
  },
  {
    name: "Lab 08",
    class: "CSci 4061",
    dueDate: "April 02",
  },
  {
    name: "Lab 08",
    class: "CSci 4061",
    dueDate: "April 02",
  },
];

export default function AssignmentDisplay() {
  const [assignmentStatus, setAssignmentStatus] = useState(
    assignments.map(() => false)
  );

  // Handler to toggle status of a specific assignment
  const handleAssignmentStatus = (index: number) => {
    setAssignmentStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[index] = !newStatus[index];
      return newStatus;
    });
  };

  return (
    <Card className="basis-3/5 p-4 bg-[#f5f5f5] h-full">
      <div className="mb-4">
        <h3 className="text-2xl mb-2">
          <a href="">Assignments</a>
        </h3>
        <div className="grid grid-cols-4 border-y border-[#34354a] text-sm">
          <span className="flex items-center">Name</span>
          <span className="flex items-center">Class</span>
          <span className="py-2 pr-4">Status</span>
          <span className="flex items-center justify-end">Due Date</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 text-left">
        {assignments.map((assignment, index) => (
          <div className="grid grid-cols-4 text-sm" key={index}>
            <div className="flex items-center">
              <span>{assignment.name}</span>
            </div>
            <div className="flex items-center">
              <span>{assignment.class}</span>
            </div>
            <div className="flex items-center">
              {/* Use assignmentStatus[index] to determine the status */}
              <span
                onClick={() => handleAssignmentStatus(index)}
                className={`py-1 px-4 rounded cursor-pointer hover:shadow ${
                  assignmentStatus[index] ? "bg-[#00adb520]" : "bg-[#86868620]"
                }`}
              >
                {assignmentStatus[index] ? "Done" : "In Progress"}
              </span>
            </div>
            <div className="flex items-center justify-end">
              <span>{assignment.dueDate}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ---------- TYPE DEFINITIONS ---------- //
