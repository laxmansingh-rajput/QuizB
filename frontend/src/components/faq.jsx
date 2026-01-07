import React from 'react'
import { useContext } from 'react';
import ModeContext from '../context/context.js'
const Faq = () => {
    const { mode, show } = useContext(ModeContext);
    return (
        <div className='h-[100vh] w-[100vw] fixed left-0 bg-primary text-xl text-primary-text dark:bg-primary-dark text-primary-dark-text'>

            <div className={'h-full w-8/10 pt-11  bg-primary text-xl text-primary-text dark:bg-primary-dark text-primary-dark-text transition-all duration-500 ease-in-out fixed right-0 ' + ((show != "show") ? 'w-full' : '')
            }>
                faq
            </div >
        </div>
    )
}

export default Faq