import React from 'react'
import { useContext } from 'react';
import ModeContext from '../../../context/context.js';
const Icons = ({ name, svg, dark, onClick }) => {
    const { mode } = useContext(ModeContext);

    return (
        <div className='h-14 w-25 max-[1040px]:w-20 max-[500px]:h-15 max-[500px]:w-15 rounded-xl border border-border relative text-sm font-semibold bg-card text-foreground shadow-soft hover:shadow-card hover:bg-secondary/40 hover:scale-95 transition-all duration-280 ease-out cursor-pointer max-[500px]:flex max-[500px]:items-center max-[500px]:justify-center ' onClick={onClick}>
            <div className='w-full h-5  top-2 min-[501px]:absolute flex items-center justify-center'>
                <img src={(mode == "dark") ? dark : svg} className='h-5 w-1/2' alt="" />
            </div>
            <div className='absolute w-full bottom-2 h-4 text-[12px] max-[1040px]:text-[10px] max-[500px]:hidden '>{name}</div>
        </div>
    )
}

export default Icons