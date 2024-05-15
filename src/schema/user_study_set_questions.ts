export interface UserStudySetQuestionSchema {
    id: number;
    study_set_id: number;
    type: string;
    question: string;
    answer: string;
    options: string | null;
}

export interface UserStudySetQuestionsRows extends Array<UserStudySetQuestionSchema> {};