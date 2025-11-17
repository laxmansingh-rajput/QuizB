import React from 'react'
import { useContext } from 'react';
import ModeContext from '../context/context.js'
const Faq = () => {
    const { mode, show } = useContext(ModeContext);
    return (
        <div className='h-[100vh] w-[100vw] fixed left-0 bg-[#F4F9FF] text-xl text-[#1A1A1A] dark:bg-primary-dark dark:text-[#F1F1F1]'>

            <div className={'h-full w-8/10 pt-11  bg-[#F4F9FF] text-xl text-[#1A1A1A] dark:bg-primary-dark dark:text-[#F1F1F1] transition-all duration-500 ease-in-out fixed right-0 ' + ((show != "show") ? 'w-full' : '')
            }>
                faq
            </div >
        </div>
    )
}

export default Faq