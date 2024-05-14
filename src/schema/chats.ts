export interface ChatSchema {
    id: number;
    user_id: number;
    title: string;
    assignment_id: number;
    document_id: number;
    created_at: string;
    saved: boolean;
}

export interface ChatsRows extends Array<ChatSchema> {};