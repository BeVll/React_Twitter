import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AuthPage from "./pages/auth/AuthPage.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import SignupPage from "./pages/auth/SignupPage.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import UserPage from "./pages/user/UserPage.tsx";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
               <Route path={"/auth"} element={<AuthLayout/>}>
                   <Route path={"signup"} element={<SignupPage/>}/>
                   <Route path={"login"} element={<AuthPage/>}/>
               </Route>
                <Route path={"/"} element={<MainLayout/>}>
                    <Route path={"profile/:id"} element={<UserPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;