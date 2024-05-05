import { Card } from "@/components/ui/Card";
import { DashboardContainer } from "@/components/ui/DashboardContainer";
import { Progress } from "@/components/ui/Progress";
import { useGet } from "@/hooks/useApi";
import formatDate from "@/utils/formatDate";
import { Calendar, NotebookPen, Star } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import get from "@/utils/get";
import post from "@/utils/post";
import put from "@/utils/put";

import { AssignmentSchema } from "@/schema";
import { Skeleton } from "@/components/ui/Skeleton"
import { Slider } from "@/components/ui/Slider"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Assignment() {
  const { id } = useParams();

  const [assignment, setAssignment] = useState<AssignmentSchema & CourseSnapshot | null>(null);
  const [videos, setVideos] = useState<any | null>(null);
  const [progress, setProgress] = useState<number[]>([0]);

  const actualPoints = assignment?.actual_points;
  const possiblePoints = assignment?.possible_points;
  const score = (actualPoints && possiblePoints) ? (actualPoints / possiblePoints) * 100 : 0; 

  useEffect(() => {
    get((data: AssignmentSchema & CourseSnapshot) => {
      setAssignment(data);
      post(setVideos, "/ai/videos", { description: data.description, assignmentId: id });
      setProgress([data.progress]);
    }, "assignment", `/assignments/${id}`);
  }, []);

  const handleOption1 = () => {
    console.log("Option 1");
  };

  const handleOption2 = () => {
    console.log("Option 2");
  };

  function displayProgressChange(newProgress: number[]) {
    setProgress(newProgress); 
  }

  function putProgressChange(newProgress: number[]) {
    setProgress(newProgress);
    put(() => {}, `/assignments/${id}`, { progress: newProgress[0] });
  }

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
      subHeader={`${assignment?.courseSubject} ${assignment?.courseNumber}: ${assignment?.courseTitle}`}
      header={assignment?.title}
    >
      <section className="flex flex-col gap-4">
        <Card className="bg-[#f5f5f5] p-5 flex flex-col gap-y-4">
          <h3 className="text-2xl mb-2">Assignment Progress: {progress[0]}%</h3>
          <Slider step={5} max={100} value={progress} onValueChange={displayProgressChange} onValueCommit={putProgressChange} />
        </Card>
        <div className="flex gap-4">
          <Card className="bg-[#f5f5f5] p-4 flex flex-row gap-x-12">
            {/* Assignment information */}
            <div>
              <h3 className="text-2xl mb-2">Assignment Information</h3>
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  <h4 className="font-bold flex items-center gap-2">
                    <Calendar size={20} strokeWidth={2.5} /> Due:
                  </h4>
                  <p>{formatDate(assignment ? assignment.due_at : "")}</p>
                </div>
                <div className="flex gap-1">
                  <h4 className="font-bold flex items-start gap-2">
                    <NotebookPen size={20} strokeWidth={2.5} /> Description:
                  </h4>
                  <p>{assignment?.description}</p>
                </div>
                <div className="flex gap-1">
                  <h4 className="font-bold flex items-center gap-2">
                    <Star size={20} strokeWidth={2.5} /> Earned Points:
                  </h4>
                  <p>{assignment?.actual_points}</p>
                </div>
                <div className="flex gap-1">
                  <h4 className="font-bold flex items-center gap-2">
                    <Star size={20} strokeWidth={2.5} /> Possible Points:
                  </h4>
                  <p>{assignment?.possible_points}</p>
                </div>
              </div>
            </div>
            {/* Assignment Score */}
            <div className="w-[120px] flex flex-col items-center justify-center gap-y-2">
              <CircularProgressbar value={score} text={`${score}%`} />
              <h3 className="text-xl">Score</h3>
            </div>
          </Card>
          <Card className="bg-[#f5f5f5] p-4 flex-1">
            <h3 className="text-2xl mb-2">Documents</h3>
          </Card>
        </div>
        <Card className="flex flex-col bg-[#f5f5f5] p-4">
          <h3 className="text-2xl mb-2">Helpful Videos</h3>
          <div className="flex flex-row gap-x-6">
            {videos != null ? videos.videos.map((video: any, index: number) => {
              return <iframe 
                src={`https://youtube.com/embed/${video.id}`}
                className="w-[500px] h-[200px] rounded-lg"
                allowFullScreen={true}
              />
            }) : 
              <>
                <Skeleton className="w-[500px] h-[200px] rounded-lg" />
                <Skeleton className="w-[500px] h-[200px] rounded-lg" />
                <Skeleton className="w-[500px] h-[200px] rounded-lg" />
              </>
            }
          </div>
        </Card>
      </section>
    </DashboardContainer>
  );
}

// Type Definitions
type CourseSnapshot = {
  courseSubject: string;
  courseNumber: string;
  courseTitle: string;
}