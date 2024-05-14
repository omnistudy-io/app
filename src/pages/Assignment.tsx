// Component imports
import { Card } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/Table";
import { DashboardContainer } from "@/components/ui/DashboardContainer";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/Skeleton"
import { Slider } from "@/components/ui/Slider"
import ConfirmModal from "@/components/modals/ConfirmModal";
import NotFound from "./NotFound";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Hooks, utils, and schema imports
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import get from "@/utils/get";
import post from "@/utils/post";
import put from "@/utils/put";
import del from "@/utils/del";
import formatDate from "@/utils/formatDate";
import { useToast } from "@/hooks/useToast";
import { AssignmentSchema, ChatSchema, CourseSchema, DocumentSchema } from "@/schema";
import AuthContext from "@/context/AuthContext";

// Icon imports
import { Calendar, NotebookPen, Star, Weight } from "lucide-react";

export default function Assignment() {
  // Hooks
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { toast } = useToast();
  const navigate = useNavigate();

  // State management
  const [assignment, setAssignment] = useState<
    (AssignmentSchema & CourseSnapshot) | null
  >(null);
  const [course, setCourse] = useState<CourseSchema | null>(null);
  const [chats, setChats] = useState<ChatSchema[]>([])
  const [documents, setDocuments] = useState<DocumentSchema[] | null>(null);
  const [videos, setVideos] = useState<any | null>(null);
  const [progress, setProgress] = useState<number[]>([0]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  // Calculate score from assignment
  const actualPoints = assignment?.actual_points;
  const possiblePoints = assignment?.possible_points;
  const score =
    actualPoints && possiblePoints ? (actualPoints / possiblePoints) * 100 : 0;

  // Get initial data
  useEffect(() => {
    get(
      (data: AssignmentSchema & CourseSnapshot) => {
        setAssignment(data);
        if (data) {
          post(setVideos, "/ai/videos", {
            description: data.description,
            assignmentId: id,
          });
          setProgress([data.progress]);
          get(setCourse, "course", `/courses/${data.course_id}`);
        }

      // Get documents
      get(setDocuments, "docs", `/assignments/${id}/documents`);
      // Get chats
      get(setChats, "chats", `/assignments/${id}/chats`);
    }, "assignment", `/assignments/${id}`);
  }, []);

  // If the assignment does not exist, return a 404 page
  if (!assignment) {
    return <NotFound />;
  }

  // If user does not own assignment, return a 404 page
  if (course?.user_id != user?.id) {
    return <NotFound />;
  }

  // TODO: Implement edit assignment functionality
  function editHandler() {}

  /**
   * Delete the assignment. Show a toast reflecting the success or error of the request.
   */
  function deleteHandler() {
    del((data: any) => {
      // If the request was not successful, show an error toast
      if (data.code !== 200) {
        toast({
          title: "Failed to delete assignmet",
          description:
            "An error occured while deleting the assignment, please try again later.",
        });
      }
      // If the request was successful, show a success toast and navigate to the courses page
      else {
        toast({
          title: "Success",
          description: `Assignment ${assignment?.title} deleted successfully.`,
        });
        navigate("/assignments");
      }
    }, `/assignments/${id}`);
  }

  // TODO: Implement question generator functionality
  function questionGeneratorHandler() {
    console.log("Option 3");
  }

  /**
   * Update the current progress value of the assignment in the UI
   * @param newProgress The new progress value
   */
  function displayProgressChange(newProgress: number[]) {
    setProgress(newProgress);
  }

  /**
   * Update the current progress value of the assignment in the database
   * @param newProgress The new progress value
   */
  function putProgressChange(newProgress: number[]) {
    setProgress(newProgress);
    put(() => {}, `/assignments/${id}`, { progress: newProgress[0] });
  }

  /**
   * Dropwdown options for the assignment
   */
  const dropDownOptions = [
    { label: "Question Generator", onClick: questionGeneratorHandler },
    { label: "Edit Assignment", onClick: editHandler },
    { label: "Delete Assignment", onClick: () => { setShowDeleteConfirm(true); }, isDelete: true, },
  ];

  return (
    <DashboardContainer
      dropdown={true}
      dropdownOptions={dropDownOptions}
      callToAction="Options"
      callToActionText="Options"
      subHeader={`${assignment?.courseSubject} ${assignment?.courseNumber}: ${assignment?.courseTitle}`}
      header={assignment?.title}
    >
      {/* Delete confirm modal */}
      <ConfirmModal
        show={showDeleteConfirm}
        setShow={setShowDeleteConfirm}
        title="Delete Assignment"
        message={`Are you sure you want to delete assignment ${assignment?.title}?`}
        confirmText="Delete"
        confirmCallback={deleteHandler}
      />

      <section className="flex flex-col gap-4">
        <Card className="bg-[#f5f5f5] p-5 flex flex-col gap-y-4">
          <h3 className="text-2xl mb-2">Assignment Progress: {progress[0]}%</h3>
          <Slider
            step={1}
            max={100}
            value={progress}
            onValueChange={displayProgressChange}
            onValueCommit={putProgressChange}
          />
        </Card>
        <div className="flex gap-4 w-full">
          <Card className="bg-[#f5f5f5] p-4 flex justify-between basis-3/5">
            {/* Assignment information */}
            <div>
              <h3 className="text-2xl mb-2">Assignment Information</h3>
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  <h4 className="font-bold flex items-center gap-2">
                    <Calendar size={20} strokeWidth={2} /> Due:
                  </h4>
                  <p>{formatDate(assignment ? assignment.due_at : "")}</p>
                </div>
                <div className="flex gap-1">
                  <h4 className="font-bold flex items-start gap-2">
                    <NotebookPen size={20} strokeWidth={2} /> Description:
                  </h4>
                  <p>{assignment?.description}</p>
                </div>
                <div className="flex gap-1">
                  <h4 className="font-bold flex items-center gap-2">
                    <Star size={20} strokeWidth={2} /> Earned Points:
                  </h4>
                  <p>{assignment?.actual_points}</p>
                </div>
                <div className="flex gap-1">
                  <h4 className="font-bold flex items-center gap-2">
                    <Star size={20} strokeWidth={2} /> Possible Points:
                  </h4>
                  <p>{assignment?.possible_points}</p>
                </div>
                <div className="flex gap-1">
                  <h4 className="font-bold flex items-center gap-2">
                    <Weight size={20} strokeWidth={2} /> Weight:
                  </h4>
                  <p>{assignment?.weight * 100}%</p>
                </div>
              </div>
            </div>
            {/* Assignment Score */}
            <div className="w-[120px] flex flex-col items-center justify-center gap-y-2">
              <CircularProgressbar
                value={score}
                text={`${score}%`}
                styles={buildStyles({
                  textColor: "#000",
                  pathColor: "#00adb5",
                })}
              />
              <h3 className="text-xl">Score</h3>
            </div>
          </Card>

          {/* Chats table */}
          <Card className="bg-[#f5f5f5] p-4 w-full max-w-[40%]">
            <div>
              <Link className="text-2xl" to={`/assignments/${id}/chats`}>Chats</Link>
            </div>
            <div className="w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Created At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Chats found, render them */}
                  {chats && chats.map((chat: ChatSchema) => {
                    return <TableRow className="cursor-pointer hover:bg-stone-200 transition-all duration-200" onClick={() => navigate(`/assignments/${id}/chats/${chat.id}`)}>
                      <TableCell>{chat.title}</TableCell>
                      <TableCell className="text-right">{formatDate(chat.created_at)}</TableCell>
                    </TableRow>
                  })}
                  {/* No chats found, render text */}
                  {chats == null && <TableRow><TableCell>No chats</TableCell></TableRow>}
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* Documents table */}
          <Card className="bg-[#f5f5f5] p-4 w-full max-w-[40%]">
            <div>
              <h3 className="text-2xl">Documents</h3>
            </div>
            <div className="w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Link</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Documents found */}
                  {documents &&
                    documents.map((document: DocumentSchema, index: number) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>{document.title}</TableCell>
                          <TableCell className="text-right">
                            <a
                              className="text-[#00adb5] hover:underline"
                              href={document.url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Link
                            </a>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {/* If there are no documents or are loading */}
                  {documents == null && (
                    <TableRow>
                      <TableCell>No documents</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
        <Card className="flex flex-col bg-[#f5f5f5] p-4">
          <h3 className="text-2xl mb-2">Helpful Videos</h3>
          <div className="flex flex-row gap-x-6">
            {videos != null ? (
              videos.videos.map((video: any, index: number) => {
                return (
                  <iframe
                    src={`https://youtube.com/embed/${video.id}`}
                    className="w-[500px] h-[200px] rounded-lg"
                    allowFullScreen={true}
                  />
                );
              })
            ) : (
              <>
                <Skeleton className="w-[500px] h-[200px] rounded-lg" />
                <Skeleton className="w-[500px] h-[200px] rounded-lg" />
                <Skeleton className="w-[500px] h-[200px] rounded-lg" />
              </>
            )}
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
};
