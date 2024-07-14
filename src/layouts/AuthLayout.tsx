import React from 'react';
import {Outlet} from "react-router-dom";
import {Card, CardBody} from "@nextui-org/react";

const AuthLayout = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <Card className="w-[400px]">
                <CardBody>
                    <Outlet/>
                </CardBody>
            </Card>
        </div>
    );
};

export default AuthLayout;