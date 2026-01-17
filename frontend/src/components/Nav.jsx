import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import sun from '../assets/sun.svg';
import moon from '../assets/moon.svg';
import qb from '../assets/quizB.svg'
import ham from '../assets/ham.svg'
import darkham from '../assets/darkham.svg'
import ModeContext from '../context/context.js'
import leftA from '../assets/lightLeft.svg'
import darkleftA from '../assets/darkArrow.svg'
const Nav = ({ hide }) => {
    const { mode, setmode , show, setshow } = useContext(ModeContext)

    const navigate = useNavigate()

    const handleHome = () => {
        navigate('/')
    }
    const handleLogin = () => {
        navigate('/login')
    }

    const handleMode = () => {
        setmode(prev => (prev === "dark" ? "light" : "dark"));
    };
    const handleShow = () => {
        if (!hide) {
            if (show === "show") {
                setshow("dontShow")
                localStorage.setItem("side", "dontshow")
            }
            else {
                setshow("show");
                localStorage.setItem("side", "show")
            }
        } else {
            navigate("/create")
        }
    }
    return (

            <div className=' w-[100vw] h-15  bg-primary  dark:bg-primary-dark  text-primary-dark-text  fixed top-0 left-0 
        z-50 flex items-center justify-between gap-0 p-3 box-border transition-colors duration-500 ease-in-out shadow dark:shadow-amber-50'>
                <div className=' flex items-center justify-center gap-2 shrink-0 '>
                    <div className='text-primary-text rounded-full h-10 w-10  flex items-center justify-center transition-colors duration-100 ease-in hover:bg-[#E0F0FF] dark:hover:bg-[#29293e]' onClick={handleShow}>
                        <img src={(hide) ? ((mode === "dark") ? darkleftA : leftA) : ((mode === "dark") ? darkham : ham)} className='h-8' alt="" />
                    </div>
                    <img src={qb} className='h-10' alt="" onClick={handleHome} />
                </div>

                <div className='flex items-center justify-center gap-2 shrink-0'>
                    <div
                        className="h-5 w-12 rounded-full flex items-center  bg-white shadow dark:bg-gray-200 relative cursor-pointer"
                        onClick={handleMode}
                    >
                        <img
                            src={mode === "dark" ? moon : sun}
                            alt=""
                            className={`h-[20px] p-[1px] rounded-full absolute transition-all duration-1000 ${mode === "dark" ? 'translate-x-[24px] rotate-360' : 'translate-x-[2px] -rotate-360'
                                }`}
                        />
                    </div>
                    <button className=' h-8 w-25 rounded-md bg-primary-button  hover:scale-95  text-white dark:bg-primary-dark-button text-sm font-semibold  duration-200 ease-in-out  cursor-pointer' onClick={handleLogin}>
                        Login
                    </button>
                </div>
            </div>
    );
};

export default Nav;
