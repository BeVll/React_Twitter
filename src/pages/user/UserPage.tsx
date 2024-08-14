import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import UserApi from "../../features/user/api/UserApi.ts";
import {IUserDetailed} from "../../features/user/types.ts";
import CreatePost from "../../features/tweets/components/CreatePost.tsx";
import TweetItem from "../../features/tweets/components/TweetItem.tsx";
import TweetApi from "../../features/tweets/api/TweetApi.ts";
import {useSelector} from "react-redux";
import {IAuthUser} from "../../store/types.ts";
import {ITweetView} from "../../features/tweets/types.ts";
import {Button, Link, useDisclosure} from "@nextui-org/react";
import FollowersModal from "../../features/user/components/FollowersModal.tsx";

const UserPage = () => {
    const {id} = useParams();
    const [profile, setProfile] = useState<IUserDetailed>();
    const { user, isAuth } = useSelector((store: any) => store.auth as IAuthUser);
    const [tweets, setTweets] = useState<ITweetView[]>([]);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    useEffect(() => {
        console.log(id);
        if(id && user){
            UserApi.getUserDetailed(id).then(response => {
                setProfile(response.data);
            }).catch(reason => {
                console.log(reason);
            })

            TweetApi.getPostsForUser(id, user?.id).then(response => {
                setTweets(response.data);
            }).catch(reason => console.log(reason));
        }
    }, [id, user]);

    const followClick = () => {
        setProfile({...profile, isFollowed: false, followers: profile?.followers-1})

        UserApi.follow(profile?.id).then(response => {
            if(response.data === "Followed"){
                setProfile({...profile, isFollowed: true, followers: profile?.followers+1})
            }

            else {
                setProfile({...profile, isFollowed: false, followers: profile?.followers-1})
            }

        }).catch(reason => console.log(reason));
    }

    const unfollowClick = () => {
        setProfile({...profile, isFollowed: true, followers: profile?.followers+1})
        UserApi.follow(profile?.id).then(response => {
            if(response.data === "Followed")
                setProfile({...profile, isFollowed: true, followers: profile?.followers+1})
            else
                setProfile({...profile, isFollowed: false, followers: profile?.followers-1})
        }).catch(reason => console.log(reason));
    }

    return (
        <div className={"flex flex-col gap-[20px] "}>
            <div className={"rounded-xl bg-content1 overflow-hidden"}>
                <div className={"h-[240px] bg-center bg-cover"}
                     style={{backgroundImage: `url(${import.meta.env.VITE_IMAGES_URL + profile?.backgroundImage})`}}>
                </div>

                <div className={"p-5 flex flex-col gap-[10px]"}>
                    <div className={"w-full flex justify-between "}>
                        <img className={"mt-[-100px]  border-5 border-content1 rounded-[50%] h-[160px] "}
                             src={import.meta.env.VITE_IMAGES_URL + profile?.image} width={160} height={160}/>
                        <div className={"flex gap-5"} >
                            {
                                profile?.id != user?.id &&
                                <div>
                                    {
                                        profile?.isFollowed ?
                                            <Button onClick={followClick} color={"primary"} variant={"ghost"}>Unfollow</Button>
                                            :
                                            <Button onClick={unfollowClick} color={"primary"} variant={"solid"}>Follow</Button>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    <div className={"flex flex-col gap-[10px]"}>
                        <h1 className={"font-bold text-3xl"}>{profile?.name}</h1>
                        <span className={"text-default-500"}>{profile?.description}</span>

                        <div className={"flex gap-[20px]"}>
                        <Link color={"foreground"} className={"cursor-pointer"} onPress={onOpen} >
                            <span className={"font-bold"}>{profile?.followers} </span>

                            <span className={"font-light ml-1"}>Followers</span>
                        </Link>

                            <span>
                            <span className={"font-bold"}>{profile?.following}</span>
                            <span className={"font-light"}> Followings</span>
                        </span>
                        </div>
                    </div>
                </div>
                

            </div>

            <div className={"bg-content1 rounded-xl flex flex-col"}>
                {
                    profile?.id == user?.id && <CreatePost/>
                }

                {
                    tweets.length > 0 &&
                        tweets.map(tweet => (
                            <TweetItem tweet={tweet}/>
                        ))
                }
            </div>
            <FollowersModal id={id} isOpen={isOpen} onOpenChange={onOpenChange}/>
        </div>
    );
};

export default UserPage;