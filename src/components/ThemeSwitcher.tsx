"use client";

import React, {useEffect, useState} from 'react';
import {useTheme} from "next-themes";
import {Switch, useSwitch, VisuallyHidden} from "@nextui-org/react";
import SunIcon from "../assets/icons/SunIcon.tsx";
import MoonIcon from "../assets/icons/MoonIcon.tsx";


const ThemeSwitcher = (props) => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme();


    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted) return null


    return (
        <div className="flex flex-col gap-2 absolute right-4 top-4">
            <Switch
                size="lg"
                color="success"
                defaultSelected={theme === "light"}
                onChange={() => {
                    setTheme(theme === "light" ? "dark" : "light")
                }}
                startContent={<SunIcon />}
                endContent={<MoonIcon />}
            >
            </Switch>
        </div>
    );
};

export default ThemeSwitcher;