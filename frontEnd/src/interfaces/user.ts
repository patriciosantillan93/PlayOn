import { User } from "next-auth";

export interface UserFromDB extends User {
  id: string;
  name: string;
  email: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse extends ApiResponse {
  payload: UserFromDB;
}

export interface ApiResponse {
  success: boolean;
}
