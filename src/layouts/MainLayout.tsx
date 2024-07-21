import React from 'react';
import Header from "../components/Header.tsx";
import {Outlet} from "react-router-dom";

const MainLayout = () => {
    return (
        <div className={"flex flex-col gap-[20px]"}>
            <Header/>
            <div className={"lg:px-[500px] px-0"}>
                <Outlet/>
            </div>
        </div>
    );
};

export default MainLayout;