import React, { useContext, useEffect } from 'react'
import join from '../assets/Join.svg'
import home from '../assets/Home.svg'
import Practice from '../assets/Practice.svg'
import prem from '../assets/prem.svg'
import create from '../assets/create.svg'
import faq from '../assets/faq.svg'
import darkfaq from '../assets/darkfaq.svg'
import darkprem from '../assets/darkprem.svg'
import darkpractice from '../assets/darkpractice.svg'
import darkjoin from '../assets/darkjoin.svg'
import darkhome from '../assets/darkhome.svg'
import darkcreate from '../assets/darkcreate.svg'
import creation from '../assets/creation.svg'
import darkcreation from '../assets/darkcreation.svg'
import ModeContext from '../context/context.js'

import { useNavigate } from 'react-router'
const SideBar = ({ curr }) => {
    const navigate = useNavigate();
    const { mode, show } = useContext(ModeContext);

    const handelHome = () => {
        navigate('/')
    }
    const handelJoin = () => {
        navigate('/join')
    }
    const handelCreate = () => {
        navigate('/create')
    }
    const handelPremium = () => {
        navigate('/premium')
    }
    const handelpractice = () => {
        navigate('/practice')
    }
    const handelFaq = () => {
        navigate('/faq')
    }
    const handelCreation = () => {
        navigate('/creation')
    }
    return (
        <>
            <div className={'h-full max-[650px]:w-3/4 max-[750px]:w-1/2 max-[950px]:w-1/4 w-2/10 border-black fixed left-0 pt-16 pl-3 pr-3 flex flex-col gap-4 bg-[#F4F9FF] text-xl text-[#1A1A1A] '
                + 'dark:bg-primary-dark dark:text-[#F1F1F1] transition-all duration-500 ease-in-out z-45 shadow dark:shadow-amber-50' + ((show != "show") ?
                    " w-0 hidden " : "")}>

                <div className='relative p-2'>
                    <div className='flex items-center justify-start gap-3 cursor-pointer' onClick={handelHome}>
                        <div className={'border-1 rounded-md transition-all duration-500 ease-in-out h-7 w-0 absolute left-0 ' + ((curr === "home") ? "w-full h-10 border-[1px] text-[#5F6A7D] " : "")}></div>
                        <img src={(mode === "dark") ? darkhome : home} className="h-7 transition-all duration-500 ease-in-out" alt="" />Home
                    </div>
                </div>

                <div className='relative p-2'>
                    <div className='flex items-center justify-start gap-3 cursor-pointer' onClick={handelCreate}>
                        <div className={'border-1 rounded-md transition-all duration-500 ease-in-out h-7 w-0 absolute left-0 ' + ((curr === "create") ? "w-full h-10 border-[1px]  text-[#5F6A7D]" : "")}></div>
                        <img src={(mode === "dark") ? darkcreate : create} className="h-7 transition-all duration-500 ease-in-out" alt="" />Create
                    </div>
                </div>

                <div className='relative p-2'>
                    <div className='flex items-center justify-start gap-3 cursor-pointer' onClick={handelJoin}>
                        <div className={'border-1 rounded-md transition-all duration-500 ease-in-out h-7 w-0 absolute left-0 ' + ((curr === "join") ? "w-full h-10 border-[1px] text-[#5F6A7D]" : "")}></div>
                        <img src={(mode === "dark") ? darkjoin : join} className="h-7 transition-all duration-500 ease-in-out" alt="" />Join
                    </div>
                </div>

                <div className='relative p-2'>
                    <div className='flex items-center justify-start gap-3 cursor-pointer' onClick={handelpractice}>
                        <div className={'border-1 rounded-md transition-all duration-500 ease-in-out h-7 w-0 absolute left-0 ' + ((curr === "practice") ? "w-full h-10 border-[1px] text-[#5F6A7D]" : "")}></div>
                        <img src={(mode === "dark") ? darkpractice : Practice} className="h-7 transition-all duration-500 ease-in-out" alt="" />Practice
                    </div>
                </div>

                <div className='relative p-2'>
                    <div className='flex items-center justify-start gap-3 cursor-pointer' onClick={handelCreation}>
                        <div className={'border-1 rounded-md transition-all duration-500 ease-in-out h-7 w-0 absolute left-0 ' + ((curr === "creation") ? "w-full h-10 border-[1px] text-[#5F6A7D]" : "")}></div>
                        <img src={(mode === "dark") ? darkcreation : creation} className="h-7 transition-all duration-500 ease-in-out" alt="" />My Creation
                    </div>
                </div>

                <div className='relative p-2'>
                    <div className='flex items-center justify-start gap-3 cursor-pointer' onClick={handelPremium}>
                        <div className={'border-1 rounded-md transition-all duration-500 ease-in-out h-7 w-0  absolute left-0 ' + ((curr === "premium") ? "w-full h-10 border-[1px] text-[#5F6A7D]" : "")}></div>
                        <img src={(mode === "dark") ? darkprem : prem} className="h-7 transition-all duration-500 ease-in-out" alt="" />Premium
                    </div>
                </div>

                <div className='relative p-2'>
                    <div className='flex items-center justify-start gap-3 cursor-pointer' onClick={handelFaq}>
                        <div className={'border-1 rounded-md transition-all duration-500 ease-in-out h-7 w-0  absolute left-0 ' + ((curr === "faq") ? "w-full h-10 border-[1px] text-[#5F6A7D]" : "")}></div>
                        <img src={(mode === "dark") ? darkfaq : faq} className="h-7 transition-all duration-500 ease-in-out" alt="" />FAQ
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar
