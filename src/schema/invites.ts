export interface InviteSchema {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    code: string;
    created_at: string;
    accepted_at: string;
    accepted: boolean;
};

export interface InvitesRows extends Array<InviteSchema> {}