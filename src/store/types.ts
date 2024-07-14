
export interface IUser {
    id: string,
    name: string,
    avatar: string,
    email: string,
    exp: number,
    roles: string[]
}


export enum AuthUserActionType {
    LOGIN_USER = "AUTH_LOGIN_USER",
    LOGOUT_USER = "AUTH_LOGOUT_USER"
}

export interface IAuthUser {
    isAuth: boolean,
    user?: IUser,
    userToken?: string | null
}