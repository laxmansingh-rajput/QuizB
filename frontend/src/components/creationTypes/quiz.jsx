import React, { useEffect, useState, useRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import ModeContext from '../../context/context.js';
import single from '../../assets/s.svg'
import multiple from '../../assets/m.svg'
import cross from '../../assets/cross.svg'
const quiz = () => {
    const [toolbar, settoolbar] = useState(true)
    const { mode, setshow, show } = useContext(ModeContext);
    const location = useLocation();
    const [list, setlist] = useState([]);
    const [current, setcurrent] = useState({ question: "", options: ["", "", "", ""], correct: ["", "", ""] })
    const [type, settype] = useState(false)
    const [err,seterr]=useState("Max Options Created")
    return (
        <div className='min-h-[100vh]  bg-[#F4F9FF] text-xl text-[#1A1A1A] dark:bg-primary-dark dark:text-[#A0A0B2]  box-border pt-17  p-2 overflow-y-auto
        grid grid-cols-[85vw_12vw] grid-rows-[9fr_1fr]  gap-4 '>
            <div className='border-2 h-full  row-start-1 col-start-1 col-end-2  p-2 box-border rounded-xl relative flex flex-col gap-15'>
                <textarea className="question h-20 max-h-25   w-full border-b-2  p-1  resize-none" placeholder="Enter The Question" maxLength={150}>
                </textarea>
                <div className="options flex flex-col h-2/3  w-full items-center justify-around  gap-5 ">
                    <div className='flex flex-col gap-5 w-1/2 h-8/10 '>
                    {
                        current.options.map((opt, i) => (
                            <div className='h-10 w-full rounded-xl border-1 p-1 flex items-center'>
                                <input type="text" className='h-full w-full focus:outline-none ' placeholder={`Enter option ${i + 1}`} value={`${opt}`} />
                                <img src={cross} className='h-6 cursor-pointer' alt="" />
                            </div>
                        ))
                    }
                    </div>
                    <button type="button" className=' bg-[#4A90E2]  hover:bg-[#357ABD] text-white dark:bg-[#4C9AFF] dark:hover:bg-[#72B5FF] text-xl transition-colors duration-500 ease-in-out cursor-pointer rounded-md px-3 py-1 '>Add Option</button>
                </div>
                <div className="correctOptions">

                </div>
                <div className='absolute bottom-2 right-2 w-45 flex items-center justify-around'>
                    <span className='text-sm font-bold'>{(type) ? "Single Choice" : "Multiple Choice"}</span>
                    <div className=' h-[20px] w-[40px] border-[1px] rounded-full flex items-center
                 ' onClick={() => { settype(!type) }}>
                        <img src={type == true ? single : multiple} className={`select-none h-full transition-transform duration-300 ease-in-out transform ${type == true ? "translate-x-0" : "translate-x-[20px]"} `} alt="" />
                    </div>
                </div>
            </div>
            <div className='border-2  row-start-1 row-end-3 rounded-xl '>
                hello
            </div>
            <div className='border-2 h-full rounded-xl '>

            </div>
        </div>
    );
};

export default quiz;
