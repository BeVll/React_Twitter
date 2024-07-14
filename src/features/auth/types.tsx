export interface IAuthRequest {
    email: string;
    password: string;
}

export interface ISignupRequest {
    name:string;
    email: string;
    password: string;
    confirmPassword: string;
    image:File|undefined|null,
    backgroundImage:File|undefined|null,
    country: string,
    countryCode: string
}

export interface IAuthLogin {
    token: string
}