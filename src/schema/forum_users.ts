export interface ForumUserSchema {
    id: number;
    user_id: number;
    forum_id: number;
    joined_at: string;
    post_count: number;
    comment_count: number;
    founder: boolean;
    admin: boolean;
}

export interface ForumUsersRows extends Array<ForumUserSchema> {}