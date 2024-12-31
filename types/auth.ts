// types/auth.ts
export interface LoginCredentials {
    login: string;
    password: string;
}
  
export interface RegisterCredentials {
    username: string;
    email: string;
    password: string;
}
  
export interface UserResponse {
    _id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}