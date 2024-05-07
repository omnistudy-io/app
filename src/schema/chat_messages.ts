export interface ChatMessageSchema {
    id: number;
    chat_id: number;
    user_id: number;
    content: string;
    created_at: string;
    from_user: boolean;
}

export interface ChatMessagesRows extends Array<ChatMessageSchema> {};