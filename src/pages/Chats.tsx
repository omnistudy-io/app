// Component imports
import { DashboardContainer } from "@/components/ui/DashboardContainer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/Table";
import ChatModal from "@/components/modals/ChatModal";

// Tools imports
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AssignmentSchema } from "@/schema";
import get from "@/utils/get";

// Icon imports
import { PlusIcon } from "lucide-react";
import { ChatSchema } from "@/schema/chats";


export default function Chats() {

    // Hooks
    const navigate = useNavigate();
    const { id: assignmentId } = useParams();

    const [chats, setChats] = useState<(ChatSchema & { documentTitle: string })[] | null>(null);
    const [openedChat, setOpenedChat] = useState<ChatSchema | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [assignment, setAssignment] = useState<AssignmentSchema | null>(null);

    useEffect(() => {
        get(setAssignment, "assignment", `/assignments/${assignmentId}`);
        get(setChats, "chats", `/assignments/${assignmentId}/chats`);
    }, [openedChat]); 

    function newChatHandler() {
        setShowModal(true);
        setOpenedChat(null);
    }

    // Handle the opening of a new chat
    function handleOpenChat(chat: ChatSchema) {
        setOpenedChat(chat);
        setShowModal(true);
    }

    function addChat(chat: (ChatSchema & { documentTitle: string })) {
        const newChats = chats ? [...chats, chat] : [chat];
        setChats(newChats);
    }

    return (
        <DashboardContainer
            dropdown={false}
            subHeader={"Assignment Chats"}
            header={`${assignment?.title} Chats`}
            callToAction={newChatHandler}
            callToActionText="New Chat"
            callToActionIcon={<PlusIcon />}
        >

            {/* Chat modal */}
            <ChatModal show={showModal} setShow={setShowModal} chat={openedChat} addChat={addChat} />

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/3">Chat Name</TableHead>
                        <TableHead className="w-1/2">Document</TableHead>
                        <TableHead>Last Used</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {chats && chats.map((chat: (ChatSchema & { documentTitle: string }), index: number) => {
                        return <TableRow className="cursor-pointer" onClick={() => handleOpenChat(chat)}>
                            <TableCell>{chat.title}</TableCell>
                            <TableCell>{chat.documentTitle}</TableCell>
                            <TableCell>{new Date(chat.created_at).toLocaleDateString()}</TableCell>
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