import { ReactNode } from "react";
import { Card } from "../ui/Card";
import { motion } from "framer-motion";

import { CourseSchema } from "@/schema";
import formatDate from "@/utils/formatDate";

export default function CourseCard(props: CourseCardProps) {
  return (
    <motion.a whileHover={{ scale: 1.01 }} href="">
      <a href={`/courses/${props.course.id}`}>
        <Card className="w-full overflow-hidden">
          <div className="image-color h-40 bg-[#1f202f]"></div>
          <div className="text bg-[#f5f5f5] p-4">
            <span className="block text-md font-bold">
              {props.course.subject} {props.course.number}: {props.course.title}
            </span>
            <span className="block text-sm text-[#868686]">
              {props.course.professor}
            </span>
            <span className="block text-sm text-stone-400">
              {formatDate(props.course.start_date)} - {formatDate(props.course.end_date)}
            </span>
          </div>
        </Card>
      </a>
    </motion.a>
  );
}

// ---------- TYPE DEFINITIONS ---------- //

type CourseCardProps = {
  course: CourseSchema;
  key: ReactNode;
};
