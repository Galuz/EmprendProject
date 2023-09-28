export interface ShareData {}

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Comment {
    id: number;
    body: string;
    user: User;
    created_at: string;
    updated_at: string;
}

export interface UserDataResponse {
    id: number;
    name: string;
    email: string;
    comments: Comment[];
    created_at: string;
    updated_at: string;
}