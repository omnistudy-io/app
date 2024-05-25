import { CourseSchema } from "@/schema";
import get from "@/utils/get";
import { CornerRightUp } from "lucide-react";
import { type } from "os";
import React, { useEffect, useState } from "react";
import { Card } from "../ui/Card";

export default function CourseDisplay(props: CourseDisplayProps) {
  const [courses, setCourses] = useState<CourseSchema[]>([]);

  useEffect(() => {
    get(setCourses, "courses", "/users/{uid}/courses");
  }, []);

  return (
    <Card
      className={`bg-[#f5f5f5] p-4 flex flex-col justify-between ${props.classname}`}
    >
      <h3 className="text-2xl mb-2">Your Courses</h3>
      <div className="grid grid-cols-2 gap-2">
        {courses.map((course: CourseSchema, i: number) => (
          <div
            key={i}
            className="p-4 flex gap-2 items-end bg-white rounded-lg border relative group cursor-pointer hover:bg-[#34354a] transition-all duration-300"
          >
            <img
              src={course?.thumbnail_url}
              alt="Course thumbnail"
              loading="lazy"
              className="h-[50px] object-cover rounded-md"
              width="50px"
            />
            <div className="flex flex-col">
              <p className="text-sm group-hover:text-[#fff]">
                {course.subject} {course.number}
              </p>
              <span className="text-xs text-[#868686] group-hover:text-[#ccc]">
                {course.building} - {course.room}
              </span>
            </div>
            <CornerRightUp
              size={16}
              className="absolute top-2 right-2 group-hover:text-[#fff] group-hover:animate-bounce"
            />
          </div>
        ))}
      </div>
    </Card>
  );
}

type CourseDisplayProps = {
  classname?: string;
};
