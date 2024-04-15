export interface DocumentSchema {
    id: number;
    user_id: number;
    course_id: number;
    assignment_id: number;
    exam_id: string;
    title: string;
    ext: string;
    url: string;
    ext_icon_url: string;
    is_note: boolean;
}

export interface DocumentsRows extends Array<DocumentSchema> {};