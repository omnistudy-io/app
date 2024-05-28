// Component imports
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "../ui/Button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";

 
// Tools imports
import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import get from "@/utils/get";
import post from "@/utils/post";
import put from "@/utils/put";
import { DocumentSchema } from "@/schema";
import { ChatSchema } from "@/schema/chats";
import { ChatMessageSchema } from "@/schema/chat_messages";
import AuthContext from "@/context/AuthContext";

// Icon imports
import { PencilLineIcon } from "lucide-react";

export default function ChatModal(props: ChatModalProps) {

    // Hooks
    const { id: assignmentId } = useParams();
    const { user } = useContext(AuthContext);
    const chatAreaRef = useRef<HTMLDivElement>(null);

    // State management
    const [documents, setDocuments] = useState<DocumentSchema[] | null>(null);
    const [selectedDocument, setSelectedDocument] = useState<DocumentSchema | null>(null);
    const [editTitle, setEditTitle] = useState<boolean>(false);
    const [chatTitle, setChatTitle] = useState<string | null>(null);
    const [currentChat, setCurrentChat] = useState<ChatSchema | null>(null);
    const [chatMessages, setChatMessages] = useState<ChatMessageSchema[] | null>([]);
    const [currentMessage, setCurrentMessage] = useState<string>("");
    const [chatLoading, setChatLoading] = useState<boolean>(false);

    // Get initial data
    useEffect(() => {
        get((data: DocumentSchema[]) => {
            setDocuments(data);
            if(data && data.length > 0)
                setSelectedDocument(data[0]);
        }, "docs", `/assignments/${assignmentId}/documents`);
        // If chat is provided, get the messages
        if(props.chat != null) {
            setCurrentChat(props.chat);
            get((data: any) => {
                setChatMessages(data);
            }, "chat_messages", `/chats/${props.chat.id}/messages`);
        }
        else {
            console.log("New chat");
            setChatMessages([]);
        }
    }, [props.show]);

    function handleChatSend() {
        // On first chat, create a new chat in the database
        if(chatMessages) {
            setChatLoading(true);

            // If first message, create a new chat in the db
            if(chatMessages && !props.chat && chatMessages.length == 0) {
                console.log("Creating new chat");
                post((data: any) => {
                    console.log("From chat creation")
                    console.log(data);
                    setCurrentChat(data.chat);
                    sendAndReceiveNewMessage(data.chat, currentMessage);
                    props.addChat(data.chat);
                }, "/chats", {
                    user_id: user ? user.id : -1,
                    title: chatTitle,
                    assignment_id: assignmentId,
                    documents_used: selectedDocument ? selectedDocument.id : null,
                    created_at: (new Date()).toISOString().split(".")[0],
                    saved: 1
                });
            }
            // Otherwise, send the message to the chat
            else {
                console.log("Chat already made");
                sendAndReceiveNewMessage(currentChat!, currentMessage);
            }
        }
    }

    /**
     * Create a new user chat message and store in the DB.
     * Then get the AI response and store in the DB.
     * 
     * @param content The content of the message
     */
    function sendAndReceiveNewMessage(chat: ChatSchema, content: string) {
        post((data: any) => {
            // Update the chat messages with the user message
            setCurrentMessage("");
            const msgs = chatMessages || [];
            const newMsgs = [ ...msgs, { ...data.chat_message } ];
            setChatMessages(newMsgs);

            // Get the AI message
            post((aiData: any) => {
                // Write the AI message to the DB, then display chat
                post((aiData: any) => {
                    const aiMsgs = newMsgs;
                    const newAiMsgs = [ ...aiMsgs, { ...aiData.chat_message } ];
                    setChatMessages(newAiMsgs);
                    setChatLoading(false);
                }, "/chat-messages", {
                    chat_id: chat.id,
                    user_id: user ? user.id : -1,
                    content: aiData.response,
                    from_user: false
                })
            }, "/ai/chat", { doc_paths: [selectedDocument ? selectedDocument.url : ""], question: content });
        }, "/chat-messages", {
            chat_id: chat.id,
            user_id: user ? user.id : -1,
            content: content,
            from_user: true
        });
    }

    async function commitTitleChange() {
        // put(() => {
        //     setEditTitle(false);
        //     setChatTitle(chatTitle);
        // }, `/chats/${currentChat?.id}`, { title: chatTitle });

        const putRes: any = await put(() => {}, `/chats/${currentChat?.id}`, { 
            title: chatTitle 
        });
        if(putRes.chat) {
            setEditTitle(false);
            setChatTitle(chatTitle);
        }
    }

    return(
        <Dialog.Root open={props.show}>
            <Dialog.Portal>
                <Dialog.Overlay
                    onClick={() => props.setShow(false)}
                    className="bg-[#00000090] fixed inset-0 data-[state=open]:animate-overlayShow data-[state=closed]:animate-overlayHide"
                />
                <Dialog.Content className="data-[state=open]:animate-contentShow data-[state=closed]:animate-contentHide fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[1000px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <div className="flex flex-row gap-x-4">
                        {/* Left side - documents */}
                        <div className="p-4 border-r border-stone-200 basis-1/3">
                            <span className="text-stone-900 font-medium text-lg">Documents</span>
                            <div>
                                {documents && documents.map((doc: DocumentSchema, i) => {
                                    return <div className="flex items-center gap-x-2 mt-2">
                                        <input 
                                            type="radio" 
                                            id={`document-${doc.id}`}
                                            checked={selectedDocument ? selectedDocument?.id == doc.id : false} 
                                            onChange={() => setSelectedDocument(doc)}
                                        />
                                        <label htmlFor={`document-${doc.id}`}>{doc.title}</label>
                                    </div>
                                })}
                            </div>
                        </div>

                        <div className="relative flex flex-col p-4 pl-0 basis-2/3">
                            {/* Right side - chat */}
                            <div className="flex justify-between items-center px-1 mb-4">
                                <Dialog.Title className="m-0 text-[18px] font-medium !text-stone-800 flex flex-row gap-x-2 items-center justify-center">
                                    {!editTitle ?
                                        <div>{chatTitle || props.chat?.title}</div> 
                                        :
                                        <div>
                                            <input 
                                                type="text"
                                                className="w-fit"
                                                value={chatTitle || props.chat?.title}
                                                onChange={(e) => setChatTitle(e.target.value)}
                                                onBlur={() => commitTitleChange()}
                                                onKeyDown={(e) => e.key == "Enter" && commitTitleChange()}
                                                autoFocus
                                            />
                                        </div>
                                    }
                                    {!editTitle ? 
                                        <PencilLineIcon size={16} className="cursor-pointer text-[#00adb5]" onClick={() => setEditTitle(true)}/>
                                        :
                                        null
                                    }
                                        
                                </Dialog.Title>
                            </div>
                            
                            {/* Chat text area */}
                            <div ref={chatAreaRef} className="relative flex flex-col gap-x-4 bg-[#f5f5f5] shadow-inner h-[500px] max-h-[700px] overflow-y-scroll rounded-lg">
                                {/* Actual chats */}
                                <div className="h-full flex flex-col gap-y-2 py-2 px-2">
                                    {chatMessages && chatMessages.map((msg: ChatMessageSchema, i) => {
                                        return <div className={`w-full flex flex-col ${msg.from_user ? "items-end" : "items-start"} ${i == chatMessages.length - 1 ? "pb-6" : ""}`}>
                                            <div className={`w-full text-xs text-stone-500 px-2 mb-1 ${msg.from_user ? "text-right" : "text-left"}`}>
                                                {(new Date(msg.created_at)).toLocaleString()} • {msg.from_user ? "You" : "OmniBot"}
                                            </div>
                                            <div className={`text-sm p-2 rounded-md shadow-sm w-fit max-w-[85%] ${msg.from_user ? "bg-cyan-100" : "bg-stone-300"}`}>
                                                {msg.content}
                                            </div>
                                        </div>
                                    })}
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
                                        disabled={chatLoading}
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
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

// Type definitions
type ChatModalProps = {
    show: boolean;
    setShow: (show: boolean) => void;
    chat?: ChatSchema | null;
    addChat: (chats: (ChatSchema & { documentTitle: string })) => void;
}