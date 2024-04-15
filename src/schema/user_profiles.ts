export interface UserProfileSchema {
    id: number;
    user_id: number;
    address1: string;
    address2: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    school: string;
    year: string;
    image_url: string;
    bio: string;
    birth_month: number;
    birth_date: number;
    birth_year: number;
    age: number;
}

export interface UserProfilesRows extends Array<UserProfileSchema> {};