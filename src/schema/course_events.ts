export interface CourseEventSchema {
    id: number;
    course_id: number;
    title: string;
    date: string;
    start_time: string;
    end_time: string;
    length: string;
    type: string;
}

export interface CourseEventDefinitionSchema {
    id: number;
    name: string;
    rule: string;
    days: string[]; // "repeat" or "oneoff"
    date: string;
    startTime: string;
    endTime: string;
}

export interface CourseEventsRows extends Array<CourseEventSchema> {};