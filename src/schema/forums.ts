export interface ForumSchema {
    id: number;
    name: string;
    tag_id: string;
    thumbnail_url: string | null;
    user_count: number;
    users_online: number;
    post_count: number;
    comment_count: number;
    score: number;
    created_at: string;
}

export interface ForumsRows extends Array<ForumSchema>{};