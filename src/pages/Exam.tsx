// Component imports
import { DashboardContainer } from "@/components/ui/DashboardContainer";
import NotFound from "./NotFound";
import ConfirmModal from "@/components/modals/ConfirmModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

// Hook, util, and schema imports
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/useToast";
import get from "@/utils/get";
import del from "@/utils/del";
import AuthContext from "@/context/AuthContext";
import {
  CourseSchema,
  DocumentSchema,
  ExamSchema,
  UserStudySetSchema,
} from "@/schema";
import { Card } from "@/components/ui/Card";

// Icon imports
import { Calendar, Clock, NotebookPen, Star, Weight } from "lucide-react";
import formatDate from "@/utils/formatDate";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

export default function Exam() {
  // Hooks
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { toast } = useToast();
  const navigate = useNavigate();

  // State management
  const [exam, setExam] = useState<(ExamSchema & CourseSnapshot) | null>(null);
  const [documents, setDocuments] = useState<DocumentSchema[] | null>(null);
  const [sets, setSets] = useState<UserStudySetSchema[]>([]);
  const [filterSets, setFilterSets] = useState<UserStudySetSchema[]>([]);
  const [course, setCourse] = useState<CourseSchema | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

  // Calculate score from assignment
  const actualPoints = exam?.actual_points;
  const possiblePoints = exam?.possible_points;
  const score =
    actualPoints && possiblePoints ? (actualPoints / possiblePoints) * 100 : 0;

  // Get initial data
  useEffect(() => {
    get(
      (data: ExamSchema & CourseSnapshot) => {
        setExam(data);
        if (data) get(setCourse, "course", `/courses/${data.course_id}`);

        get(setDocuments, "docs", `/exams/${id}/documents`);
      },
      "exam",
      `/exams/${id}`
    );

    get(setSets, "studySets", "/users/{uid}/study-sets");
    get(setFilterSets, "studySets", "/users/{uid}/study-sets");
  }, []);

  // If the exam does not exist, return a 404 page
  if (!exam) {
    return <NotFound />;
  }

  // If user does not own exam, return a 404 page
  if (course?.user_id != user?.id) {
    return <NotFound />;
  }

  // TODO: Implement edit exam functionality
  async function handleEdit() {}

  // TODO: Implement delete exam functionality
  async function handleDelete() {
    del((data: any) => {
      // If the request was not successful, show an error toast
      if (data.code !== 200) {
        toast({
          title: "Failed to delete exam",
          description:
            "An error occured while deleting the exam, please try again later.",
        });
      }
      // If the request was successful, show a success toast and navigate to the courses page
      else {
        toast({
          title: "Success",
          description: `Exam ${exam?.title} deleted successfully.`,
        });
        navigate("/exams");
      }
    }, `/exams/${id}`);
  }

  /**
   * Dropdown options for the exam
   */
  const options = [
    { label: "Edit Exam", onClick: handleEdit },
    {
      label: "Delete Exam",
      onClick: () => {
        setShowConfirmDelete(true);
      },
      isDelete: true,
    },
  ];

  return (
    <DashboardContainer
      subHeader={`${exam?.courseSubject} ${exam?.courseNumber}: ${exam?.courseTitle}`}
      header={`${exam?.title} Exam`}
      callToAction="Options"
      callToActionText="Options"
      dropdown={true}
      dropdownOptions={options}
    >
      {/* Confirm Delete Modal */}
      <ConfirmModal
        title="Delete Exam"
        message={`Are you sure you want to delete this ${exam?.title} exam?`}
        show={showConfirmDelete}
        setShow={setShowConfirmDelete}
        confirmText="Delete"
        confirmCallback={handleDelete}
      />

      <section>
        <div className="flex gap-4 w-full">
          <Card className="bg-[#f5f5f5] p-4 basis-3/5 flex justify-between">
            <div>
              <h3 className="text-2xl mb-2">Exam Details</h3>
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  <h4 className="font-bold flex items-center gap-2">
                    <Calendar size={20} strokeWidth={2} /> Date:
                  </h4>
                  <p>{formatDate(exam ? exam.date : "")}</p>
                </div>
                <div className="flex gap-1">
                  <h4 className="font-bold flex items-center gap-2">
                    <Clock size={20} strokeWidth={2} /> Time:
                  </h4>
                  {/* Need to use the exam start and end time */}
                  <p>1hr</p>
                </div>
                <div className="flex gap-1">
                  <h4 className="font-bold flex items-start gap-2">
                    <NotebookPen size={20} strokeWidth={2} /> Description:
                  </h4>
                  <p>{exam?.description}</p>
                </div>
                <div className="flex gap-1">
                  <h4 className="font-bold flex items-center gap-2">
                    <Star size={20} strokeWidth={2} /> Earned Points:
                  </h4>
                  <p>{exam?.actual_points}</p>
                </div>
                <div className="flex gap-1">
                  <h4 className="font-bold flex items-center gap-2">
                    <Star size={20} strokeWidth={2} /> Possible Points:
                  </h4>
                  <p>{exam?.possible_points}</p>
                </div>
                <div className="flex gap-1">
                  <h4 className="font-bold flex items-center gap-2">
                    <Weight size={20} strokeWidth={2} /> Weight:
                  </h4>
                  <p>{exam?.weight * 100}%</p>
                </div>
              </div>
            </div>
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
          <Card className="bg-[#f5f5f5] p-4 basis-2/5">
            <div>
              <h3 className="text-2xl mb-2">Documents</h3>
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
        <Card className="bg-[#f5f5f5] p-4 mt-4">
          <h3 className="text-2xl mb-2">Study Sets</h3>
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="">Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Questions</TableHead>
                  <TableHead className="text-right">Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sets &&
                  filterSets.map((set, i) => {
                    return (
                      <TableRow
                        className="cursor-pointer"
                        onClick={() =>
                          (window.location.href = `/study-sets/${set.id}`)
                        }
                      >
                        <TableCell>{set.title}</TableCell>
                        <TableCell>{set.description}</TableCell>
                        <TableCell>{set.num_questions}</TableCell>
                        <TableCell className="text-right">
                          {new Date(set.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </Card>
      </section>
    </DashboardContainer>
  );
}

// Type definitions
type CourseSnapshot = {
  courseNumber: string;
  courseSubject: string;
  courseTitle: string;
};
