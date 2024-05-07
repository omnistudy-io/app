export interface ChatSchema {
    id: number;
    user_id: number;
    assignment_id: number;
    documents_used: string;
    created_at: string;
    saved: boolean;
}

export interface ChatsRows extends Array<ChatSchema> {};