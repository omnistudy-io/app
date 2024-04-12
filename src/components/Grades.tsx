import { ReactNode } from "react";
import { Card } from "./ui/Card";

const grades = [
  {
    name: "Object Oriented",
    courseNumber: 240,
    professor: "Scott Yilek",
    grade: "A",
    percent: "95.25",
  },
  {
    name: "Object Oriented",
    courseNumber: 240,
    professor: "Scott Yilek",
    grade: "A",
    percent: "95.25",
  },
  {
    name: "Object Oriented",
    courseNumber: 240,
    professor: "Scott Yilek",
    grade: "A",
    percent: "95.25",
  },
  {
    name: "Object Oriented",
    courseNumber: 240,
    professor: "Scott Yilek",
    grade: "A",
    percent: "95.25",
  },
];

export default function Grades() {
  return (
    <Card className="basis-2/5 h-full bg-[#f5f5f5] p-4 flex flex-col gap-4">
      <h3 className="text-2xl pb-2 border-b border-[#34354a]">
        <a href="">Grades</a>
      </h3>
      <div className="flex flex-col gap-4">
        {grades.map((grade, index) => (
          <div key={index} className="flex justify-between gap-1">
            <div className="flex items-end gap-1">
              <div className="h-10 w-10 bg-[#1f202f] rounded-lg"></div>
              <div className="text-sm">
                <span className="block">{grade.name}</span>
                <span>{grade.professor}</span>
              </div>
            </div>
            <div className=" flex flex-col items-end">
              <span className="block">{grade.grade}</span>
              <span className="text-sm text-[#00adb5]">{grade.percent}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ---------- TYPE DEFINITIONS ---------- //
