import { DashboardContainer } from "@/components/ui/DashboardContainer";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/Table";
import SearchBar from "@/components/filter/SearchBar";
import LoadModal from "@/components/loading/LoadModal";

import { useState, useEffect, useRef } from "react";
import get from "@/utils/get";
import post from "@/utils/post";

import { FileText as DocumentsIcon } from "lucide-react";

import { DocumentSchema } from "@/schema";

export default function Documents() {

    const [documents, setDocuments] = useState<DocumentSchema[] | null>(null);
    const [filterDocuments, setFilterDocuments] = useState<DocumentSchema[] | null>(null);
    const [showLoadModal, setShowLoadModal] = useState<boolean>(false);

    const fileUplaodRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        get(setDocuments, "docs", "/users/1/documents");
        get(setFilterDocuments, "docs", "/users/1/documents");
    }, []);

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

    return(
        <DashboardContainer
            subHeader={"Documents"}
            header="Documents"
            headerIcon={<DocumentsIcon />}
            callToAction={() => {
                console.log("Upload new document");
                fileUplaodRef.current?.click();
            }}
            callToActionText="Upload New"
        >
            <LoadModal show={showLoadModal} message="Uploading document, please do not close this page."></LoadModal>

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
                                <input type="checkbox" name="" id="" />
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
                                    <input type="checkbox" name="" id="" />
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