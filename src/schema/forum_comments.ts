export interface ForumCommentSchema {
    id: number;
    user_id: number;
    forum_id: number;
    post_id: number;
    parent_id: number;
    content: string;
    likes: number;
    dislikes: number;
}

export interface ForumCommentsRows extends Array<ForumCommentSchema> {};