import { ReactNode } from "react";
import { Card } from "../ui/Card";
import { motion } from "framer-motion";

export default function CourseCard(props: CourseCardProps) {
  return (
    <motion.a whileHover={{ scale: 1.01 }} href="">
      <Card className="w-full overflow-hidden">
        <div className="image-color h-40 bg-[#1f202f]"></div>
        <div className="text bg-[#f5f5f5] p-4">
          <span className="block text-md font-bold">
            {props.course.courseNumber}: {props.course.name}
          </span>
          <span className="block text-sm text-[#868686]">
            {props.course.professor}
          </span>
          <span className="block text-sm text-[#868686]">
            {props.course.startDate} - {props.course.endDate}
          </span>
        </div>
      </Card>
    </motion.a>
  );
}

// ---------- TYPE DEFINITIONS ---------- //

type CourseCardProps = {
  course: Course;
  key: ReactNode;
};

type Course = {
  name: string;
  courseNumber: number;
  professor: string;
  startDate: string;
  endDate: string;
};
