import React, { createContext } from 'react'
import { RouterContextProvider } from 'react-router'
import { useContext } from 'react'
import { useState, useEffect } from 'react'

const Appearance = createContext()
export const useAppearance = () => useContext(Appearance);

const AppearanceContext = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        let localTheme = localStorage.getItem("dark");

        if (!localTheme) {
            const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

            if (isDarkMode) {
                return "dark";
            } else {
                return "light";
            }
        }
        return localTheme;
    });

    const [show, setShow] = useState(() => localStorage.getItem("side") || "show")
    useEffect(() => {
        localStorage.setItem('dark',
            theme == 'dark' ? 'dark' : 'light'
        )
        console.log(localStorage.getItem("dark"))
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme])

    return (
        <Appearance.Provider value={{ theme, setTheme, show, setShow }}>
            {children}
        </Appearance.Provider>
    )
}

export default AppearanceContext
