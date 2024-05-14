// Component imports
import { DashboardContainer } from "@/components/ui/DashboardContainer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import NotFound from "./NotFound";
import { Skeleton } from "@/components/ui/Skeleton";

// Tools imports
import { useState, useEffect, useContext, useRef } from "react";
import { useToast } from "@/hooks/useToast";
import { useParams, useNavigate } from "react-router-dom"
import get from "@/utils/get";
import post from "@/utils/post";
import put from "@/utils/put";
import del from "@/utils/del";
import AuthContext from "@/context/AuthContext";

// Icon imports
import { PencilLineIcon } from "lucide-react";
import { AssignmentSchema, ChatMessageSchema, ChatSchema, CourseSchema, DocumentSchema } from "@/schema";
import ConfirmModal from "@/components/modals/ConfirmModal";

export default function Chat() {

    // Hooks
    const { id: assignmentId, chatId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { toast } = useToast();
    const chatAreaRef = useRef<HTMLDivElement>(null);

    // Data state management
    const [course, setCourse] = useState<CourseSchema | null>(null);
    const [assignment, setAssignment] = useState<AssignmentSchema | null>(null);
    const [documents, setDocuments] = useState<DocumentSchema[] | null>(null);
    const [selectedDocument, setSelectedDocument] = useState<DocumentSchema | null>(null);
    const [chat, setChat] = useState<ChatSchema | null>(null);
    const [chatMessages, setChatMessages] = useState<ChatMessageSchema[] | null>(null);

    // Page logic state management
    const [chatTitle, setChatTitle] = useState<string>(chat?.title || "New untitled chat");
    const [editTitle, setEditTitle] = useState<boolean>(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
    const [initialChatLoading, setInitialChatLoading] = useState<boolean>(false);
    const [responseLoading, setResponseLoading] = useState<boolean>(false);
    const [currentMessage, setCurrentMessage] = useState<string>("");

    // Get initial data
    useEffect(() => {
        initData();
    }, []);

    async function initData() {
        // Get the assignment and then the course
        get((data: AssignmentSchema | null) => {
            setAssignment(data);
            if(data) {
                get(setCourse, "course", `/courses/${data.course_id}`);
            }
        }, "assignment", `/assignments/${assignmentId}`);
        // Get the documents for the assignment
        const docs = await get(setDocuments, "docs", `/assignments/${assignmentId}/documents`) as DocumentSchema[];

        // Get the chat data
        get((data: ChatSchema) => {
            setChat(data);
            setChatTitle(data ? data.title : "New untitled chat");
            // If there's a document associated with the chat, get it
            if(data && data.document_id)
                get(setSelectedDocument, "doc", `/documents/${data.document_id}`);
            // If there's no document associated with the chat, set the first document as the selected document
            else {
                setSelectedDocument(docs && docs.length > 0 ? docs[0] : null);
                put(() => {}, `/chats/${chatId}`, { document_id: docs && docs.length > 0 ? docs[0].id : null });
            }

            // Get all messages for the chat
            get((data: ChatMessageSchema[]) => {
                // If there are no current messages for the chat
                if(!data) {
                    console.log("Setting initial chat");
                    // If there are no associated documents, send a message to the chat
                    if(!docs || docs.length == 0) {
                        const content = `Welcome, I'm your assistant OmniBot. There are currently no documents associated with this chat. You can still ask me questions or upload a document to get started.`;
                        createNewChatMessage([], content, false);
                    }
                    // If there's only one associated document, summarize it and send it to the chat
                    else if(docs && docs.length == 1) {
                        setInitialChatLoading(true);
                        post((data: any) => {
                            setInitialChatLoading(false);
                            const content = `Welcome, I'm your assistant OmniBot. <br/></br><b>Here's a brief summary of your document:</b><br/>${data.response}`;
                            createNewChatMessage([], content, false);
                        }, "/ai/chat", { 
                            doc_paths: docs && docs.length > 0 ? [docs[0].url] : [], 
                            question: "Summarize the document in 100 words" 
                        });
                    }
                    // If there are multiple associated documents, send a message to the chat
                    else {
                        const content = `Welcome, I'm your assistant OmniBot. There are multiple documents associated with this chat. You can ask me questions or select a document to use context from.`;
                        createNewChatMessage([], content, false);
                    }
                }
                // If there are messages for the chat, set them
                else {
                    setChatMessages(data);
                }
            }, "chat_messages", `/chats/${chatId}/messages`);
        }, "chat", `/chats/${chatId}`);
    }

    /**
     * 
     * @param doc 
     */
    function changeDocument(doc: DocumentSchema) {
        setSelectedDocument(doc);
        const content = `Now using context from document <a href="${doc.url}" target="_blank" style="color: #00adb5"}>${doc.title}</a>...`;
        createNewChatMessage(chatMessages || [], content, false);
        put(() => {}, `/chats/${chatId}`, { document_id: doc.id });
    }

    /**
     * Handle a new chat send from the user: send the chat and get a response
     */
    async function handleChatSend() {
        if(currentMessage.trim() === "") {
            toast({ title: "Error", description: "Please enter a message to send." });
        }
        else {
            const chats: ChatMessageSchema[] = await createNewChatMessage(chatMessages || [], currentMessage, true);
            console.log("CHATS AFTER USER:");
            console.log(chats);
            setCurrentMessage("");
            setResponseLoading(true);
            post(async (data: any) => {
                await createNewChatMessage(chats, data.response, false);
                setResponseLoading(false);
            }, "/ai/chat", {
                doc_paths: selectedDocument ? [selectedDocument.url] : [],
                question: currentMessage
            });
        }
    }

    /**
     * 
     * @param content The contents of the chat
     * @param fromUser Boolean indicating if the message is from the user
     */
    async function createNewChatMessage(chats: ChatMessageSchema[], content: string, fromUser: boolean): Promise<ChatMessageSchema[]> {
        return new Promise((resolve, _) => {
            post((data: any) => {
                if(data && data.chat_message) {
                    const currMsgs = chats ? [...chats] : [];
                    const newMsgs = [...currMsgs, {
                        id: data.chat_message.id,
                        user_id: user!.id,
                        chat_id: parseInt(chatId!),
                        from_user: fromUser,
                        content: content,
                        created_at: new Date().toISOString().split(".")[0]
                    }];
                    setChatMessages([...newMsgs]);
                    resolve(newMsgs);
                }
                else {
                    toast({ title: "Error", description: "Failed to create new message." });
                    resolve(chats || []);
                }
            }, "/chat-messages", {
                user_id: user!.id,
                chat_id: chatId,
                from_user: fromUser,
                content: content,
                created_at: new Date().toISOString().split(".")[0]
            });
        });
    }

    function deleteHandler() {
        del((data: any) => { 
            // If the request was not successful, show an error toast
            if(data.code !== 200) {
              toast({ title: "Failed to delete chat", description: "An error occured while deleting the chat, please try again later." });
            }
            // If the request was successful, show a success toast and navigate to the courses page
            else {
              toast({ title: "Success", description: `Chat ${chat?.title} deleted successfully.` });
              navigate(`/assignments/${assignmentId}/chats`);
            }
          }, `/chats/${chatId}`); 
    }

    function updateTitle(title: string) {
        setChatTitle(title);
        put((data: any) => {
            if(data.code === 200) {
                toast({ title: "Success", description: "Chat title updated successfully." });
                setEditTitle(false);
            }
            else {
                toast({ title: "Error", description: "Failed to update chat title." });
            }
        }, `/chats/${chatId}`, { title: title });
    }

    // If chat does not exist or use does not own chat, return a 404 page
    if(chat?.user_id != user?.id || course?.user_id != user?.id || assignmentId != chat?.assignment_id || !parseInt(chatId!)) {
        return(
          <NotFound />
        )
    }

    return(
        <DashboardContainer
            header={chatTitle}
            subHeader={`${assignment?.title} Assignment`}
            dropdown={true}
            editTitle={editTitle}
            dispatchTitleChange={updateTitle}
            dropdownOptions={[
                { label: "Edit Chat", onClick: () => setEditTitle(true) },
                { label: "Delete Chat", onClick: () => setShowDeleteConfirm(true), isDelete: true }
            ]}
            callToAction={() => {}}
            callToActionText="Options"
            className="h-full"
        >
            {/* Delete confirm modal */}
            <ConfirmModal
                show={showDeleteConfirm}
                setShow={setShowDeleteConfirm}
                title="Delete Chat"
                message={`Are you sure you want to delete chat ${chat?.title} and all of its messages? This action cannot be undone.`}
                confirmText="Delete"
                confirmCallback={deleteHandler}
            />

            <div className="flex flex-row gap-x-4 h-full">
                {/* Left side - documents */}
                <Card className="p-4 border-r border-stone-200 basis-1/4 h-full">
                    <span className="text-stone-900 font-medium text-lg">Documents</span>
                    <div>
                        {documents && documents.map((doc: DocumentSchema, i) => {
                            return <div className="flex items-center gap-x-2 mt-2">
                                <input 
                                    type="radio" 
                                    id={`document-${doc.id}`}
                                    checked={selectedDocument ? selectedDocument?.id == doc.id : false} 
                                    onChange={() => changeDocument(doc)}
                                />
                                <label htmlFor={`document-${doc.id}`}>
                                    <a href={doc.url} target="_blank" className="hover:text-[#00adb5] hover:underline transition-all duration-200">{doc.title}</a>    
                                </label>
                            </div>
                        })}
                    </div>
                </Card>

                {/* Right side - chat */}
                <Card className="relative flex flex-col p-4 basis-3/4">
                    <div className="relative flex flex-col gap-x-4 bg-[#f5f5f5] shadow-inner h-[500px] max-h-[800px] overflow-y-scroll rounded-lg">
                        {/* Actual chats */}
                        <div ref={chatAreaRef} className="h-full flex flex-col gap-y-2 p-4">

                            {/* Show an initial message skeleton */}
                            {initialChatLoading && <div>
                                <div className={`w-full text-xs text-stone-500 px-2 mb-1 text-left`}>
                                    {(new Date()).toLocaleString()} • OmniBot
                                </div>
                                <Skeleton className="h-[40px] w-[200px]"></Skeleton>
                            </div>}

                            {chatMessages && chatMessages.map((msg: ChatMessageSchema, i) => {
                                return <div className={`w-full flex flex-col ${msg.from_user ? "items-end" : "items-start"} ${i == chatMessages.length - 1 ? "pb-6" : ""}`}>
                                    <div className={`w-full text-xs text-stone-500 px-2 mb-1 ${msg.from_user ? "text-right" : "text-left"}`}>
                                        {(new Date(msg.created_at)).toLocaleString()} • {msg.from_user ? "You" : "OmniBot"}
                                    </div>
                                    <div 
                                        className={`text-sm p-2 rounded-md shadow-sm w-fit max-w-[85%] ${msg.from_user ? "bg-cyan-100" : "bg-stone-200"}`}
                                        dangerouslySetInnerHTML={{__html: msg.content}}
                                    />
                                </div>
                            })}

                            {/* Show an response message skeleton */}
                            {responseLoading && <div>
                                <div className={`w-full text-xs text-stone-500 px-2 mb-1 text-left`}>
                                    {(new Date()).toLocaleString()} • OmniBot
                                </div>
                                <Skeleton className="h-[40px] w-[200px]"></Skeleton>
                            </div>}

                            <div className="w-full h-[100px]"></div>
                        </div>
                    </div>

                    {/* Chat message box */}
                    <div className="mt-4 justify-self-end w-full">
                        <div className="flex flex-row gap-x-2">
                            <input
                                type="text"
                                className="bg-white border-1 ring-1 ring-gray-300 w-full rounded-md p-2 text-sm focus:outline-[#00adb5] text-stone-600"
                                placeholder="Type your question here..."
                                value={currentMessage}
                                onChange={(e) => setCurrentMessage(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleChatSend()}
                            />
                            <Button 
                                className="bg-[#00adb5] hover:bg-[#01888f] transition-all duration-150"
                                onClick={handleChatSend}
                            >
                                Send
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </DashboardContainer>

    );
}