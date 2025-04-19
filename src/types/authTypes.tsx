export interface User {
    id? : number,
    firstName : string,
    lastName : string,
    email : string,
    password : string,
    cin : string,
    branch : string,
    imageUrl : string,
    roleId : number,
    token : string
}
export interface UserLogin {
    email : string,
    roleId : number,
    token : string
}
export interface AuthState{
    user: User | null;
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
}
export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface RegisterData {
    firstName : string,
    lastName : string,
    email : string,
    password : string,
    cin : string,
    branch : string,
    imageUrl : string,
    roleId : number,
  }
  
  export interface ErrorResponse {
    message: string;
  }
  export interface DecodedToken {
    id: number
    email: string
    role: string
    iat: number
    exp: number
  }