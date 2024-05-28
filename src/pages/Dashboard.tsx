import DueThisWeek from "@/components/assignment/DueThisWeek";
import CourseDisplay from "@/components/courses/CourseDisplay";
import UpcomingExams from "@/components/exams/UpcomingExams";
import { Card } from "@/components/ui/Card";
import { DashboardContainer } from "@/components/ui/DashboardContainer";
import { useGet } from "@/hooks/useApi";
import { CourseSchema } from "@/schema";
import get from "@/utils/get";
import {
  LayoutDashboard as DashboardIcon,
  GraduationCap as CoursesIcon,
  TimerIcon as ExamsIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DailyUsage from "@/components/dashboard/DailyUsage";

export default function Dashboard() {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const { data, loading, error } = useGet(`/auth/validate/${token}`);
  const [courses, setCourses] = useState<CourseSchema[]>([]);
  const [exams, setExams] = useState<CourseSchema[]>([]);

  useEffect(() => {
    get(setCourses, "courses", "/users/{uid}/courses");
    get(setExams, "exams", "/users/{uid}/exams");
  }, []);

  const action = () => {
    console.log("action");
  };

  return (
    <DashboardContainer
      subHeader="Dashboard"
      header="Your Dashboard"
      headerIcon={<DashboardIcon />}
      callToAction={action}
      callToActionText="Dashboard"
      dropdown={false}
    >
      {/* <h1>Dashboard</h1> */}
      {/* <p>Welcome back, {!loading ? data.user.name : null}</p> */}
      <section className="flex gap-4">
        <div className="flex flex-col gap-4 basis-3/5">
          <DailyUsage />
          <div className="flex gap-4">
            <div className="flex flex-col gap-4 basis-1/5">
              <Link to="/courses">
                <Card className="h-full group bg-[#f5f5f5] p-4 flex flex-col gap-2 items-center justify-center cursor-pointer hover:bg-[#34354a] hover:text-[#fff] transition-all duration-300">
                  <CoursesIcon
                    size={40}
                    className="p-2 bg-[#34354a] rounded-lg text-white group-hover:bg-[#f5f5f5] group-hover:text-[#000]"
                  />
                  <h4 className="text-xl font-bold leading-none">
                    {courses.length}
                  </h4>
                  <p className="text-xs">Total Courses</p>
                </Card>
              </Link>
              <Link to="/exams">
                <Card className="h-full group bg-[#34354a] p-4 flex flex-col gap-2 items-center justify-center text-white cursor-pointer hover:bg-[#f5f5f5] hover:text-[#000] transition-all duration-300">
                  <ExamsIcon
                    size={40}
                    className="p-2 bg-[#f5f5f5] rounded-lg text-[#000] group-hover:bg-[#34354a] group-hover:text-[#fff]"
                  />
                  <h4 className="text-xl font-bold leading-none">
                    {exams.length}
                  </h4>
                  <p className="text-xs">Total Exams</p>
                </Card>
              </Link>
            </div>
            <CourseDisplay classname="basis-4/5" />
          </div>
        </div>
        <div className="flex flex-col gap-4 basis-2/5">
          <DueThisWeek />
          <UpcomingExams />
        </div>
      </section>
    </DashboardContainer>
  );
}
