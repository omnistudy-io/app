export interface UserStudySetSchema {
    id: number;
    user_id: number;
    title: string;
    num_questions: number;
    created_at: string;
}

export interface UserStudySetsRows extends Array<UserStudySetSchema> {};