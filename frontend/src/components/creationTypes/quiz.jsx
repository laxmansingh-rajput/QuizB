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
    const [list, setlist] = useState([{ question: "", options: ["", "", ""], correct: [false, false, false] }]);
    const [type, settype] = useState(false)
    const [err, seterr] = useState("")
    const [qno, setqno] = useState(1)
    const Arr = ['A', 'B', 'C', 'D']
    useEffect(() => {
        console.log(list)

    }, [list])

    const QuestionHandeler = (e) => {
        const updatedList = [...list];
        updatedList[qno - 1].question = e.target.value;
        setlist(updatedList)
    }
    const optionHandeler = (e, index) => {
        const updatedList = [...list];
        updatedList[qno - 1].options[index] = e.target.value;
        setlist(updatedList);
    }
    const generateErr = (txt) => {
        seterr(txt);
        setTimeout(() => {
            seterr("")
        }, 3000);
    }
    const handelRemoveOption = (i) => {
        const updatedList = [...list];
        if (updatedList[qno - 1].options.length <= 2) {
            generateErr('Question should have minimum two options')
        } else {
            updatedList[qno - 1].options.splice(i, 1)
            updatedList[qno - 1].correct.splice(i, 1)
            setlist(updatedList)
        }
    }
    const handelAddOption = (i) => {
        const updatedList = [...list];
        if (updatedList[qno - 1].options.length == 4) {
            generateErr('Max options created')
        } else {
            updatedList[qno - 1].options.push("")
            updatedList[qno - 1].correct.push(false)
            setlist(updatedList)
        }
    }
    const handelCorrect = (e) => {
        console.log(e.target.value)
        const correct = list[qno - 1].correct;
        if (type) {
        correct.forEach(element => {
            
        });
        } else {

        }
    }

    return (
        <div className='h-[100vh]  bg-[#F4F9FF] text-xl text-[#1A1A1A] dark:bg-primary-dark dark:text-[#A0A0B2]  box-border pt-17  p-2 overflow-y-auto
        grid grid-cols-[85vw_12vw] grid-rows-[9fr_1fr]  gap-4 '>
            <div className='border-2 h-full  row-start-1 col-start-1 col-end-2  p-2 box-border rounded-xl relative flex flex-col gap-15'>
                <textarea className="question h-20 max-h-25   w-full border-b-2  p-1 focus:outline-none resize-none" placeholder="Enter The Question"
                    value={`${list[qno - 1].question}`} maxLength={150} onChange={(e) => { QuestionHandeler(e) }} >
                </textarea>
                <div className="options flex flex-col h-2/3  w-full items-center justify-around  gap-5 ">
                    <div className='flex flex-col gap-5 w-1/2 h-80 relative '>
                        {
                            list[qno - 1].options.map((opt, i) => (
                                <div key={i} className='h-10 w-full rounded-xl border-1 p-1 flex items-center'>
                                    <input type="text" className='h-full w-full focus:outline-none ' placeholder={`Enter option ${i + 1}`} value={`${list[qno - 1].options[i]}`} onChange={(e) => optionHandeler(e, i)} />
                                    <img src={cross} className='h-6 cursor-pointer' onClick={() => { handelRemoveOption(i) }} alt="" />
                                </div>
                            ))
                        }
                        <div className=' w-full absolute bottom-12 border-1 h-10 flex items-center justify-around'>
                            {
                                list[qno - 1].options.map((checked, i) => (
                                    <div className='flex items-center justify-center gap-1 text-ms'>
                                        <input type={type ? "radio" : "checkbox"} value={i} name='curr' defaultChecked={checked} onChange={(e, i) => handelCorrect(e)}
                                        />
                                        <div >{Arr[i]}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='  text-red-600 w-full absolute bottom-2'>
                            {`${err}`}
                        </div>
                    </div>
                    <button type="button" className=' bg-[#4A90E2]  hover:bg-[#357ABD] text-white dark:bg-[#4C9AFF] dark:hover:bg-[#72B5FF] text-xl transition-colors duration-500 ease-in-out cursor-pointer rounded-md px-3 py-1 relative ' onClick={() => { handelAddOption() }}>
                        Add Option
                    </button>
                </div>
                <div className="correctOptions">

                </div>
                <div className='absolute bottom-2 left-2 font-bold'>
                    {`Q.${qno}`}
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
