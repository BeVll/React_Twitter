import React from 'react';
import {Outlet} from "react-router-dom";
import {Card, CardBody} from "@nextui-org/react";
import ThemeSwitcher from "../components/ThemeSwitcher.tsx";

const AuthLayout = () => {
    return (
        <div className="relative w-full h-screen flex justify-center items-center">
            <ThemeSwitcher/>

            <Card className="min-w-[400px]">
                <CardBody>
                    <Outlet/>
                </CardBody>
            </Card>
        </div>
    );
};

export default AuthLayout;