export interface UserLogin {
    email : string;
    password : string;
}


export interface LoginResponse {
    token : string;
    refreshToken : string;
    refreshTokenExpiryTime : string;
}