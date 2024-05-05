// Component imports
import { DashboardContainer } from "@/components/ui/DashboardContainer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/Table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/Select";
import SearchBar from "@/components/filter/SearchBar";
import LoadModal from "@/components/modals/LoadModal";
import ConfirmModal from "@/components/modals/ConfirmModal";

// Hook, utils, and schema import
import { AssignmentSchema, CourseSchema, DocumentSchema, ExamSchema } from "@/schema";
import { useState, useEffect, useRef } from "react";
import get from "@/utils/get";
import post from "@/utils/post";
import put from "@/utils/put";
import del from "@/utils/del";

// Icon imports
import { FileText as DocumentsIcon } from "lucide-react";
import { FileWarningIcon } from "lucide-react";

/**
 * Documents page component
 * @returns JSX.Element
 */
export default function Documents() {

    // State management
    const [documents, setDocuments] = useState<DocumentSchema[] | null>(null);
    const [filterDocuments, setFilterDocuments] = useState<DocumentSchema[] | null>(null);
    const [showLoadModal, setShowLoadModal] = useState<boolean>(false);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [selectedDocuments, setSelectedDocuments] = useState<DocumentSchema[]>([]);

    // Subcomponent state management
    const [courses, setCourses] = useState<CourseSchema[] | null>(null);
    const [assignments, setAssignments] = useState<AssignmentSchema[] | null>(null);
    const [exams, setExams] = useState<ExamSchema[] | null>(null);


    // DOM Refs
    const fileUplaodRef = useRef<HTMLInputElement>(null);

    /**
     * Get initial document data on page load
     */
    useEffect(() => {
        // Initial state management
        get(setDocuments, "docs", "/users/1/documents");
        get(setFilterDocuments, "docs", "/users/1/documents");
        // Initial subcomponent state management
        get(setCourses, "courses", "/users/1/courses");
        get(setAssignments, "assignments", "/users/1/assignments");
        get(setExams, "exams", "/users/1/exams");
    }, []);

    /**
     * Handle a file upload, prepare form data and send req to API
     * 
     * @param e Event triggered when a file is uploaded
     * @returns 
     */
    function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        // Get the file
        const file = e.target.files?.[0];
        if (!file) return;

        // Create a new FormData
        const formData = new FormData();
        formData.append("document", file);
        formData.append("user_id", "1");

        // Post the file
        setShowLoadModal(true);
        post(() => {
            get(setDocuments, "docs", "/users/1/documents");
            get(setFilterDocuments, "docs", "/users/1/documents");
            setShowLoadModal(false);
        }, "/documents", formData);
    }

    /**
     * Open the file uploader when the CTA button is clicked
     */
    function openFileUploader() {
        fileUplaodRef.current?.click();
    }

    /**
     * Select or unselect all checkboxes
     * 
     * @param checked Whether the select all checkbox is checked
     */
    function toggleSelectAll(checked: boolean) {
        // If all checkboxes are checked, uncheck them
        const checkboxes = document.querySelectorAll("input[type='checkbox']");
        checkboxes.forEach((checkbox) => {
            (checkbox as HTMLInputElement).checked = checked;
        });
        
        if(checked)
            setSelectedDocuments(documents || []);
        else
            setSelectedDocuments([]);
    }

    /**
     * Toggle the selection of a single document
     * 
     * @param doc The document to select or unselect
     * @param checked Whether the document is checked or not
     */
    function toggleSelectDocument(doc: DocumentSchema, checked: boolean) {
        if(checked) {
            setSelectedDocuments([...selectedDocuments, doc]);
        } else {
            setSelectedDocuments(selectedDocuments.filter((d) => d.id !== doc.id));
        }
    }

    /**
     * Handle the deletion of selected documents
     */
    function handleDeleteDocuments() {
        if(selectedDocuments.length === 0) return;
        setShowConfirmModal(true);

        selectedDocuments.forEach((doc) => {
            del(() => {
                if(documents)
                    setDocuments(documents?.filter((d) => d.id !== doc.id));
                if(filterDocuments)
                    setFilterDocuments(filterDocuments?.filter((d) => d.id !== doc.id));
            }, `/documents/${doc.id}`, {});
        });
    }

    /**
     * CTA menu buttons
     */
    const menuOptions = [
        { label: "Upload New", onClick: openFileUploader },
        { label: "Delete", onClick: handleDeleteDocuments }
    ]

    // Return JSX
    return(
        <DashboardContainer
            subHeader={"Documents"}
            header="Documents"
            headerIcon={<DocumentsIcon />}
            callToAction={"Options"}
            callToActionText={"Options"}
            dropDown={true}
            doropDownOptions={menuOptions}
        >
            {/* Loading modal */}
            <LoadModal 
                show={showLoadModal} 
                message="Uploading document, please do not close this page."
            />
            {/* Delete documents modal */}
            <ConfirmModal
                show={showConfirmModal}
                setShow={setShowConfirmModal}
                title={"Delete Documents"}
                message={`Are you sure you want to delete the selected ${selectedDocuments.length > 1 ? selectedDocuments.length : ""} document${selectedDocuments.length > 1 ? "s" : ""}? This action cannot be undone.`}
                messageIcon={<FileWarningIcon size={50} className="text-red-500" />}
                confirmCallback={() => console.log("Delete")}
            />

            <div className="flex items-center gap-x-2">
                <SearchBar 
                    data={documents}
                    setData={setFilterDocuments}
                    fields={["title"]}
                />
            </div>

            {/* File upload input hidden (opened from CTA button) */}
            <input type="file" className="hidden" ref={fileUplaodRef} accept=".pdf" onChange={handleFileUpload} />

            {/* Study sets table */}
            <div className="py-4">
                <Table>
                    {/* Header cols */}
                    <TableHeader>
                        <TableRow className="text-[16px]">
                            <TableHead className="w-4">
                                <input type="checkbox" name="" id="" onChange={(e) => toggleSelectAll(e.target.checked)} />
                            </TableHead>
                            <TableHead>Document Name</TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead>Assignment</TableHead>
                            <TableHead>Exam</TableHead>
                            <TableHead className="text-right">Link</TableHead>
                        </TableRow>
                    </TableHeader>
                    {/* Table body */}
                    <TableBody>
                        {filterDocuments && filterDocuments.map((doc, i) => {
                            return <DocumentTableRow 
                                key={i} 
                                doc={doc} 
                                toggleSelection={toggleSelectDocument}
                                courses={courses || []}
                                assignments={assignments || []}
                                exams={exams || []}
                            />
                        })}
                    </TableBody>
                </Table>
            </div>
        </DashboardContainer>
    );
}


