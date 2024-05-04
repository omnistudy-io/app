import AssignmentDisplay from "@/components/assignment/AssignmentDisplay";
import ExamDisplay from "@/components/exams/ExamDisplay";
import { Card } from "@/components/ui/Card";
import { DashboardContainer } from "@/components/ui/DashboardContainer";
import { Progress } from "@/components/ui/Progress";
import { useGet } from "@/hooks/useApi";
import { FlaskConical, Laptop } from "lucide-react";
import { useParams } from "react-router-dom";
// import { GraduationCap as CoursesIcon } from "lucide-react";

import { useState, useEffect } from "react";
import get from "@/utils/get";
import { CourseSchema } from "@/schema";

export default function Course() {
  const { id } = useParams();

  const [course, setCourse] = useState<CourseSchema | null>(null);

  useEffect(() => {
    get(setCourse, "course", `/courses/${id}`);
  });

  const day = new Date().toLocaleDateString();
  const time = new Date().getTime();
  const endDate = new Date(course ? course.end_date : "").getTime();

  return (
    <DashboardContainer
      dropDown={false}
      subHeader={`${course?.subject} ${course?.number}:`}
      header={course?.title}
    >
      <section className="flex flex-col gap-4">
        <Card className="bg-[#f5f5f5] p-4">
          <h3 className="text-2xl mb-2">
            Course Progress -{" "}
            {Math.min(Math.round((time / endDate) * 100), 100)}%
          </h3>
          <Progress value={Math.min((time / endDate) * 100, 100)} />
        </Card>
        <div className="flex gap-4">
          <AssignmentDisplay
            endpoint={`/courses/${id}/assignments`}
            className="basis-3/5"
          />
          <ExamDisplay
            endpoint={`/courses/${id}/exams`}
            className="basis-2/5"
          />
        </div>
        <div className="flex gap-4">
          <Card className="bg-[#f5f5f5] p-4 basis-3/5">
            <h3 className="text-2xl mb-2">Next Scheduled Events - {day}</h3>
            <div className="flex flex-col gap-2">
              <div className="bg-[#fff] p-4 border rounded-md">
                <h4 className="font-bold flex gap-2 items-center">
                  <Laptop size={20} strokeWidth={2.5} /> Class{" "}
                  <span className="text-sm font-normal">(1hr)</span>
                </h4>
                <div>
                  <span>
                    10:00 AM - 11:00 AM &#x2022; {course?.building} -{" "}
                    {course?.room}
                  </span>
                </div>
              </div>
              <div className="bg-[#fff] p-4 border rounded-md">
                <h4 className="font-bold flex gap-2 items-center">
                  <FlaskConical size={20} strokeWidth={2.5} /> Lab{" "}
                  <span className="text-sm font-normal">(3hr)</span>
                </h4>
                <div>
                  <span>
                    1:00 PM - 4:00 PM &#x2022; {course?.building} -{" "}
                    {course?.room}
                  </span>
                </div>
              </div>
            </div>
          </Card>
          <Card className="bg-[#f5f5f5] p-4 basis-2/5 flex flex-col justify-between">
            <h3 className="text-2xl mb-2">Course Information</h3>
            <div className="flex flex-col gap-2">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Dolorum enim eveniet laboriosam adipisci quo fugiat soluta,
                dolorem minima! Quas magnam esse tenetur natus dolore molestias
                eum veritatis aspernatur. Officiis, quos.
              </p>
              <div className="flex gap-2">
                <img
                  src={course?.thumbnail_url}
                  alt="Course thumbnail"
                  loading="lazy"
                  className="h-[50px] object-cover rounded-full"
                  width="50px"
                />
                <div className="flex flex-col justify-center">
                  <span className="text-sm">{course?.professor}</span>
                  <span className="text-xs">
                    {course?.building} - {course?.room}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </DashboardContainer>
  );
}
