import { Card } from "@/components/ui/Card";
import { DashboardContainer } from "@/components/ui/DashboardContainer";
import { Progress } from "@/components/ui/Progress";
import { useGet } from "@/hooks/useApi";
import formatDate from "@/utils/formatDate";
import { Calendar, NotebookPen, Star } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";

export default function Assignment() {
  const { id } = useParams();

  const { data } = useGet(`/assignments/${id}`);
  const actualPoints = data?.assignment.actual_points;
  const possiblePoints = data?.assignment.possible_points;
  const score = (actualPoints / possiblePoints) * 100;

  const handleOption1 = () => {
    console.log("Option 1");
  };

  const handleOption2 = () => {
    console.log("Option 2");
  };

  const dropDownOptions = [
    { label: "Option 1", onClick: handleOption1 },
    { label: "Option 2", onClick: handleOption2 },
  ];

  return (
    <DashboardContainer
      dropDown={true}
      callToAction="Options"
      callToActionText="Options"
      doropDownOptions={dropDownOptions}
      subHeader="CourseTitle"
      header={data?.assignment.title}
    >
      <section className="flex flex-col gap-4">
        <Card className="bg-[#f5f5f5] p-4">
          <h3 className="text-2xl mb-2">Assignment Score: {score}%</h3>
          <Progress value={score} />
        </Card>
        <div className="flex gap-4">
          <Card className="bg-[#f5f5f5] p-4 grid-cols-3 flex-1">
            <h3 className="text-2xl mb-2">Assignment Information</h3>
            <div className="flex flex-col gap-2">
              <div className="flex gap-1">
                <h4 className="font-bold flex items-center gap-2">
                  <Calendar size={20} strokeWidth={2.5} /> Due:
                </h4>
                <p>{formatDate(data?.assignment.due_at)}</p>
              </div>
              <div className="flex gap-1">
                <h4 className="font-bold flex items-center gap-2">
                  <NotebookPen size={20} strokeWidth={2.5} /> Description:
                </h4>
                <p>{data?.assignment.description}</p>
              </div>
              <div className="flex gap-1">
                <h4 className="font-bold flex items-center gap-2">
                  <Star size={20} strokeWidth={2.5} /> Possible Points:
                </h4>
                <p>{data?.assignment.possible_points}</p>
              </div>
            </div>
          </Card>
          <Card className="bg-[#f5f5f5] p-4 flex-1">
            <h3 className="text-2xl mb-2">Documents</h3>
          </Card>
        </div>
        <Card className="flex flex-col bg-[#f5f5f5] p-4">
          <h3 className="text-2xl mb-2">Helpful Videos:</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#34354a] p-4 h-[200px] rounded-lg"></div>
            <div className="bg-[#34354a] p-4 h-[200px] rounded-lg"></div>
            <div className="bg-[#34354a] p-4 h-[200px] rounded-lg"></div>
          </div>
        </Card>
      </section>
    </DashboardContainer>
  );
}
