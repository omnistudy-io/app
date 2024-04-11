import { useState } from "react";

export default function CoursesModal(props: CoursesModalProps) {
  const [courseNumber, setCourseNumber] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [professor, setProfessor] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  // Keep track of start date and datepicker visibility
  const [startDate, setStartDate] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);

  // Keep track of end date and datepicker visibility
  const [endDate, setEndDate] = useState(new Date());
  const [showEndDate, setShowEndDate] = useState(false);

  const [showScheduleDropdown, setShowScheduleDropdown] = useState(false);
  const [scheduleEvents, setScheduleEvents] = useState<Array<any>>([]);

  return <div>hello</div>;
}

// ---------- TYPE DEFINITIONS ---------- //

type CoursesModalProps = {
  show: boolean;
  setShow: (value: boolean) => void;
};
