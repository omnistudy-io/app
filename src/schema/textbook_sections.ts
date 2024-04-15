export interface TextbookSectionSchema {
    id: number;
    textbook_id: number;
    title: string;
    content_url: string;
    section_id: number;
}

export interface TextbookSectionsRows extends Array<TextbookSectionSchema> {};