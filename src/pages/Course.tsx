import AssignmentDisplay from "@/components/assignment/AssignmentDisplay";
import ExamDisplay from "@/components/exams/ExamDisplay";
import { Card } from "@/components/ui/Card";
import { DashboardContainer } from "@/components/ui/DashboardContainer";
import { Progress } from "@/components/ui/Progress";
import NotFound from "./NotFound";
import ConfirmModal from "@/components/modals/ConfirmModal";

// Hooks, util, and schema imports
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/useToast";
import get from "@/utils/get";
import del from "@/utils/del";
import { CourseEventSchema, CourseSchema } from "@/schema";
import AuthContext from "@/context/AuthContext";
import getTimeFromDate from "@/utils/getTimeFromDate";

// Icon imports
import { FlaskConical, Laptop } from "lucide-react";


export default function Course() {

  // Hooks
  const { toast } = useToast();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // State management
  const [course, setCourse] = useState<CourseSchema | null>(null);
  const [events, setEvents] = useState<CourseEventSchema[] | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

  // Get initial data
  useEffect(() => {
    get((data: CourseSchema) => {
      setCourse(data);
      get(setEvents, "course_events", `/courses/${id}/events`);
    }, "course", `/courses/${id}`);
  }, []);

  const day = new Date().toLocaleDateString();
  const time = new Date().getTime();
  const endDate = new Date(course ? course.end_date : "").getTime();

  // If course does not exist or user is not the owner of the course, return a 404 page
  if(course?.user_id != user?.id) {
    return(
      <NotFound />
    )
  }

  // TODO: Implement edit course functionality
  async function handleEdit() {

  }

  /**
   * Delete the course. Show a toast reflecting the success or error of the request.
   */
  async function handleDelete() {
    del((data: any) => { 
      // If the request was not successful, show an error toast
      if(data.code !== 200) {
        toast({ title: "Failed to delete course", description: "An error occured while deleting the course, please try again later." });
      }
      // If the request was successful, show a success toast and navigate to the courses page
      else {
        toast({ title: "Success", description: `Course ${course?.subject} ${course?.number}: ${course?.title} deleted successfully.` });
        navigate("/courses");
      }
    }, `/courses/${id}`); 
  }

  /**
   * Dropdown options for the course
   */
  const dropdownOptions = [
    { label: "Edit Course", onClick: handleEdit },
    { label: "Delete Course", onClick: () => { setShowConfirmDelete(true) }, isDelete: true }
  ]

  return (
    <DashboardContainer
      dropdown={true}
      dropdownOptions={dropdownOptions}
      callToAction="Options"
      callToActionText="Options"
      subHeader={`${course?.subject} ${course?.number}: ${course?.title}`}
      header={`${course?.title} Course`}
    >

      {/* Delete Confirm Modal */}
      <ConfirmModal
        show={showConfirmDelete}
        setShow={setShowConfirmDelete}
        title="Delete Course"
        message="Are you sure you want to delete this course?"
        confirmText="Delete"
        confirmCallback={handleDelete}
      />

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
            <h3 className="text-2xl mb-2">Upcoming Events</h3>
            <div className="flex flex-col gap-2">
              {events && events.slice(0, 3).map((event: CourseEventSchema, i) => {
                return <div key={`course_event_${i}`}>
                  <div className="bg-[#fff] p-4 border rounded-md">
                    <h4 className="font-bold flex gap-2 items-center">
                      <Laptop size={20} strokeWidth={2.5} /> {event.title}{" "}
                      <span className="text-sm font-normal">(1hr)</span>
                    </h4>
                    <div>
                      <span>
                        {getTimeFromDate(event.start_time)} - {getTimeFromDate(event.end_time)} &#x2022; {course?.building} -{" "}
                        {course?.room}
                      </span>
                    </div>
                  </div>
                </div>
              })}
              {events && events.length === 0 && (
                <p className="text-left text-sm text-gray-500 mt-1">
                  No upcoming events scheduled.
                </p>
              )}
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
