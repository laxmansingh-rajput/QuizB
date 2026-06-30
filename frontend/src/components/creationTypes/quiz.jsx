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
    animation, animation2, animation3, animation4
} from './quizFunction/quizHandler.js';


const quiz = () => {
    const { verticalLayout, setVerticalLayout, adjustment, setadjustment, horizontalLayout, setHorizontalLayout,
        draggedItem, setDraggedItem, x, setx, y, sety, Visible, setVisible,
        animate, setanimate } = useDrag()

    const { list, setlist, err, seterr, qno, setqno,
        type, settype, Arr, height, setheight, blockRef } = useQuizState();

    const QuestionHandeler = (e) => QuestionHandeler1(e, list, setlist, qno)
    const optionHandeler = (e, index) => optionHandeler1(e, index, list, setlist, qno)
    const generateErr = (txt) => generateErr1(txt, seterr)
    const handelRemoveOption = (i) => handelRemoveOption1(i, list, generateErr, setlist, qno)
    const handelAddOption = (i) => handelAddOption1(i, list, setlist, generateErr, qno)
    const handelCorrect = (e) => handelCorrect1(e, list, qno, setlist, type)

    const handleDragStart = (e, boxName) => handleDragStart1(e, boxName, setDraggedItem, setVisible, setanimate)
    const handleDragOver = (e, block) => handleDragOver1(e, block, setadjustment, draggedItem, 'quiz', animate, setanimate)
    const handleDrop = (e, dropTarget, dI, state, setstate) => handleDrop1(e, dropTarget, draggedItem, dI, state, setstate, setDraggedItem, setadjustment, setVisible)
    const handleDragEnd = () => handleDragEnd1(setDraggedItem, setadjustment, setVisible, setanimate)

    const vertical = {
        'top': (<div draggable ref={blockRef} className="up h-9/10 w-full text-foreground"
            onDragStart={(e) => handleDragStart(e, 'top')}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => {
                handleDragOver(e, 'top')
            }}
            onDrag={() => {
                console.log(animate)
                console.log(draggedItem)
            }}
        >
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
            <div className='down h-1/10 w-full relative text-foreground'
                onDrop={(e) => handleDrop(e, 'bottom', 'top', verticalLayout, setVerticalLayout)}
            >

                < div className=' max-h-f-full h-full rounded-md row-start-2 row-end-2 col-start-1 col-end-1 ' >
                    <Questions list={list}
                        setlist={setlist}
                        generateErr={generateErr}
                        type={type}
                        settype={settype}
                        qno={qno} setqno={setqno}
                        Visible={Visible}
                        setVisible={setVisible}
                        animate={animate}
                        setanimate={setanimate}
                        adjustment={adjustment}
                        setadjustment={setadjustment}
                        draggedItem={draggedItem}
                        setDraggedItem={setDraggedItem}
                    />
                </div >
            </div >
        )
    }

    const horizontal = {
        'left': (
            <div className={'h-[calc(100%-80px)] md:h-full w-full md:w-9/10 flex flex-col gap-2 relative text-foreground'}
                onDrop={(e) => handleDrop(e, 'left', 'right', horizontalLayout, setHorizontalLayout)}

                onDrag={(e) => {
                    setx(e.clientX)
                    sety(e.clientY)
                }}

            >
                {
                    <div style={{ height: height + "px" }}
                        className={` w-full border-2 pointer-events-auto border-blue-950   transition-all ease-in-out duration-100 ${(verticalLayout[0] === 'top') ? `bottom-0  ${animation(animate)}` : `top-0 ${animation2(animate)}`} rounded-md absolute
                        ${(adjustment == 'vertical') ? " " : " hidden"} `}>
                        <div className={'h-full w-full bg-blue-400 opacity-10 text-black transition-all ease-in-out duration-100'}>
                        </div>
                    </div>
                }

                {
                    <div className={`h-full w-1/10 border-2 pointer-events-auto border-blue-950 transition-all ease-in duration-100
                     ${(horizontalLayout[0] === 'left') ? `left-0  ${animation3(animate)} ` : `right-0  ${animation4(animate)}`} rounded-md absolute
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
            <div draggable className={'h-20 md:h-full w-full md:w-1/10  text-foreground '
                + (Visible ? " cursor-pointer " : " ")}
                onDragStart={(e) => handleDragStart(e, 'right')}
                onDragEnd={handleDragEnd}
                onDrag={(e) => {
                    setx(e.clientX)
                    sety(e.clientY)
                    console.log(animate)
                }}
                onDragOver={(e) => {
                    handleDragOver(e, 'right')
                }}
            >
                <div className='h-full w-full rounded-md p-1 bg-card'>
                    <ToolBar list={list} setlist={setlist} type={type} settype={settype} qno={qno} setqno={setqno} />
                </div>
            </div>
        )
    }


    return (
        <div className='h-[100vh] relative w-[100vw] bg-background text-xl text-foreground transition-colors duration-280 box-border pt-18 p-2 overflow-hidden'>
            <div className={`h-full w-full flex flex-col md:flex-row items-center justify-center gap-4 `}>
                {
                    horizontalLayout.map((box) => (
                        horizontal[box]
                    ))
                }
            </div >
            <div className=' tools hidden'></div>
            {
                <div className={`absolute h-full w-full top-0 left-0 pointer-events-none bg-primary/10 pt-1.5
                ${(!Visible ? " hidden":' ')}
                `}>
                    <div className='h-2 top-15 w-full flex items-center absolute justify-center'>
                        <div className=' h-full w-50 bg-primary border-1  rounded-b-full '>

                        </div>
                    </div>
                    <div className='h-2 bottom-0 w-full flex items-center absolute justify-center'>
                        <div className=' h-full w-50 bg-primary border-1  rounded-t-full '>

                        </div>
                    </div>
                    <div className='h-full left-0 w-2 flex items-center absolute justify-center'>
                        <div className=' h-50 w-full bg-primary border-1  rounded-r-full '>

                        </div>
                    </div>
                    <div className='h-full right-0 w-2 flex items-center absolute justify-center'>
                        <div className=' h-50 w-full bg-primary border-1  rounded-l-full '>

                        </div>
                    </div>
                </div>
               
            }
           
        </div >
    );
};

export default quiz;
