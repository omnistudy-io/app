import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { AssignmentSchema } from "@/schema";
import formatDate from "@/utils/formatDate";
import get from "@/utils/get";
import upcoming from "@/utils/upcoming";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../ui/Card";

export default function DueThisWeek() {
  const [assignments, setAssignments] = useState<
    (AssignmentSchema & CourseSnapshot)[] | null
  >(null);

  useEffect(() => {
    get(setAssignments, "assignments", "/users/{uid}/assignments");
  }, []);

  const today = new Date();
  const test = new Date("2024-04-17T00:00:00");

  // Filter exams to find upcoming ones
  const assignmentsThisWeek =
    assignments?.filter((assignment) =>
      upcoming(assignment.due_at, today.toISOString(), 7)
    ) || [];

  return (
    <>
      <Card className="bg-[#f5f5f5] p-4">
        <h3 className="text-2xl mb-2">Due This Week</h3>
        {assignments && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Course</TableHead>
                <TableHead className="text-right">Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignmentsThisWeek.length > 0 ? (
                assignmentsThisWeek.map(
                  (
                    assignment: AssignmentSchema & CourseSnapshot,
                    i: number
                  ) => (
                    <TableRow key={i}>
                      <TableCell className="whitespace-nowrap">
                        <Link to={`/assignments/${assignment.id}`}>
                          {assignment.title}
                        </Link>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Link to={`/courses/${assignment.course_id}`}>
                          {assignment.courseSubject} {assignment.courseNumber}
                        </Link>
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap">
                        {formatDate(assignment.due_at)}
                      </TableCell>
                    </TableRow>
                  )
                )
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No Assignments Due this week
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </Card>
    </>
  );
}

// ---------- TYPE DEFINITIONS ---------- //

type CourseSnapshot = {
  courseSubject: string;
  courseNumber: string;
  courseTitle: string;
};
