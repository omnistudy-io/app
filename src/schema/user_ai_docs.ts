export interface UserAiDocSchema {
    id: number;
    user_study_set_id: number;
    user_summarization_id: number;
    user_chat_id: number;
    document_id: number;
}

export interface UserAiDocsRows extends Array<UserAiDocSchema> {};