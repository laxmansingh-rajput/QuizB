import React from 'react'
import { useContext } from 'react';
import ModeContext from '../../context/context.js';
const Icons = ({ name, svg, dark }) => {
    const { mode } = useContext(ModeContext);
   
        return (
            <div className='h-12 w-25 rounded-md border relative  text-sm font-medium bg-[#d6edff] text-[#5F6A7D] dark:bg-[#30303d] 
        shadow-md  dark:text-[#A0A0B2] hover:shadow-[#1A2A43] dark:hover:shadow-[#485474] transition-all duration-300 ease-out cursor-pointer '>
                <div className='w-full h-5 absolute top-1 flex items-center justify-center'>
                    <img src={(mode == "dark") ? dark : svg} className='h-full w-1/2' alt="" />
                </div>
                <div className='absolute w-full bottom-1 h-4 '>{name}</div>
            </div>
        )
    }

    export default Icons