import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import sun from '../assets/sun.svg';
import moon from '../assets/moon.svg';
import Logo from './Logo';
import ham from '../assets/ham.svg'
import darkham from '../assets/darkham.svg'
import leftA from '../assets/lightLeft.svg'
import darkleftA from '../assets/darkArrow.svg'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import { useAppearance } from '../context/AppearanceContext.jsx';
const Nav = ({ hide }) => {
    const { theme, setTheme, show, setShow } = useAppearance()

    const navigate = useNavigate()

    const handleHome = () => {
        navigate('/')
    }
    const handleLogin = () => {
        navigate('/login')
    }

    const handleTheme= () => {
        setTheme(prev => (prev === "dark" ? "light" : "dark"));
    };
    const handleShow = () => {
        if (!hide) {
            if (show === "show") {
                setShow("dontShow")
                localStorage.setItem("side", "dontshow")
            }
            else {
                setShow("show");
                localStorage.setItem("side", "show")
            }
        } else {
            navigate("/create")
        }
    }
    return (

        <div className=' w-[100vw] h-15 bg-card border-b border-border text-foreground fixed top-0 left-0 
        z-50 flex items-center justify-between gap-0 p-3 box-border transition-colors duration-280 shadow-soft'>
            <div className=' flex items-center justify-center gap-2 shrink-0 '>
                <div className='text-foreground rounded-full h-10 w-10  flex items-center justify-center transition-colors duration-100 ease-in hover:bg-secondary cursor-pointer' onClick={handleShow}>
                    <img src={(hide) ? ((theme === "dark") ? darkleftA : leftA) : ((theme === "dark") ? darkham : ham)} className='h-8' alt="" />
                </div>
                <Logo className='h-10 cursor-pointer' onClick={handleHome} />
            </div>

            <div className='flex items-center justify-center gap-2 shrink-0'>
                <div
                    className="h-5 w-12 rounded-full flex items-center bg-secondary shadow relative cursor-pointer"
                    onClick={handleTheme}
                >
                    <img
                        src={theme === "dark" ? moon : sun}
                        alt=""
                        className={`h-[20px] p-[1px] rounded-full absolute transition-all duration-1000 ${theme === "dark" ? 'translate-x-[24px] rotate-360' : 'translate-x-[2px] -rotate-360'
                            }`}
                    />
                </div>
                <Show when="signed-out">
                    <SignInButton mode="modal">
                        <button className="h-8 w-25 rounded-md bg-primary hover:scale-95 text-primary-foreground text-sm font-semibold duration-200 ease-in-out cursor-pointer">
                            Sign In
                        </button>
                    </SignInButton>
                </Show>
                    <Show when="signed-in">
                        <UserButton />
                    </Show>

            </div>
        </div>
    );
};

export default Nav;
