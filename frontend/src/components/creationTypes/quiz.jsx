import React, { useEffect, useState, useRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import ModeContext from '../../context/context.js';
import single from '../../assets/s.svg'
import multiple from '../../assets/m.svg'
import cross from '../../assets/cross.svg'
import ToolBar from './toolBar.jsx';
import Questions from './questionBar.jsx'
import { useEffectEvent } from 'react';
const quiz = () => {
    const { mode, setshow, show } = useContext(ModeContext);
    const location = useLocation();
    const [list, setlist] = useState(() => {
        const lista = localStorage.getItem('list');
        if (lista) {
            try {
                return JSON.parse(lista);
            } catch (err) {
                console.error("Error parsing list from localStorage", err);
            }
        }
        return [{ question: "", options: ["", "", ""], correct: [false, false, false], type: true }]
    });
    const [err, seterr] = useState("")
    const [qno, setqno] = useState(list.length > 2 ? list.length : 1);
    const [adjustment, setadjustment] = useState(null)
    const [type, settype] = useState(list[qno - 1].type);
    const [verticalLayout, setVerticalLayout] = useState(['top', 'bottom'])
    const [horizontalLayout, setHorizontalLayout] = useState(['left', 'right'])
    const [draggedItem, setDraggedItem] = useState(null)
    const Arr = ['A', 'B', 'C', 'D']
    const [height, setheight] = useState(null)
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list));
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
            correct.forEach((value, index) => {
                if (index == e.target.value) {
                    correct[index] = !value;
                    console.log(!value)
                } else { correct[index] = false; }
            });
        } else {
            correct.forEach((value, index) => {
                if (index == e.target.value) {
                    correct[index] = !value;
                    console.log(!value)
                }
            });
        }
        const updatedList = [...list]
        updatedList[qno - 1].correct = [...correct];
        setlist(updatedList)
    }
    const handleDragStart = (e, boxName) => {
        setDraggedItem(boxName);
        console.log(boxName)
        e.dataTransfer.effectAllowed = 'move';
    }
    const handleDragOver = (e, block) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (block == 'horizontal' && draggedItem == 'right') {
            setadjustment('horizontal')
        }
        if (block == 'vertical' && draggedItem) {
            setadjustment('vertical')
        }
    }
    const handelDropHorizontal = (e, dropTarget) => {
        e.preventDefault();
        if (draggedItem == 'right') {
            const copy = [...horizontalLayout]
            console.log(copy)
            let ind1 = copy.indexOf(dropTarget)
            let ind2 = copy.indexOf(draggedItem)
            console.log('drop = ' + draggedItem + ind2)
            console.log('over = ' + dropTarget + ind1)
            console.log(copy)
            let temp = copy[ind1]
            copy[ind1] = copy[ind2]
            copy[ind2] = temp
            console.log(copy)
            setHorizontalLayout(copy)
        }
        setDraggedItem(null);
        setadjustment(null)
    }
    const handelDropVertical = (e, dropTarget) => {
        e.preventDefault();
        if (draggedItem == 'top') {
            const copy = [...verticalLayout]
            console.log(copy)
            let ind1 = copy.indexOf(dropTarget)
            let ind2 = copy.indexOf(draggedItem)
            console.log('drop = ' + draggedItem + ind2)
            console.log('over = ' + dropTarget + ind1)
            console.log(copy)
            let temp = copy[ind1]
            copy[ind1] = copy[ind2]
            copy[ind2] = temp
            console.log(copy)
            setVerticalLayout(copy)
        }
        setDraggedItem(null);
        setadjustment(null)
    }
    const handleDragEnd = () => {
        setDraggedItem(null);
        setadjustment(null)
    }
    const blockRef = useRef()
    useEffect(() => {
        const handleResize = () => {
            if (blockRef.current) {
                setheight(blockRef.current.offsetHeight);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const vertical = {
        'top': (<div ref={blockRef} className="up h-9/10 w-full">
            <div draggable className='border-2 max-h-full h-full  row-start-1 col-start-1 col-end-2  p-2 box-border rounded-md relative flex flex-col gap-15'
                onDragStart={(e) => handleDragStart(e, 'top')}
                onDragEnd={handleDragEnd}
            >
                <textarea className="question h-20 max-h-25   w-full border-b-2  p-1 focus:outline-none resize-none" placeholder="Enter The Question"
                    value={`${list[qno - 1].question}`} maxLength={150} onChange={(e) => { QuestionHandeler(e) }} >
                </textarea>
                <div className="options flex flex-col h-3/4 gap-2 w-full items-center    ">
                    <div className='flex flex-col gap-3 w-2/3  h-full  relative '>
                        {
                            list[qno - 1].options.map((opt, i) => (
                                <div key={i} className='h-8 w-full text-sm rounded-md border-1 p-1 flex items-center'>
                                    <input type="text" className='h-full w-full focus:outline-none ' placeholder={`Enter option ${i + 1}`} maxLength={150} value={`${list[qno - 1].options[i]}`} onChange={(e) => optionHandeler(e, i)} />
                                    <img src={cross} className='h-5 cursor-pointer' onClick={() => { handelRemoveOption(i) }} alt="" />
                                </div>
                            ))
                        }
                        <div className=' w-full absolute bottom-25 border-1 rounded-md text-sm h-8 flex items-center justify-around'>
                            <div className='font-bold '>Correct answer{type ? "" : "s"}:</div>
                            {
                                list[qno - 1].options.map((checked, i) => (
                                    <div key={i} className='flex items-center justify-center gap-1 text-ms'>
                                        <input type={type ? "radio" : "checkbox"} value={i} name='curr' checked={list[qno - 1].correct[i]}
                                            onChange={(e, i) => handelCorrect(e)}
                                        />
                                        <div >{Arr[i]}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='  text-red-600 w-full text-sm font-bold absolute bottom-10'>
                            {`${err}`}
                        </div>
                    </div>
                </div>
                <div className='h-auto w-full absolute left-0 bottom-2'>
                    <button type="button" className=' bg-[#4A90E2]  hover:bg-[#357ABD] text-white dark:bg-[#4C9AFF] dark:hover:bg-[#72B5FF] text-sm font-semibold transition-colors duration-500 ease-in-out cursor-pointer rounded-md px-3 py-1 relative ' onClick={() => { handelAddOption() }}>
                        Add Option
                    </button>
                </div>
                <div className='absolute bottom-2 left-2 font-bold'>
                    {`Q${qno}.`}
                </div>
                <div className='absolute bottom-2 right-2 w-45 flex items-center justify-around'>
                    <span className='text-sm font-bold'>{(type) ? "Single Choice" : "Multiple Choice"}</span>
                    <div className=' h-[20px] w-[40px] border-[1px] rounded-full flex items-center
                 ' onClick={() => {
                            settype(!type)
                            const updatedList = [...list]
                            updatedList[qno - 1].type = updatedList[qno - 1].type ? false : true
                            setlist(updatedList)
                            settype(updatedList[qno - 1].type ? true : false)
                        }}>
                        <img src={type == true ? single : multiple} className={`select-none h-full transition-transform duration-300 ease-in-out transform ${type == true ? "translate-x-0" : "translate-x-[20px]"} `} alt="" />
                    </div>
                </div>
            </div>
        </div>)
        ,
        'bottom': (
            <div className='down h-1/10  w-full relative'
                onDrop={(e) => handelDropVertical(e, 'bottom')}
                onDragOver={(e) => handleDragOver(e, 'vertical')}
            >
                {
                    <div style={{ height: height + "px" }}
                        className={` w-full border-2 border-blue-950 transition-all ease-in duration-100 ${(verticalLayout[0] === 'top') ? 'bottom-0' : 'top-0'} rounded-md absolute ${(adjustment === 'vertical') ? ' opacity-100 scale-100' : " opacity-0 hidden scale-95"}`}>
                        <div className={'h-full w-full bg-blue-400 opacity-10 '}>

                        </div>
                    </div>
                }
                < div className=' max-h-f-full h-full rounded-md row-start-2 row-end-2 col-start-1 col-end-1 ' >
                    <Questions list={list} setlist={setlist} generateErr={generateErr} type={type} settype={settype} qno={qno} setqno={setqno} />
                </div >
            </div >
        )
    }

    const horizontal = {
        'left': (
            <div className={'h-full w-9/10 flex flex-col gap-2 relative '}
                onDrop={(e) => handelDropHorizontal(e, 'left')}
                onDragOver={(e) => handleDragOver(e, 'horizontal')}
                onDragLeave={() => setadjustment(null)}
            >
                {
                    <div className={`h-full w-1/10 border-2 border-blue-950 transition-all ease-in duration-100
                     ${(horizontalLayout[0] === 'left') ? 'left-0' : 'right-0'} rounded-md absolute ${(adjustment === 'horizontal') ? ' opacity-100 scale-100' : "opacity-0 hidden scale-95"}`}>
                        <div className='h-full w-full bg-blue-400 opacity-10'>

                        </div>
                    </div>
                }
                {
                    verticalLayout.map((box) => (
                        vertical[box]
                    ))
                }
            </div>
        ),
        'right': (
            <div draggable className='h-full w-1/10'
                onDragStart={(e) => handleDragStart(e, 'right')}
                onDragEnd={handleDragEnd}
            >
                <div className='border-2  h-full w-full rounded-md p-1 '>
                    <ToolBar list={list} setlist={setlist} type={type} settype={settype} qno={qno} setqno={setqno} />
                </div>
            </div>
        )
    }


    return (
        <div className='h-[100vh] relative w-[100vw] bg-[#F4F9FF] text-xl text-[#1A1A1A] dark:bg-primary-dark dark:text-[#A0A0B2]  box-border pt-18  p-2 
        '>
            <div className={`h-full w-full flex items-center justify-center gap-2  `}>
                {
                    horizontalLayout.map((box) => (
                        horizontal[box]
                    ))
                }
            </div >
        </div>
    );
};

export default quiz;
