import React, { useEffect, useState, useRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import ModeContext from '../../context/context.js';
import single from '../../assets/s.svg'
import multiple from '../../assets/m.svg'
import cross from '../../assets/cross.svg'
import ToolBar from './toolBar.jsx';
import Questions from './questionBar.jsx'
import useQuizState from './quizFunction/useQuizState.js';
import {
    QuestionHandeler1, optionHandeler1,
    generateErr1, handelRemoveOption1,
    handelAddOption1, handelCorrect1
} from './quizFunction/quizHandler.js';
const quiz = () => {
    const { list, setlist,
        err, seterr,
        qno, setqno,
        adjustment, setadjustment,
        type, settype,
        verticalLayout, setVerticalLayout,
        horizontalLayout, setHorizontalLayout,
        draggedItem, setDraggedItem,
        Arr,
        height, setheight,
        x, setx,
        y, sety,
        Visible, setVisible,
        animate, setanimate } = useQuizState();
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


    const QuestionHandeler = (e) => QuestionHandeler1(e, list, setlist, qno)
    const optionHandeler = (e, index) => optionHandeler1(e, index, list, setlist, qno)
    const generateErr = (txt) => generateErr1(txt, seterr)
    const handelRemoveOption = (i) => handelRemoveOption1(i, list, generateErr, setlist, qno)
    const handelAddOption = (i) => handelAddOption1(i, list, setlist, generateErr, qno)
    const handelCorrect = (e) => handelCorrect1(e, list, qno, setlist,type)


    const handleDragStart = (e, boxName) => {
        setDraggedItem(boxName);
        e.dataTransfer.effectAllowed = 'move';
        const img = document.createElement("img");
        img.src =
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==";
        e.dataTransfer.setDragImage(img, 0, 0);
        setVisible(true)
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
        setVisible(false)
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
        setVisible(false)
    }
    const handleDragEnd = () => {
        setDraggedItem(null);
        setadjustment(null)
        setVisible(false)
        setanimate(false)
    }
    const animation = () => {
        return animate ? 'translate-y-0 scale-x-100' : "-translate-y-3  scale-x-0 ";
    }
    const animation2 = () => {
        return animate ? 'translate-y-0 scale-x-100' : "translate-y-3  scale-x-0 ";
    }
    const vertical = {
        'top': (<div ref={blockRef} className="up h-9/10 w-full  text-primary-text dark:text-primary-dark-text/60 ">
            <div draggable className='border-1 max-h-full h-full  row-start-1 col-start-1 col-end-2  p-2 box-border rounded-md relative flex flex-col gap-15'
                onDragStart={(e) => handleDragStart(e, 'top')}
                onDragEnd={handleDragEnd}
                onDragEnter={console.log("Enter")}
                onDragOver={() => setanimate(false)}
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
                    <button type="button" className=' bg-primary-button
                     text-white dark:bg-primary-dark-button hover:scale-95  
                     text-sm font-semibold transition-all duration-500 ease-in-out cursor-pointer rounded-md px-3
                      py-1 relative ' onClick={() => { handelAddOption() }}>
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
                        <img src={type == true ? single : multiple} className={`select-none h-full transition-transform duration-100 ease-in-out transform ${type == true ? "translate-x-0" : "translate-x-[20px]"} `} alt="" />
                    </div>
                </div>
            </div>
        </div>)
        ,
        'bottom': (
            <div className='down h-1/10  w-full relative text-primary-text dark:text-primary-dark-text/60 '
                onDrop={(e) => handelDropVertical(e, 'bottom')}
                onDragOver={(e) => {
                    handleDragOver(e, 'vertical')
                }}
                onDragEnter={
                    () => {
                        if (animate == false)
                            setTimeout(() => {
                                setanimate(true);
                            }, 100);
                    }
                }
                onDragLeave={
                    () => setanimate(false)
                }
            >
                {
                    <div style={{ height: height + "px" }}
                        className={` w-full border-2 pointer-events-none border-blue-950   transition-all ease-in-out duration-100 ${(verticalLayout[0] === 'top') ? `bottom-0  ${animation()}` : `top-0 ${animation2()}`} rounded-md absolute ${(adjustment === 'vertical') ? ' opacity-100 scale-100' : " opacity-0 hidden scale-95"}`}>
                        <div className={'h-full w-full bg-blue-400 opacity-10 text-black transition-all ease-in-out duration-100'}>

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
            <div className={'h-full w-9/10 flex flex-col gap-2 relative text-primary-text dark:text-primary-dark-text/60 '}
                onDrop={(e) => handelDropHorizontal(e, 'left')}
                onDragOver={(e) => handleDragOver(e, 'horizontal')}
                onDragLeave={() => { setadjustment(null) }}
                onDrag={(e) => {
                    setx(e.clientX)
                    sety(e.clientY)
                }}
            >
                {
                    <div className={`h-full w-1/10 border-2 pointer-events-none border-blue-950 transition-all ease-in duration-100
                     ${(horizontalLayout[0] === 'left') ? 'left-0' : 'right-0'} rounded-md absolute ${(adjustment === 'horizontal')
                            ? ' opacity-100 scale-100' : "opacity-0 hidden scale-95"}`}>
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
            <div draggable className={'h-full w-1/10 text-primary-text dark:text-primary-dark-text/60 ' + (Visible ? " cursor-pointer " : " ")}
                onDragStart={(e) => handleDragStart(e, 'right')}
                onDragEnd={handleDragEnd}
                onDrag={(e) => {
                    setx(e.clientX)
                    sety(e.clientY)
                }}

            >
                <div className='border-1  h-full w-full rounded-md p-1 '>
                    <ToolBar list={list} setlist={setlist} type={type} settype={settype} qno={qno} setqno={setqno} />
                </div>
            </div>
        )
    }


    return (
        <div className='h-[100vh] relative w-[100vw] bg-primary text-xl text-primary-text dark:bg-primary-dark 
        dark:text-dark-card-text  box-border pt-18  p-2 
        overflow-hidden'>
            <div className={`h-full w-full flex items-center justify-center gap-2  `}>
                {
                    horizontalLayout.map((box) => (
                        horizontal[box]
                    ))
                }
            </div >
            <div className=' tools hidden'></div>
            {
                (Visible == true) ? (<div className='absolute h-full w-full top-0 left-0 pointer-events-none bg-primary/20 dark:bg-primary-dark/20 pt-15'>
                    <div className='h-2 top-15 w-full flex items-center absolute justify-center'>
                        <div className=' h-full w-50 bg-primary-button dark:bg-primary-dark-button border-1  rounded-b-full '>

                        </div>
                    </div>
                    <div className='h-2 bottom-0 w-full flex items-center absolute justify-center'>
                        <div className=' h-full w-50 bg-primary-button dark:bg-primary-dark-button border-1  rounded-t-full '>

                        </div>
                    </div>
                    <div className='h-full left-0 w-2 flex items-center absolute justify-center'>
                        <div className=' h-50 w-full bg-primary-button dark:bg-primary-dark-button border-1  rounded-r-full '>

                        </div>
                    </div>
                    <div className='h-full right-0 w-2 flex items-center absolute justify-center'>
                        <div className=' h-50 w-full bg-primary-button dark:bg-primary-dark-button border-1  rounded-l-full '>

                        </div>
                    </div>
                </div>
                ) : (null)
            }
            {
                (Visible == true) ? <div className='px-2 py-0.5 absolute opacity-100 border-1 rounded-md text-primary-text dark:text-primary-dark-text '
                    style={{ left: x + "px", top: y + "px" }}
                >
                    Name
                </div> : (null)
            }
        </div >
    );
};

export default quiz;
