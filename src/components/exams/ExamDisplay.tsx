// Component imports
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/Table";
import { Link } from "react-router-dom";
import { Card } from "../ui/Card";

// Hook, util, and schema imports
import { useEffect, useState } from "react";
import get from "@/utils/get";
import formatDate from "@/utils/formatDate";
import { ExamSchema } from "@/schema";


/**
 * Exam display component
 * @param props Props to send
 * @returns JSX.Element
 */
export default function ExamDisplay(props: ExamDisplayProps) {

	// Endpoint for the API call
	const endpoint = props.endpoint || "/users/{uid}/exams";

	// State management
	const [exams, setExams] = useState<(ExamSchema & CourseSnapshot)[] | null>(null);

	// Get initial data
	useEffect(() => {
		get(setExams, "exams", endpoint);
	}, []);

	// Return JSX
	return (
		<Card className={`${props.className} p-4 bg-[#f5f5f5] h-full`}>
			<div>
				<h3 className="text-2xl">
					<Link to="/exams">Exams</Link>
				</h3>
			</div>

			<div className="py-2">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Course</TableHead>
							<TableHead className="text-right">Date</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{/* If assignments found */}
						{exams && exams.map((exam: ExamSchema & CourseSnapshot, i: number) => {
							const fullCourseName = `${exam.courseSubject} ${exam.courseNumber}: ${exam.courseTitle}`;
							const courseName = fullCourseName.length > 24 ? fullCourseName.slice(0, 24) + "..." : fullCourseName;
							return <TableRow>
								<TableCell className="hover:underline hover:text-[#00adb5] transition-all duration-150">
									{window.location.href.includes("courses") ? <a href={`/exams/${exam.id}`}>{exam.title}</a> : <Link to={`/exams/${exam.id}`}>{exam.title}</Link>}
								</TableCell>
								<TableCell className="hover:underline hover:text-[#00adb5] transition-all duration-150">
									<Link to={`/courses/${exam.course_id}`}>{courseName}</Link>
								</TableCell>
								<TableCell className="text-right">{formatDate(exam.date)}</TableCell>
							</TableRow>
						})}
						{/* No assignments found */}
						{!exams && <TableRow>
							<TableCell>No exams</TableCell>
						</TableRow>}
					</TableBody>
				</Table>
			</div>
		</Card>
	);
}

// ---------- TYPE DEFINITIONS ---------- //
type ExamDisplayProps = {
	className?: string;
	endpoint?: string;
};

type CourseSnapshot = {
	courseSubject: string;
	courseNumber: string;
	courseTitle: string;
}
