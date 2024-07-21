import {useEffect, useState} from 'react'
import './App.css'
import Router from "./Router.tsx";
import {useDispatch} from "react-redux";
import {AuthUserActionType, IUser} from "./store/types.ts";
import {jwtDecode} from "jwt-decode";
import {api, apiForm} from "./utils/axios.ts";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
            apiForm.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;

            const user2 = jwtDecode(localStorage.token) as IUser;

            console.log(user2);
            dispatch({
                type: AuthUserActionType.LOGIN_USER, payload: user2
            });

        }

        return () => {

        }
    }, []);
  return (
    <>
      <Router/>
    </>
  )
}

export default App
