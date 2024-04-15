export interface CourseSchema {
    id: number;
    user_id: number;
    title: string;
    subject: string;
    number: string;
    professor: string;
    building: string;
    room: string;
    color: string;
    thumbnail_url: string;
    start_date: string;
    end_date: string;
}

export interface CoursesRows extends Array<CourseSchema> {};