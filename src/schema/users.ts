export interface UserSchema {
    id: number;
    api_key: string;
    first_name: string;
    last_name: string;
    name: string;
    username: string;
    email: string;
    password: string;
    phone: string;
    created_at: string;
    online: string;
}

export interface UsersRows extends Array<UserSchema>{};