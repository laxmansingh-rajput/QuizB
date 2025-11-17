import React, { useContext, useState } from 'react';
import ModeContext from '../context/context.js';
import { useNavigate } from 'react-router';
const Card = ({ name, svg, darksvg, option1, option2 }) => {
    const navigate = useNavigate()
    const [button, setButton] = useState(false);
    const { mode } = useContext(ModeContext);
    const [type, settype] = useState(null)
    const [option, setoption] = useState(null)

    const buttonHandel = () => {
        if (name === "Use AI") {
            setButton(false);
        } else {
            if (type == null) {
                settype(name)
            } else {
                settype(null)
            }
            setButton(!button);
        }
    };
    const handelCreate = (name) => {
        let a = "o1"
        setoption("o1")
        navigate(`/workspace?type=${name}`)
    }

    return (
        <div
            className="min-h-60 w-50 rounded-xl relative p-1 box-border bg-[#E0F0FF] text-[#5F6A7D] dark:bg-[#1F1F2F] shadow-2xl dark:text-[#A0A0B2] hover:shadow-[#1A2A43] dark:hover:shadow-[#485474] transition-all duration-300 ease-out cursor-pointer"
            onClick={(name) => { handelCreate(name) }}
        >
            <div className="absolute top-5 h-35 w-48 flex items-center justify-center">
                <img src={mode === "dark" ? darksvg : svg} className="h-full" alt="" />
            </div>

            <div className="rounded-xl text-2xl font-semibold absolute h-10 bottom-8 w-48">
                {name}
            </div>

        </div>
    );
};

export default Card;
