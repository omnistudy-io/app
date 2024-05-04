import { DashboardContainer } from "@/components/ui/DashboardContainer";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/Table";
import SearchBar from "@/components/filter/SearchBar";
import LoadModal from "@/components/modals/LoadModal";
import ConfirmModal from "@/components/modals/ConfirmModal";

import { useState, useEffect, useRef } from "react";
import get from "@/utils/get";
import post from "@/utils/post";
import del from "@/utils/del";

import { FileText as DocumentsIcon } from "lucide-react";
import { FileWarningIcon } from "lucide-react";

import { DocumentSchema } from "@/schema";

export default function Documents() {

    const [documents, setDocuments] = useState<DocumentSchema[] | null>(null);
    const [filterDocuments, setFilterDocuments] = useState<DocumentSchema[] | null>(null);
    const [showLoadModal, setShowLoadModal] = useState<boolean>(false);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [selectedDocuments, setSelectedDocuments] = useState<DocumentSchema[]>([]);

    const fileUplaodRef = useRef<HTMLInputElement>(null);

    /**
     * Get initial document data on page load
     */
    useEffect(() => {
        get(setDocuments, "docs", "/users/1/documents");
        get(setFilterDocuments, "docs", "/users/1/documents");
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
                    <TableHeader>
                        <TableRow>
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
                    <TableBody>
                        {filterDocuments && filterDocuments.map((doc, i) => {
                            return <TableRow>
                                <TableCell>
                                    <input type="checkbox" name="" id="" onChange={(e) => toggleSelectDocument(doc, e.target.checked)} />
                                </TableCell>
                                <TableCell>{doc.title}</TableCell>
                                <TableCell>{doc.course_id ? doc.course_id : "-"}</TableCell>
                                <TableCell>{doc.assignment_id ? doc.assignment_id : "-"}</TableCell>
                                <TableCell>{doc.exam_id ? doc.exam_id : "-"}</TableCell>
                                <TableCell className="text-right">
                                    <a href={doc.url} target="_blank" rel="noreferrer" className="text-[#00adb5] hover:underline cursor-pointer">
                                        Link
                                    </a>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </div>
        </DashboardContainer>
    );
}