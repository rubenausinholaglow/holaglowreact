export interface userLogin {
    user : string;
    password : string;
}


export interface LoginResponse {
    token : string;
    refreshToken : string;
    refreshTokenExpiryTime : string;
    agentId : string;
}