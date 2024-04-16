import { useState } from "react";
import { Card } from "../ui/Card";

export default function AssignmentTable() {
  const [assignments, setAssignments] = useState([
    { name: "Final Exam", class: "CSci 4061", dueDate: "May 01" },
    { name: "Lab 08", class: "CSci 4061", dueDate: "April 02" },
    { name: "Lab 08", class: "CSci 4061", dueDate: "April 02" },
    { name: "Lab 08", class: "CSci 4061", dueDate: "April 02" },
    
  ]);
  const [assignmentStatus, setAssignmentStatus] = useState(assignments.map(() => false));

  // Handler to toggle the status of a specific assignment
  const handleAssignmentStatus = (index: number) => {
    setAssignmentStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[index] = !newStatus[index];
      return newStatus;
    });
  };

  // Handler to delete a specific assignment
  const handleDeleteAssignment = (index: number) => {
    setAssignments((prevAssignments) => prevAssignments.filter((_, i) => i !== index));
    setAssignmentStatus((prevStatus) => prevStatus.filter((_, i) => i !== index));
  };

return (
    <Card className="w-full p-4 bg-[#f5f5f5] h-full">
        <div className="mb-4">
            <h3 className="text-2xl mb-2">Assignments</h3>
            <div className="grid grid-cols-5 border-y border-[#34354a] text-sm">
                <span>Name</span>
                <span>Class</span>
                <span>Status</span>
                <span>Due Date</span>
                <span>Action</span>
            </div>
        </div>
        <div className="flex flex-col gap-2 text-left">
            {assignments.map((assignment, index) => (
                <div className="grid grid-cols-5 text-sm" key={index}>
                    <div>{assignment.name}</div>
                    <div>{assignment.class}</div>
                    <div
                        onClick={() => handleAssignmentStatus(index)}
                        style={{ width: '80px' }}  
                        className={`cursor-pointer hover:shadow ${
                            assignmentStatus[index] ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-800"
                        } rounded py-1 text-xs flex justify-center items-center`}
                    >
                        <span>
                            {assignmentStatus[index] ? "Done" : "In Progress"}
                        </span>
                    </div>
                    <div>{assignment.dueDate}</div>
                    <div>
                        {assignmentStatus[index] && (
                            <button
                                onClick={() => handleDeleteAssignment(index)}
                                style={{ width: '80px' }}  
                                className="bg-red-500 hover:bg-red-600 text-white rounded"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </Card>
);
}
