import React, { useContext, useEffect, useState } from 'react';
import ModeContext from '../context/context.js';
import { useNavigate } from 'react-router';
const Card = ({ w, name, svg, darksvg }) => {
    const navigate = useNavigate()
    const { mode } = useContext(ModeContext);

    const handelCreate = () => {
        navigate(`/workspace?type=${name}`)
    }

    return (
        <div
            className={'min-h-60 w-50 rounded-md relative p-1 box-border bg-primary-card text-primary-card-text dark:bg-primary-dark-card shadow-lg dark:text-primary-dark-card-text hover:shadow-[5px_5px_20px_#1A2A43]/40 dark:hover:shadow-[5px_5px_20px_#485474] my-4 flex flex-col items-center justify-center gap-5 transition-all duration-500 ease-out cursor-pointer ' + (w < 750 ? 'w-75 min-h-70' : ' ')}
            onClick={() => { handelCreate() }}
        >
            <div className={" h-35 w-48 flex items-center justify-center" + (w < 750 ? " h-45 w-55" : "")}>
                <img src={mode === "dark" ? darksvg : svg} className="h-full" alt="" />
            </div>

            <div className="rounded-md text-2xl font-semibold bottom-8 w-48">
                {name}
            </div>

        </div>
    );
};

export default Card;
