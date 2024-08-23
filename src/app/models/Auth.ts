import { User } from "./User.model";

export interface AuthModel{
    email: string,
    password?: string,
    displayName?: string,
    photoURL?: string
} 

export interface AuthResponse {
    status: string
    token: string;
    user: User;
  } 
  
 export interface ErrorAuthResponse {
    status: string; 
    message: string;
  }