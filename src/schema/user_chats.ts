export interface UserChatSchema {
    id: number;
    user_id: number;
    content: string;
    created_at: string;
    user_sent: boolean;
}

export interface UserChatsRows extends Array<UserChatSchema> {};