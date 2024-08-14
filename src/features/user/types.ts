export interface IUserDetailed {
    id: number;
    userName: string;
    name: string;
    image: string;
    backgroundImage: string;
    description: string;
    verified: boolean;
    country: string;
    countryCode: string;
    followers: number;
    following: number;
    likes: number;
    isFollowed: boolean;
}

export interface IFollower {
    id: number;
    followerId: number,
    follower: IUserDetailed;
    userId: number,
    createdAt: Date,
}