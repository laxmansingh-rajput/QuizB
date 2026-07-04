import React, { useEffect, useState, useRef, useContext } from 'react';
import ToolBar from './quizComponent/toolBar.jsx';
import Questions from './quizComponent/questionBar.jsx'
import useQuizState from './quizFunction/useQuizState.js';
import Question from './quizComponent/Question.jsx';
import View from './quizComponent/view.jsx';
import Share from './quizComponent/Share.jsx';
import Save from './quizComponent/Save.jsx';
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

    const { questionList, setQuestionList, err, seterr, qno, setqno,
        type, settype, Arr, height, setheight, blockRef } = useQuizState();

    const [view, setview] = useState(false);
    const [left, setLeft] = useState('questionbar')
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('question_list');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed && parsed.length > 0) {
                    // Show prompt if there's any text or options filled, or multiple questions
                    const hasContent = parsed.length > 1 || parsed[0].question || parsed[0].option.some(o => o);
                    if (hasContent) {
                        setShowPrompt(true);
                    }
                }
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    const QuestionHandeler = (e) => QuestionHandeler1(e, questionList, setQuestionList, qno)
    const optionHandeler = (e, index) => optionHandeler1(e, index, questionList, setQuestionList, qno)
    const generateErr = (txt) => generateErr1(txt, seterr)
    const handelRemoveOption = (i) => handelRemoveOption1(i, questionList, generateErr, setQuestionList, qno)
    const handelAddOption = (i) => handelAddOption1(i, questionList, setQuestionList, generateErr, qno)
    const handelCorrect = (e) => handelCorrect1(e, questionList, qno, setQuestionList, type)

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
                questionList={questionList}
                qno={qno}
                type={type}
                err={err}
                Arr={Arr}
                setQuestionList={setQuestionList}
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
                    <Questions questionList={questionList}
                        setQuestionList={setQuestionList}
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
                    (left == 'view') ?
                        (<View questionList={questionList} setview={setview} setLeft={setLeft} setcurr={setqno} setQuestionList={setQuestionList} />)
                        : (left == 'share')?
                            (<Share setLeft={setLeft} quizData={questionList}/>)
                        : (left == 'save')?
                            (<Save setLeft={setLeft} quizData={questionList}/>)
                        : (
                            verticalLayout.map((box) => (
                            vertical[box]
                        ))
                        )
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
                    <ToolBar questionList={questionList} setQuestionList={setQuestionList} type={type} settype={settype} qno={qno} setqno={setqno} setLeft={setLeft} />
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
                ${(!Visible ? " hidden" : ' ')}
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

            {showPrompt && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-300">
                    <div className="bg-card border border-border text-foreground rounded-2xl shadow-soft max-w-md w-full p-6 flex flex-col gap-6 text-center animate-in fade-in zoom-in duration-200">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-xl font-bold">Continue Saved Work?</h3>
                            <p className="text-sm text-muted-foreground">
                                We found previously saved questions. Would you like to continue editing them or start fresh?
                            </p>
                        </div>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => {
                                    setShowPrompt(false);
                                }}
                                className="flex-1 bg-primary text-primary-foreground hover:scale-95 font-semibold transition-all duration-200 cursor-pointer rounded-xl py-2.5 shadow-sm"
                            >
                                Continue Saved
                            </button>
                            <button
                                onClick={() => {
                                    localStorage.removeItem('question_list');
                                    setQuestionList([{ question: "", option: ["", "", ""], correct_option: [], question_type: "Single" }]);
                                    setqno(1);
                                    settype(true);
                                    setShowPrompt(false);
                                }}
                                className="flex-1 bg-destructive/10 hover:bg-destructive hover:text-destructive-foreground text-destructive hover:scale-95 font-semibold transition-all duration-200 cursor-pointer rounded-xl py-2.5 shadow-sm border border-destructive/20"
                            >
                                Start Fresh
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div >
    );
};

export default quiz;
