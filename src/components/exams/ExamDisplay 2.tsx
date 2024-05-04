import { useGet } from "@/hooks/useApi";
import { toast } from "@/hooks/useToast";
import { ExamSchema } from "@/schema";
import formatDate from "@/utils/formatDate";
import { Check, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "../ui/Card";

export default function ExamDisplay(props: ExamDisplayProps) {
  const [examStatus, setExamStatus] = useState<any[]>([]);

  const endpoint = props.endpoint || "/users/{userId}/exams";

  const { data } = useGet(endpoint);

  // useEffect(() => {
  //   if (data) {
  //     setExamStatus(data.assignments.map(() => false));
  //   }
  // }, [data]);

  const handleExamStatus = (index: number) => {
    setExamStatus((prevStatus: any) => {
      const newStatus = [...prevStatus];
      newStatus[index] = !newStatus[index];
      return newStatus;
    });
  };
  return (
    <Card className={`${props.className} p-4 bg-[#f5f5f5] h-full`}>
      <div className="mb-4">
        <h3 className="text-2xl mb-2">Exams</h3>
        <div className="grid grid-cols-3 border-y border-[#34354a] text-sm">
          <span className="flex items-center">Name</span>
          <span className="flex items-center">Class</span>
          {/* <span className="py-2 pr-4">Status</span> */}
          <span className="flex items-center justify-end">Due Date</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 text-left">
        {data?.exams.map(
          (exam: ExamSchema & { courseTitle: string }, index: number) => (
            <div className="grid grid-cols-3 text-sm gap-x-2" key={index}>
              <div className="flex items-center">
                <span>{exam.title}</span>
              </div>
              <div className="flex items-center whitespace-nowrap overflow-hidden">
                <span>{exam.courseTitle}</span>
              </div>
              {/* <div className="flex items-center">
                <span
                  onClick={() => {
                    handleExamStatus(index);
                    toast({
                      title: `${exam.title}`,
                      description: !examStatus[index] ? "Done" : "In Progress",
                    });
                  }}
                  className={`py-1 px-3 rounded cursor-pointer hover:shadow whitespace-nowrap overflow-hidden ${
                    examStatus[index] ? "bg-[#00adb520]" : "bg-[#86868620]"
                  }`}
                >
                  {examStatus[index] ? (
                    <div className="flex items-center gap-x-2">
                      <Check
                        strokeWidth={3}
                        className="w-[20px] h-[20px] border-[1.9px] border-[#00adb5] p-[.125rem] rounded-full text-[#00adb5]"
                      />
                      Done
                    </div>
                  ) : (
                    <div className="flex items-center gap-x-2">
                      <Clock className="h-[20px] w-[20px]" /> In Progress
                    </div>
                  )}
                </span>
              </div> */}
              <div className="flex items-center justify-end">
                <span>{formatDate(exam.date)}</span>
              </div>
            </div>
          )
        )}
      </div>
    </Card>
  );
}

// ---------- TYPE DEFINITIONS ---------- //

type ExamDisplayProps = {
  className?: string;
  endpoint?: string;
};
