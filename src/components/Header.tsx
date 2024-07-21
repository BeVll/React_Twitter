import React, {useState} from 'react';
import logo from '../assets/Twitter_logo.svg.png';
import {Image} from "@nextui-org/image";
import {Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, user} from "@nextui-org/react";
import {AuthUserActionType, IAuthUser} from "../store/types.ts";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {api, apiForm} from "../utils/axios.ts";
import {FaUserCircle} from "react-icons/fa";
import {BoxArrowLeft} from "react-bootstrap-icons";

const Header = () => {
    const { user, isAuth } = useSelector((store: any) => store.auth as IAuthUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = () => {
        delete api.defaults.headers.common["Authorization"];
        delete apiForm.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
        dispatch({ type: AuthUserActionType.LOGOUT_USER });
        navigate("/auth/login");
    }


    return (
        <div className={"w-full bg-content1 p-4 flex items-center justify-between md:px-[300px]  gap-[20px]"}>
            <div className={"flex items-center justify-start gap-[20px]"}>
                <img src={logo} className={"h-6 sm:block hidden"}/>
                <Input placeholder={"Search"} className={"min-w-[300px]"}/>
            </div>
            <div className={""}>
                <Dropdown>
                    <DropdownTrigger>
                        <Button isIconOnly={true} variant={"flat"}>
                            {
                                user?.image ? <Avatar className="w-unit-2xl h-unit-2xl"
                                                      src={import.meta.env.VITE_IMAGES_URL + user?.image}/>
                                    :
                                    <FaUserCircle size={36} color={"default"}/>
                            }
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
                        {/*<DropdownItem*/}
                        {/*    key="new"*/}
                        {/*    shortcut="⌘N"*/}
                        {/*    startContent={<AddNoteIcon className={iconClasses} />}*/}
                        {/*>*/}
                        {/*    New file*/}
                        {/*</DropdownItem>*/}

                        <DropdownItem
                            key="delete"
                            className="text-danger"
                            color="danger"
                            onPress={logout}
                            shortcut="⌘⇧D"
                            startContent={<BoxArrowLeft className={"text-danger"}
                                                        onClick={() => {
                                                        }}/>}
                        >
                            Logout
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    );
};

export default Header;