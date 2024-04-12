import AssignmentDisplay from "@/components/assignment/AssignmentDisplay";
import CourseCard from "@/components/courses/CourseCard";
import Grades from "@/components/Grades";
import { DashboardContainer } from "@/components/ui/DashboardContainer";
import { GraduationCap as CoursesIcon } from "lucide-react";

const courses = [
  {
    name: "Object Oriented",
    courseNumber: 240,
    professor: "Scott Yilek",
    startDate: "Feb 26, 2024",
    endDate: "Aug 18, 2024",
  },
  {
    name: "Object Oriented",
    courseNumber: 240,
    professor: "Scott Yilek",
    startDate: "Feb 26, 2024",
    endDate: "Aug 18, 2024",
  },
  {
    name: "Object Oriented",
    courseNumber: 240,
    professor: "Scott Yilek",
    startDate: "Feb 26, 2024",
    endDate: "Aug 18, 2024",
  },
  {
    name: "Object Oriented",
    courseNumber: 240,
    professor: "Scott Yilek",
    startDate: "Feb 26, 2024",
    endDate: "Aug 18, 2024",
  },
];

export default function Courses() {
  const action = () => {
    console.log("action");
  };

  return (
    <DashboardContainer
      header="Courses"
      headerIcon={<CoursesIcon />}
      callToAction={action}
      callToActionText="Add New Course"
    >
      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-4">
          {courses.map((course, index) => (
            <CourseCard course={course} key={index} />
          ))}
        </div>
        <div className="flex gap-4">
          <AssignmentDisplay />
          <Grades />
        </div>
      </section>
    </DashboardContainer>
  );
}
