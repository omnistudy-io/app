export interface AssignmentSchema {
    id: number;
    course_id: number;
    title: string;
    description: string;
    progress: number;
    created_at: string;
    due_at: string;
    actual_points: number;
    possible_points: number;
    weight: number;
}

export interface AssignmentsRows extends Array<AssignmentSchema> {};