export interface UserSummarizationSchema {
    id: number;
    user_id: number;
    title: string;
    content: string;
    created_at: string;
}

export interface UserSummarizationsRows extends Array<UserSummarizationSchema> {};