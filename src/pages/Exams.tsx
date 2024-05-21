// Component imports
import { DashboardContainer } from "@/components/ui/DashboardContainer";
import { Card } from "@/components/ui/Card";
import ExamDisplay from "@/components/exams/ExamDisplay";
import ExamModal from "@/components/modals/ExamModal";

// Hook, util, and schema imports
import { useState, useEffect } from "react";
import get from "@/utils/get";
import formatDate from "@/utils/formatDate";
import { ExamSchema } from "@/schema";

// Icon imports
import {
  TimerIcon as ExamsIcon,
  GraduationCap as CoursesIcon,
  Calendar,
  PlusIcon,
} from "lucide-react";

export default function Exams() {
  // State management
  const [exams, setExams] = useState<(ExamSchema & CourseSnapshot)[] | null>(
    null
  );
  const [showNewForm, setShowNewForm] = useState<boolean>(false);

  // Get initial data
  useEffect(() => {
    get(setExams, "exams", "/users/{uid}/exams");
  }, []);

  return (
    <DashboardContainer
      subHeader={"Exams"}
      header="Exams"
      headerIcon={<ExamsIcon />}
      callToAction={() => setShowNewForm(true)}
      callToActionText={"New Exam"}
      callToActionIcon={<PlusIcon />}
      dropdown={false}
    >
      {/* Create new exam modal */}
      <ExamModal show={showNewForm} setShow={setShowNewForm} />

      <div className="flex flex-row gap-x-4">
        {/* Upcoming exams card */}
        <Card className="p-4 basis-1/3 bg-[#f5f5f5]">
          <h3 className="text-2xl">Upcoming Exams</h3>
          <div className="flex flex-col">
            {exams &&
              exams
                .sort(
                  (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
                )
                .map((exam, i) => {
                  return new Date(exam.date).getTime() >
                    new Date().getTime() ? (
                    <a
                      href={`/exams/${exam.id}`}
                      className="hover:bg-[#ededed] transition-all duration-150"
                    >
                      <div
                        className={`${
                          i === exams.length - 1 ? "" : "border-b"
                        } border-stone-300 py-2 px-2`}
                      >
                        <p className="text-lg">{exam.title}</p>
                        <div className="flex flex-row gap-x-2 items-center">
                          <CoursesIcon size={16} />
                          <p className="text-sm">
                            {exam.courseSubject} {exam.courseNumber}:{" "}
                            {exam.courseTitle}
                          </p>
                        </div>
                        <div className="flex flex-row gap-x-2 items-center">
                          <Calendar size={16} />
                          <p className="text-sm">{formatDate(exam.date)}</p>
                        </div>
                      </div>
                    </a>
                  ) : null;
                })}
          </div>
        </Card>

        {/* All exams card */}
        <ExamDisplay className="basis-2/3" />
      </div>
    </DashboardContainer>
  );
}

// Type definitions
type CourseSnapshot = {
  courseSubject: string;
  courseNumber: string;
  courseTitle: string;
};
