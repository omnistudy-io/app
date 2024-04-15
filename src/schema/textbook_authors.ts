export interface TextbookAuthorSchema {
    id: number;
    textbook_id: number;
    author: string;
}

export interface TextbookAuthorsRows extends Array<TextbookAuthorSchema> {};