export interface TextbookSubjectSchema {
    id: number;
    textbook_id: number;
    subject: string;
}

export interface TextbookSubjectsRows extends Array<TextbookSubjectSchema> {};