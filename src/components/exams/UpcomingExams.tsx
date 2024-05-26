import { ExamSchema } from "@/schema";
import get from "@/utils/get";
import React, { useEffect, useState } from "react";
import { Card } from "../ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import upcoming from "@/utils/upcoming";
import formatDate from "@/utils/formatDate";

export default function UpcomingExams() {
  const [exams, setExams] = useState<(ExamSchema & CourseSnapshot)[] | null>(
    null
  );

  // Get initial data
  useEffect(() => {
    get(setExams, "exams", "/users/{uid}/exams");
  }, []);

  const today = new Date();
  const test = new Date("2024-04-17T00:00:00");

  // Filter exams to find upcoming ones
  const upcomingExams =
    exams?.filter((exam) => upcoming(exam.date, today.toISOString(), 14)) || [];

  return (
    <Card className="bg-[#f5f5f5] p-4">
      <h3 className="text-2xl mb-2">Upcoming Exams</h3>
      {exams && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Course</TableHead>
              <TableHead className="text-right">Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {upcomingExams.length > 0 ? (
              upcomingExams.map(
                (exam: ExamSchema & CourseSnapshot, i: number) => (
                  <TableRow key={i}>
                    <TableCell className="whitespace-nowrap">
                      {exam.title}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {exam.courseSubject} {exam.courseNumber}
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      {formatDate(exam.date)}
                    </TableCell>
                  </TableRow>
                )
              )
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  No exams coming up
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}

// ---------- TYPE DEFINITIONS ---------- //

type CourseSnapshot = {
  courseSubject: string;
  courseNumber: string;
  courseTitle: string;
};
