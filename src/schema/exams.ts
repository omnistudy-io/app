export interface ExamSchema {
    id: number;
    course_id: number;
    title: string;
    description: string;
    building: string;
    room: string;
    seat: string;
    date: string;
    start_time: string;
    end_time: string;
    actual_points: number;
    possible_points: number;
    weight: number;
}

export interface ExamsRows extends Array<ExamSchema> {};