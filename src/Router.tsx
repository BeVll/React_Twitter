import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "./App.tsx";
import AuthPage from "./pages/auth/AuthPage.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import SignupPage from "./pages/auth/SignupPage.tsx";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
               <Route path={"/auth"} element={<AuthLayout/>}>
                   <Route path={"signup"} element={<SignupPage/>}/>
                   <Route path={"login"} element={<AuthPage/>}/>
               </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;