import {IUserDetailed} from "../user/types.ts";

export interface IUploadImage {
    media: File
}

export interface ITweetView {
    id:number,
    tweetText:string,
    medias:IMedia[],
    user:IUserDetailed,
    reposted:ITweetView|null|undefined,
    liked:boolean,
    likesCount:number,
    retweeted:boolean,
    retweetedCount:number,
    commentsCount:number,
    viewsCount:number,
    createdAt:string,
    createdAtStr:string,
}

export interface ITweetCreate {
    tweetText:string,
    mediaIds:number[],
    repostedId:ITweetView|null|undefined,
    postTime: Date|null|undefined,
    timeZone: string
}

export interface IMedia {
    id:number,
    path:string
}

export interface IUploadImage {
    media: File|null;
}
//інформація про фото, яке завантажили на сервер
export interface IUploadImageResult {
    id: number;
    path: string;
}