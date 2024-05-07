// Component imports
import { DashboardContainer } from "@/components/ui/DashboardContainer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/Table";

// Tools imports
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AssignmentSchema } from "@/schema";
import get from "@/utils/get";

// Icon imports
import { PlusIcon } from "lucide-react";


export default function Chats() {

    // Hooks
    const navigate = useNavigate();
    const { id: assignmentId } = useParams();

    const [chats, setChats] = useState<AssignmentSchema[] | null>(null);
    const [assignment, setAssignment] = useState<AssignmentSchema | null>(null);

    useEffect(() => {
        get(setAssignment, "assignment", `/assignments/${assignmentId}`);
    }, []); 

    return (
        <DashboardContainer
            dropdown={false}
            subHeader={"Assignment Chats"}
            header={`${assignment?.title} Chats`}
            callToAction={() => {}}
            callToActionText="New Chat"
            callToActionIcon={<PlusIcon />}
        >
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/3">Chat Name</TableHead>
                        <TableHead className="w-1/2">Documents Used</TableHead>
                        <TableHead>Last Used</TableHead>
                        <TableHead className="text-right">Total Chats</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {chats && chats.map((chat: any, index) => {
                        return <TableRow>
                            <TableCell>{chat.title}</TableCell>
                            <TableCell>{chat.documents.length}</TableCell>
                            <TableCell>{chat.updatedAt}</TableCell>
                            <TableCell className="text-right">{chat.chats.length}</TableCell>
                        </TableRow>
                    })}
                    {!chats && <TableRow>
                        <TableCell colSpan={4} className="text-left">No chats found</TableCell>
                    </TableRow>}
                </TableBody>
            </Table>
        </DashboardContainer>
    );
}