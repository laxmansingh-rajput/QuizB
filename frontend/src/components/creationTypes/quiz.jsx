import React, { useEffect, useState, useRef, useContext } from 'react';
import ToolBar from './quizComponent/toolBar.jsx';
import Questions from './quizComponent/questionBar.jsx'
import useQuizState from './quizFunction/useQuizState.js';
import Question from './quizComponent/Question.jsx';
import useDrag from './dragAndDrop/useDrag.js';
import { handleDragStart1, handleDragOver1, handleDrop1, handleDragEnd1 } from './dragAndDrop/dragFunctions.js'
import {
    QuestionHandeler1, optionHandeler1,
    generateErr1, handelRemoveOption1,
    handelAddOption1, handelCorrect1,
    animation3, animation4
} from './quizFunction/quizHandler.js';


const quiz = () => {
    const { list, setlist, err, seterr, qno, setqno,
        type, settype, Arr, height} = useQuizState();

    const { verticalLayout, setVerticalLayout, adjustment, setadjustment, horizontalLayout, setHorizontalLayout,
        draggedItem, setDraggedItem, x, setx, y, sety, Visible, setVisible,
        animate, setanimate ,blockRef} = useDrag()

    const QuestionHandeler = (e) => QuestionHandeler1(e, list, setlist, qno)
    const optionHandeler = (e, index) => optionHandeler1(e, index, list, setlist, qno)
    const generateErr = (txt) => generateErr1(txt, seterr)
    const handelRemoveOption = (i) => handelRemoveOption1(i, list, generateErr, setlist, qno)
    const handelAddOption = (i) => handelAddOption1(i, list, setlist, generateErr, qno)
    const handelCorrect = (e) => handelCorrect1(e, list, qno, setlist, type)
    const animation = () => animation3(animate)
    const animation2 = () => animation4(animate)

    const handleDragStart = (e, boxName) => handleDragStart1(e, boxName, setDraggedItem, setVisible)
    const handleDragOver = (e, block) => handleDragOver1(e, block, setadjustment, draggedItem, 'quiz')
    const handleDrop = (e, dropTarget, dI, state, setstate) => handleDrop1(e, dropTarget, draggedItem, dI, state, setstate, setDraggedItem, setadjustment, setVisible)
    const handleDragEnd = () => handleDragEnd1 = (setDraggedItem, setadjustment, setVisible, setanimate)
        

    const vertical = {
        'top': (<div draggable ref={blockRef} className="up h-9/10 w-full  text-primary-text dark:text-primary-dark-text/60 "
            onDragStart={(e) => handleDragStart(e, 'top')}
            onDragEnd={handleDragEnd}
            onDragEnter={console.log("Enter")}
            onDragOver={() => setanimate(false)}>
            <Question
                list={list}
                qno={qno}
                type={type}
                err={err}
                Arr={Arr}
                setlist={setlist}
                settype={settype}
                QuestionHandeler={QuestionHandeler}
                optionHandeler={optionHandeler}
                handelRemoveOption={handelRemoveOption}
                handelAddOption={handelAddOption}
                handelCorrect={handelCorrect}
            />
        </div>)
        ,
        'bottom': (
            <div className='down h-1/10  w-full relative text-primary-text dark:text-primary-dark-text/60 '
                onDrop={(e) => handleDrop(e, 'bottom', 'top', verticalLayout, setVerticalLayout)}
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
                        className={` w-full border-2 pointer-events-none border-blue-950   transition-all ease-in-out duration-100 ${(verticalLayout[0] === 'top') ? `bottom-0  ${animation()}` : `top-0 ${animation2()}`} rounded-md absolute
                        ${(adjustment == 'vertical') ? " " : " hidden"} `}>
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
                onDrop={(e) => handleDrop(e, 'left', 'right', horizontalLayout, setHorizontalLayout)}
                onDragOver={(e) => handleDragOver(e, 'horizontal')}
                onDragLeave={() => { setadjustment(null) }}
                onDrag={(e) => {
                    setx(e.clientX)
                    sety(e.clientY)
                }}
            >
                {
                    <div className={`h-full w-1/10 border-2 pointer-events-none border-blue-950 transition-all ease-in duration-100
                     ${(horizontalLayout[0] === 'left') ? 'left-0' : 'right-0'} rounded-md absolute
                     ${(adjustment == 'horizontal') ? " " : " hidden"}  `}>
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
            <div draggable className={'h-full w-1/10 text-primary-text dark:text-primary-dark-text/60 '
                + (Visible ? " cursor-pointer " : " ")}
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
