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
            <div className={'h-full max-[650px]:w-3/4 max-[750px]:w-1/2 max-[950px]:w-1/4 w-2/10 fixed left-0 pt-16 pl-3 pr-3 flex flex-col gap-4 bg-card border-r border-border text-xl text-foreground transition-all duration-280 ease-in-out z-45 shadow-soft' + ((show != "show") ?
                    " w-0 hidden " : "")}>

                <div className='relative p-2 rounded-md overflow-hidden'>
                    <div className='flex items-center px-3 justify-start gap-3 cursor-pointer relative z-10' onClick={handelHome}>
                        <div className={'rounded-md transition-all duration-300 h-10 w-full absolute left-0 top-1/2 -translate-y-1/2 -z-10 ' + ((curr === "home") ? "bg-accent border border-primary/30" : "hover:bg-secondary/50")}></div>
                        <img src={(mode === "dark") ? darkhome : home} className="h-7 transition-all duration-300 ease-in-out z-20" alt="" />
                        <span className="z-20 font-medium">Home</span>
                    </div>
                </div>

                <div className='relative p-2 rounded-md overflow-hidden'>
                    <div className='flex items-center px-3 justify-start gap-3 cursor-pointer relative z-10' onClick={handelCreate}>
                        <div className={'rounded-md transition-all duration-300 h-10 w-full absolute left-0 top-1/2 -translate-y-1/2 -z-10 ' + ((curr === "create") ? "bg-accent border border-primary/30" : "hover:bg-secondary/50")}></div>
                        <img src={(mode === "dark") ? darkcreate : create} className="h-7 transition-all duration-300 ease-in-out z-20" alt="" />
                        <span className="z-20 font-medium">Create</span>
                    </div>
                </div>

                <div className='relative p-2 rounded-md overflow-hidden'>
                    <div className='flex items-center px-3 justify-start gap-3 cursor-pointer relative z-10' onClick={handelJoin}>
                        <div className={'rounded-md transition-all duration-300 h-10 w-full absolute left-0 top-1/2 -translate-y-1/2 -z-10 ' + ((curr === "join") ? "bg-accent border border-primary/30" : "hover:bg-secondary/50")}></div>
                        <img src={(mode === "dark") ? darkjoin : join} className="h-7 transition-all duration-300 ease-in-out z-20" alt="" />
                        <span className="z-20 font-medium">Join</span>
                    </div>
                </div>

                <div className='relative p-2 rounded-md overflow-hidden'>
                    <div className='flex items-center px-3 justify-start gap-3 cursor-pointer relative z-10' onClick={handelpractice}>
                        <div className={'rounded-md transition-all duration-300 h-10 w-full absolute left-0 top-1/2 -translate-y-1/2 -z-10 ' + ((curr === "practice") ? "bg-accent border border-primary/30" : "hover:bg-secondary/50")}></div>
                        <img src={(mode === "dark") ? darkpractice : Practice} className="h-7 transition-all duration-300 ease-in-out z-20" alt="" />
                        <span className="z-20 font-medium">Practice</span>
                    </div>
                </div>

                <div className='relative p-2 rounded-md overflow-hidden'>
                    <div className='flex items-center px-3 justify-start gap-3 cursor-pointer relative z-10' onClick={handelCreation}>
                        <div className={'rounded-md transition-all duration-300 h-10 w-full absolute left-0 top-1/2 -translate-y-1/2 -z-10 ' + ((curr === "creation") ? "bg-accent border border-primary/30" : "hover:bg-secondary/50")}></div>
                        <img src={(mode === "dark") ? darkcreation : creation} className="h-7 transition-all duration-300 ease-in-out z-20" alt="" />
                        <span className="z-20 font-medium">My Creation</span>
                    </div>
                </div>

                <div className='relative p-2 rounded-md overflow-hidden'>
                    <div className='flex items-center px-3 justify-start gap-3 cursor-pointer relative z-10' onClick={handelPremium}>
                        <div className={'rounded-md transition-all duration-300 h-10 w-full absolute left-0 top-1/2 -translate-y-1/2 -z-10 ' + ((curr === "premium") ? "bg-accent border border-primary/30" : "hover:bg-secondary/50")}></div>
                        <img src={(mode === "dark") ? darkprem : prem} className="h-7 transition-all duration-300 ease-in-out z-20" alt="" />
                        <span className="z-20 font-medium">Premium</span>
                    </div>
                </div>

                <div className='relative p-2 rounded-md overflow-hidden'>
                    <div className='flex items-center px-3 justify-start gap-3 cursor-pointer relative z-10' onClick={handelFaq}>
                        <div className={'rounded-md transition-all duration-300 h-10 w-full absolute left-0 top-1/2 -translate-y-1/2 -z-10 ' + ((curr === "faq") ? "bg-accent border border-primary/30" : "hover:bg-secondary/50")}></div>
                        <img src={(mode === "dark") ? darkfaq : faq} className="h-7 transition-all duration-300 ease-in-out z-20" alt="" />
                        <span className="z-20 font-medium">FAQ</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar
