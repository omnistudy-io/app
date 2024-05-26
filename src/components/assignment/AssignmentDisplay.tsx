// Component imports
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { Link } from "react-router-dom";
import { Card } from "../ui/Card";

// Hook, util, and schema imports
import { useEffect, useState } from "react";
import get from "@/utils/get";
import formatDate from "@/utils/formatDate";
import { AssignmentSchema } from "@/schema";

// Icon imports
import { MessageSquareWarningIcon as OverdueIcon } from "lucide-react";

/**
 * Assignment display component
 * @param props Props to send
 * @returns JSX.Element
 */
export default function AssignmentDisplay(props: AssignmentDisplayProps) {
  // Endpoint for the API call
  const endpoint = props.endpoint || "/users/{uid}/assignments";

  // State management
  const [assignments, setAssignments] = useState<
    (AssignmentSchema & CourseSnapshot)[] | null
  >(null);

  // Get initial data
  useEffect(() => {
    get(setAssignments, "assignments", endpoint);
  }, []);

  // Return JSX
  return (
    <Card className={`${props.className} p-4 bg-[#f5f5f5] h-full`}>
      <div>
        <h3 className="text-2xl">
          <Link to="/assignments">Assignments</Link>
        </h3>
      </div>

      <div className="py-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Course</TableHead>
              <TableHead className="w-[150px]">Progress</TableHead>
              <TableHead className="text-right">Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* If assignments found */}
            {assignments &&
              assignments.map(
                (assignment: AssignmentSchema & CourseSnapshot, i: number) => {
                  const fullCourseName = `${assignment.courseSubject} ${assignment.courseNumber}: ${assignment.courseTitle}`;
                  const courseName =
                    fullCourseName.length > 24
                      ? fullCourseName.slice(0, 24) + "..."
                      : fullCourseName;
                  return (
                    <TableRow key={i}>
                      <TableCell className="flex flex-col gap-y-1 hover:underline hover:text-[#00adb5] transition-all duration-150 whitespace-nowrap">
                        {window.location.href.includes("courses") ? (
                          <Link
                            reloadDocument
                            to={`/assignments/${assignment.id}`}
                          >
                            {assignment.title}
                          </Link>
                        ) : (
                          <Link to={`/assignments/${assignment.id}`}>
                            {assignment.title}
                          </Link>
                        )}
                      </TableCell>
                      <TableCell className="hover:underline hover:text-[#00adb5] transition-all duration-150 whitespace-nowrap">
                        <Link to={`/courses/${assignment.course_id}`}>
                          {courseName}
                        </Link>
                      </TableCell>
                      <TableCell className="flex flex-row gap-x-4">
                        <p>{assignment.progress}%</p>
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap">
                        <div className="flex flex-row gap-x-2 items-center justify-end">
                          {/* Show a small badge if overdue */}
                          {new Date(assignment.due_at) < new Date() ? (
                            <>
                              {/* Create a tooltip that explains this icon */}
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger className="flex flex-row gap-x-2 items-center justify-end">
                                    <OverdueIcon
                                      className="text-red-500"
                                      size={20}
                                    />
                                    <p className="text-red-500">
                                      {formatDate(assignment.due_at)}
                                    </p>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    Assignment Overdue
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </>
                          ) : (
                            <p>{formatDate(assignment.due_at)}</p>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            {/* No assignments found */}
            {!assignments && (
              <TableRow>
                <TableCell>No assignments</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}

// ---------- TYPE DEFINITIONS ---------- //
type AssignmentDisplayProps = {
  className?: string;
  endpoint?: string;
};

type CourseSnapshot = {
  courseSubject: string;
  courseNumber: string;
  courseTitle: string;
};
