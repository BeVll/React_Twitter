import React, {useEffect, useState} from 'react';
import {ITweetView} from "../types.ts";
import {Link, useNavigate} from 'react-router-dom';
import {user} from "@nextui-org/react";
import {IAuthUser} from "../../../store/types.ts";
import {useSelector} from "react-redux";
import {api} from "../../../utils/axios.ts";

const TweetItem = ({tweet}:{tweet:ITweetView}) => {
    const [liked, setLike] = useState<boolean>();
    const [likesCount, setLikesCount] = useState<number>();
    const [gridColumns, setGridColumns] = useState<string>();
    const [gridRows, setGridRows] = useState<string>();
    const { user, isAuth } = useSelector((store: any) => store.auth as IAuthUser);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("User", user);
        setLike(tweet.liked);
        setLikesCount(tweet.likesCount);
        setGrid();

    }, [tweet])

    const setGrid = () => {
        switch (tweet.medias.length) {
            case 1:
                setGridColumns("1fr");
                setGridRows("1fr");
                break;
            case 2:
                setGridColumns("1fr 1fr");
                setGridRows("1fr");
                break;
            case 3:
                setGridColumns("1fr 1fr");
                setGridRows("1fr");
                break;
            case 4:
                setGridColumns("1fr 1fr");
                setGridRows("1fr 1fr");
                break;
            default:
                break;
        }
    }

    const isSeparator = (value: string): boolean => value === '/' || value === '\\' || value === ':';

    const getExtension = (path: string): string => {
        for (let i = path.length - 1; i > -1; --i) {
            const value = path[i];
            if (value === '.') {
                if (i > 1) {
                    if (isSeparator(path[i - 1])) {
                        return '';
                    }
                    return path.substring(i + 1);
                }
                return '';
            }
            if (isSeparator(value)) {
                return '';
            }
        }
        return '';
    };

    const likeTweet = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault();
        if (isAuth) {
            if (liked == false && likesCount != undefined) {
                setLike(true);
                setLikesCount(likesCount + 1);
                console.log("like", likesCount);
            }
            else if (likesCount != undefined) {
                setLike(false);
                setLikesCount(likesCount - 1);
                console.log("unlike", likesCount);
            }

            api.post("/likeTweet/" + tweet?.id).then((res) => {
                if (res.data == "Liked" && tweet != undefined && likesCount != undefined) {

                }
                else if (res.data == "unLiked" && tweet != undefined && likesCount != undefined) {


                }


            });
        }
        else {
            navigate("/login");
        }
    }


    return (
        <>

            <Link to={"/thought/" + tweet.id} style={{ width: '100%' }} >
                <div className={"w-full m-0 p-3 flex flex-col border-b-1 border-content2"}>
                    <div className='flex justify-between items-center'>
                        <div className="flex items-center">
                            <Link to={`/profile/${tweet?.user.id}`}>
                                <img src={`${import.meta.env.VITE_IMAGES_URL + tweet?.user.image}`} className="rounded-[50%] w-10 h-10" />
                            </Link>

                            <div className='flex flex-col justify-center items-start m-1'>
                                <Link to={`/profile/${tweet?.user.id}`} className="text-white text-[14px] transition font-semibold hover:text-content4">{tweet?.user.name}</Link>

                                <span className='text-default-400 text-[12px]'>{tweet?.createdAtStr}</span>
                            </div>

                        </div>

                    </div>


                    <div className="w-full h-full p-2 text-[14px] text-white font-light">
                        {tweet?.tweetText}
                    </div>
                    <div className={"w-full grid gap-[3px] mt-2 overflow-hidden rounded-[5px] border-1 border-[#31343B] max-h-[400px]"} style={{ gridTemplateColumns: gridColumns, gridTemplateRows: gridRows }}>

                        {tweet.medias.map((img, i) => (
                            <div key={img.id} className="col position-relative" style={i == 0 && tweet.medias.length == 3 ? { gridRowStart: 1, gridRowEnd: 3 } : {}}>
                                <div className="h-full ">
                                    {getExtension(img.path) == "gif"
                                        ?
                                        <img
                                            src={`${import.meta.env.VITE_IMAGES_URL}` + img.path}
                                            className="object-cover"
                                            alt="Зображення"
                                            style={{ height: '100%', width: '100%', overflow: 'hidden' }}
                                        />
                                        :
                                        <img
                                            src={tweet.medias.length == 1 ? `${import.meta.env.VITE_IMAGES_URL}1280_` + img.path : `${import.meta.env.VITE_IMAGES_URL}600_` + img.path}
                                            className="object-cover"
                                            alt="Зображення"
                                            style={{ height: '100%', width: '100%', overflow: 'hidden' }}
                                        />
                                    }

                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='flex mt-2'>
                        <div className='like mr-[15px]'>
                            <button className='likeBtn bg-transparent flex items-center gap-[5px]' onClick={likeTweet}>

                                <svg className='h-[14px]' fill="#3E444F" version="1.1" id="Capa_1" viewBox="1.8 2 21 21" >
                                    <g>
                                        <path fill={liked ? "#EB4C42" : "none"} stroke={liked ? "none" : "#3E444F"} xmlns="http://www.w3.org/2000/svg" d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" />
                                    </g>
                                </svg>



                                <span className='text-content4 text-start w-5' >{likesCount}</span>
                            </button>
                        </div>
                        <div className='like mr-[15px]'>
                            <button className='likeBtn bg-transparent flex items-center gap-[5px]'>
                                <svg className='action' fill="#3E444F" version="1.1" id="Capa_1" viewBox="0 0 32 32">

                                    <title>comment-1</title>
                                    <desc>Created with Sketch Beta.</desc>
                                    <defs>

                                    </defs>
                                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" >
                                        <g id="Icon-Set" transform="translate(-100.000000, -255.000000)" fill="#3E444F">
                                            <path d="M116,281 C114.832,281 113.704,280.864 112.62,280.633 L107.912,283.463 L107.975,278.824 C104.366,276.654 102,273.066 102,269 C102,262.373 108.268,257 116,257 C123.732,257 130,262.373 130,269 C130,275.628 123.732,281 116,281 L116,281 Z M116,255 C107.164,255 100,261.269 100,269 C100,273.419 102.345,277.354 106,279.919 L106,287 L113.009,282.747 C113.979,282.907 114.977,283 116,283 C124.836,283 132,276.732 132,269 C132,261.269 124.836,255 116,255 L116,255 Z" id="comment-1">

                                            </path>
                                        </g>
                                    </g>
                                </svg>
                                <span className='text-content4  text-[14px] text-start w-5'>{tweet?.commentsCount}</span>
                            </button>
                        </div>

                    </div>
                </div>
            </Link>

        </>
    );
};

export default TweetItem;