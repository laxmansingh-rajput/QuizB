import React from 'react'
import { useContext } from 'react';
import ModeContext from '../../../context/context.js';
const Icons = ({ name, svg, dark, onClick }) => {
    const { mode } = useContext(ModeContext);

    return (
        <div className='h-14 w-30 rounded-xl border border-border relative text-sm font-semibold bg-card text-foreground shadow-soft hover:shadow-card hover:bg-secondary/40 hover:scale-95 transition-all duration-280 ease-out cursor-pointer' onClick={onClick}>
            <div className='w-full h-5 absolute top-2 flex items-center justify-center'>
                <img src={(mode == "dark") ? dark : svg} className='h-5 w-1/2' alt="" />
            </div>
            <div className='absolute w-full bottom-2 h-4 '>{name}</div>
        </div>
    )
}

export default Icons