/**
 * A row in the documents table with functionality
 * 
 * @param props DocumentTableRowProps
 * @returns JSX.Element
 */
export function DocumentTableRow(props: DocumentTableRowProps) {
    
    // State management
    const courses = props.courses;
    const [assignments, setAssignments] = useState<AssignmentSchema[]>([]);
    const [exams, setExams] = useState<ExamSchema[]>([]);
    const [course, setCourse] = useState<CourseSchema | null>(null);
    const [assignment, setAssignment] = useState<AssignmentSchema | null>(null);
    const [exam, setExam] = useState<ExamSchema | null>(null);

    // Get initial data
    useEffect(() => {
        if(props.doc.course_id)
            get((data: CourseSchema) => {
                setCourse(data);
                updateCourse(`${data.id}`);
            }, "course", `/courses/${props.doc.course_id}`);
        if(props.doc.assignment_id)
            get(setAssignment, "assignment", `/assignments/${props.doc.assignment_id}`);
        if(props.doc.exam_id)
            get(setExam, "exam", `/exams/${props.doc.exam_id}`);
    }, []);

    /**
     * Update a document's assigned course. Reset assignment and exam if they
     * do not belong to this course. Then filter the assignments and exams
     * to only the newly selected course.
     * 
     * @param newCourseId The newly assigned course ID
     */
    function updateCourse(newCourseId: string) {
        // Update course if exists
        const course = courses.find((c) => `${c.id}`=== newCourseId);
        setCourse(course || null);
        
        // If the assignment is not for the selected course, reset the assignment
        if(assignment && assignment.course_id !== course?.id)
            setAssignment(null);
        // Filter assignments for the selected course
        setAssignments(props.assignments.filter((a) => a.course_id === course?.id));

        // If the exam is not for the selected course, reset the exam
        if(exam && exam.course_id !== course?.id)
            setExam(null);
        // Filter exams for the selected course
        setExams(props.exams.filter((e) => e.course_id === course?.id));

        // Update the database
        put(() => {}, `/documents/${props.doc.id}`, { course_id: newCourseId !== "None" ? parseInt(newCourseId) : "null" });
    }

    /**
     * Update a document's assigned assignment
     * 
     * @param newAssignmentId The newly assigned assignment ID
     */
    function updateAssignment(newAssignmentId: string) {
        // Update assignment if exists
        const assignment = assignments.find((a) => `${a.id}` === newAssignmentId);
        setAssignment(assignment || null);
        // Update the database
        put(() => {}, `/documents/${props.doc.id}`, { assignment_id: newAssignmentId !== "None" ? parseInt(newAssignmentId) : "null" });
    }

    /**
     * Update a document's assigned exam
     * 
     * @param newExamId The newly assigned exam ID
     */
    function updateExam(newExamId: string) {
        // Update exam if exists
        const exam = exams.find((e) => `${e.id}` === newExamId);
        setExam(exam || null);
        // Update the database
        put(() => {}, `/documents/${props.doc.id}`, { exam_id: newExamId !== "None" ? parseInt(newExamId) : "null" });
    }

    // Return JSX
    return(
        <TableRow>
            <TableCell>
                <input type="checkbox" onChange={(e) => props.toggleSelection(props.doc, e.target.checked)} />
            </TableCell>
            <TableCell>{props.doc.title}</TableCell>
            {/* Courses selection menu */}
            <TableCell>
                <Select value={course ? `${course.id}` : "None"} onValueChange={updateCourse}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="None" />
                    </SelectTrigger>
                    <SelectContent>
                        {/* Render all course options */}
                        <SelectItem value="None">None</SelectItem>
                        {courses.map((course, i) => {
                            return <SelectItem
                                key={i}
                                value={`${course.id}`}
                            >{course.subject} {course.number}: {course.title}</SelectItem>
                        })}
                    </SelectContent>
                </Select>
            </TableCell>
            {/* Assignments selection menu */}
            <TableCell>
                <Select value={assignment ? `${assignment.id}` : "None"} onValueChange={updateAssignment}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="None" />
                    </SelectTrigger>
                    <SelectContent>
                        {/* Render all assignment options for the selected course */}
                        <SelectItem value="None">None</SelectItem>
                        {assignments.map((assignment, i) => {
                            return <SelectItem
                                key={i}
                                value={`${assignment.id}`}
                            >{assignment.title}</SelectItem>
                        })}
                    </SelectContent>
                </Select>
            </TableCell>
            {/* Exams selection menu */}
            <TableCell>
                <Select value={exam ? `${exam.id}` : "None"} onValueChange={updateExam}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="None" />
                    </SelectTrigger>
                    <SelectContent>
                        {/* Render all exam options for the selected course */}
                        <SelectItem value="None">None</SelectItem>
                        {exams.map((exam, i) => {
                            return <SelectItem
                                key={i}
                                value={`${exam.id}`}
                            >{exam.title}</SelectItem>
                        })}
                    </SelectContent>
                </Select>
            </TableCell>
            <TableCell className="text-right">
                <a href={props.doc.url} target="_blank" rel="noreferrer" className="text-[#00adb5] hover:underline cursor-pointer">Link</a>
            </TableCell>
        </TableRow>
    )
}

// DocumentTableRowProps type
type DocumentTableRowProps = {
    doc: DocumentSchema;
    toggleSelection: (doc: DocumentSchema, checked: boolean) => void;
    courses: CourseSchema[];
    assignments: AssignmentSchema[];
    exams: ExamSchema[];
}