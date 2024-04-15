export interface ForumPostSchema {
    id: number;
    title: string;
    user_id: number;
    group_id: number;
    content: string;
    likes: number;
    dislikes: number;
}

export interface ForumPostsRows extends Array<ForumPostSchema> {};