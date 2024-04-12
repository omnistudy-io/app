import { Card } from "../ui/Card";

const assignments = [
  {
    name: "Final Exam",
    class: "CSci 4061",
    status: false,
    dueDate: "May 01",
  },
  {
    name: "Lab 08",
    class: "CSci 4061",
    status: true,
    dueDate: "April 02",
  },
  {
    name: "Lab 08",
    class: "CSci 4061",
    status: true,
    dueDate: "April 02",
  },
  {
    name: "Lab 08",
    class: "CSci 4061",
    status: true,
    dueDate: "April 02",
  },
  {
    name: "Lab 08",
    class: "CSci 4061",
    status: true,
    dueDate: "April 02",
  },
  {
    name: "Lab 08",
    class: "CSci 4061",
    status: true,
    dueDate: "April 02",
  },
];

export default function AssignmentDisplay() {
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
            {assignment.status ? (
              <div className="flex items-center">
                <span className="py-1 px-4 bg-[#00adb520] rounded">Done</span>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="py-1 px-4 bg-[#86868620] rounded">
                  In Progress
                </span>
              </div>
            )}
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
