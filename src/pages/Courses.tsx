import { useEffect, useState } from "react";
import { useGet } from "@/hooks/useApi";
import { useToast } from "@/hooks/useToast";

import AssignmentDisplay from "@/components/assignment/AssignmentDisplay";
import ExamDisplay from "@/components/exams/ExamDisplay";
import CourseCard from "@/components/courses/CourseCard";
import { DashboardContainer } from "@/components/ui/DashboardContainer";
import { GraduationCap as CoursesIcon, PlusIcon } from "lucide-react";
import CoursesModal from "@/components/modals/CoursesModal";
import { CourseSchema } from "@/schema";
import get from "@/utils/get";

export default function Courses() {
  const [showForm, setShowForm] = useState(false);

  const { toast } = useToast();
  const [courses, setCourses] = useState<CourseSchema[]>([]);

  useEffect(() => {
    get(setCourses, "courses", "/users/{uid}/courses");
  }, []);

  return (
    <DashboardContainer
      subHeader="Courses"
      header="Your Courses"
      headerIcon={<CoursesIcon />}
      callToAction={() => {
        setShowForm(!showForm);
      }}
      callToActionText="New Course"
      callToActionIcon={<PlusIcon size={16} />}
      dropDown={false}
    >
      <CoursesModal show={showForm} setShow={setShowForm} updateCourses={setCourses} />
      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-4">
          {courses && courses.length > 0 ? (
            courses.map((course: any, index: number) => (
              <CourseCard course={course} key={index} />
            ))
          ) : (
            <div>You have no courses</div>
          )}
        </div>
        <div className="flex gap-4" >
          <AssignmentDisplay className="basis-3/5" />
          <ExamDisplay className="basis-2/5"></ExamDisplay>
        </div>
      </section>
    </DashboardContainer>
  );
}
