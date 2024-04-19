import { useEffect, useState } from "react";
import { useGet } from "@/hooks/useApi";
import { useToast } from "@/hooks/useToast";

import AssignmentDisplay from "@/components/assignment/AssignmentDisplay";
import CourseCard from "@/components/courses/CourseCard";
import Grades from "@/components/Grades";
import { DashboardContainer } from "@/components/ui/DashboardContainer";
import { GraduationCap as CoursesIcon } from "lucide-react";
import CoursesModal from "@/components/courses/CoursesModal";

// const courses = [
//   {
//     name: "Object Oriented",
//     courseNumber: 240,
//     professor: "Scott Yilek",
//     startDate: "Feb 26, 2024",
//     endDate: "Aug 18, 2024",
//   },
//   {
//     name: "Object Oriented",
//     courseNumber: 240,
//     professor: "Scott Yilek",
//     startDate: "Feb 26, 2024",
//     endDate: "Aug 18, 2024",
//   },
//   {
//     name: "Object Oriented",
//     courseNumber: 240,
//     professor: "Scott Yilek",
//     startDate: "Feb 26, 2024",
//     endDate: "Aug 18, 2024",
//   },
//   {
//     name: "Object Oriented",
//     courseNumber: 240,
//     professor: "Scott Yilek",
//     startDate: "Feb 26, 2024",
//     endDate: "Aug 18, 2024",
//   },
// ];

export default function Courses() {
  const [showForm, setShowForm] = useState(false);

  const { toast } = useToast();
  const { data, loading, error } = useGet("/users/2/courses");

  return (
    <DashboardContainer
      header="Courses"
      headerIcon={<CoursesIcon />}
      callToAction={() => {
        setShowForm(!showForm);
      }}
      callToActionText="Add New Course"
    >
      <CoursesModal show={showForm} setShow={setShowForm} />
      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-4">
          {data?.courses.length > 0 ? (
            data?.courses.map((course: any, index: number) => (
              <CourseCard course={course} key={index} />
            ))
          ) : (
            <div>You have no courses</div>
          )}
        </div>
        <div
          className="flex gap-4"
          onClick={() => toast({ title: "Hey", description: "Wassup" })}
        >
          <AssignmentDisplay />
          <Grades />
        </div>
      </section>
    </DashboardContainer>
  );
}
