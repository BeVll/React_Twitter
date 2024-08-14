import React, {useEffect, useState} from 'react';
import {Button, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, user} from "@nextui-org/react";
import {IFollower, IUserDetailed} from "../types.ts";
import UserApi from "../api/UserApi.ts";

const FollowersModal = ({isOpen, onOpenChange, id}:{isOpen:boolean, onOpenChange:()=>void, id:number|string}) => {
    const [followers, setFollowers] = useState<IFollower[]>([]);

    useEffect(() => {
        // const  followersTmp = [];
        // for (let i = 0; i < 100; i++) {
        //     followersTmp[i] = {
        //         id: i,
        //         userId: 2,
        //         followerId: 1,
        //         follower: {
        //             id:i,
        //             image: "https://cdn.outsideonline.com/wp-content/uploads/2023/06/hiker-waterfall-nature_s.jpg",
        //             name: `Follower #${i+1}`,
        //             userName: "fadsf",
        //             backgroundImage: "fadsfasd",
        //             description: "fadsfasd",
        //             verified: false
        //         },
        //         createdAt: new Date(),
        //     }
        //     console.log(followers);
        //
        // }
        // setFollowers(followersTmp);
        UserApi.getFollowers(id).then(response => {
            setFollowers(response.data);
            console.log(response.data);
        }).catch(reason => console.log(reason));
    }, [id]);

    return (
        <Modal isOpen={isOpen} backdrop={"blur"} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Followers</ModalHeader>
                        <ModalBody className={"max-h-[500px] overflow-y-auto"}>
                            <div className={"flex flex-col gap-3 w-full"}>
                                {/*{*/}
                                {/*    followers.length > 0 && followers.map((item) => (*/}
                                {/*        <div className={"flex justify-between w-full"} key={item.follower.id}>*/}
                                {/*            <div className={"flex items-center gap-2"}>*/}
                                {/*                <Image src={import.meta.env.VITE_IMAGES_URL + item.follower.image} className={"rounded-[50%] h-[40px] w-[40px]"}/>*/}
                                {/*                <h1 className={"font-bold"}>{item.follower.name}</h1>*/}
                                {/*            </div>*/}
                                {/*            <div>*/}
                                {/*                <Button size={"sm"} color={"primary"}>Follow</Button>*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*    ))*/}
                                {/*}*/}

                                {
                                    followers.length > 0 && followers.map((item, index) => (
                                        <div className={"flex justify-between w-full"} key={index}>
                                            <div className={"flex items-center gap-2"}>
                                                <Image src={import.meta.env.VITE_IMAGES_URL + item.follower.image} className={"rounded-[50%] h-[40px] w-[40px]"}/>
                                                <h1 className={"font-bold"}>{item.follower.name}</h1>
                                            </div>
                                            <div>
                                                <Button size={"sm"} color={"primary"}>Follow</Button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </ModalBody>
                        <ModalFooter>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
};

export default FollowersModal;