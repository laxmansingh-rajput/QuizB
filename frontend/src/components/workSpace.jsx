import React, { useEffect, useState, useRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import ModeContext from '../context/context.js';
import Icons from './icons.jsx';
import add from '../assets/lightAdd.svg';
import darkadd from '../assets/darkAdd.svg';
import remove from '../assets/lightRemove.svg';
import darkremove from '../assets/darkRemove.svg';
import single from '../assets/lightSingle.svg';
import darksingle from '../assets/darkSingle.svg';
import multiple from '../assets/lightMultiple.svg';
import darkmultiple from '../assets/darkMultiple.svg';
import del from '../assets/delete.svg';
import darkdel from '../assets/darkdelete.svg';
import reset from '../assets/lightReset.svg';
import darkreset from '../assets/darkReset.svg';
import share from '../assets/lightUpload.svg';
import darkshare from '../assets/darkUpload.svg';
import eye from '../assets/lightEye.svg';
import darkeye from '../assets/darkEye.svg';
import View from './view.jsx';
import right from '../assets/lightRight.svg';
import bigAdd from '../assets/bigAdd.svg'
import darkBigAdd from '../assets/darkBigAdd.svg'
import darkright from '../assets/darkRight.svg';

const WorkSpace = () => {
    const { mode, setshow, show } = useContext(ModeContext);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [List, setList] = useState([]);
    const [curr, setcurr] = useState(0);
    const [err, seterr] = useState('');
    const type = queryParams.get("type");
    const option = queryParams.get("option");
    const scrollContainerRef = useRef(null);
    const [viewVisible, setView] = useState(false);
    const [toolBar, settoolBar] = useState(false);

    useEffect(() => {
        setshow("dontShow");
        localStorage.setItem("side", "dontshow");
        // if (window.innerWidth > 700) {
        //     settoolBar(true)
        // }
    }, []);

    const handeTool = () => {
        settoolBar(!toolBar);
    };

    const handelView = () => {
        setView(true);
    };

    const getfontSize = () => {
        if (!List[curr - 1]) return '1.175rem';
        let text = List[curr - 1].question;
        return text.length <= 70 ? '1.525em' : '1.175rem';
    };

    const handelChange = (e) => {
        let updatedlist = [...List];
        if (!updatedlist[curr - 1]) return;
        updatedlist[curr - 1].question = e.target.value;
        setList(updatedlist);
    };

    const HandelOptionChange = (e, index) => {
        let updatedlist = [...List];
        if (!updatedlist[curr - 1]) return;
        updatedlist[curr - 1].option[index] = e.target.value;
        setList(updatedlist);
    };

    const handleAnswerChange = (e, index) => {
        let updatedlist = [...List];
        if (!updatedlist[curr - 1]) return;
        if (option === "o1") {
            updatedlist[curr - 1].correct = [e.target.value];
        } else {
            if (e.target.checked) {
                if (!updatedlist[curr - 1].correct.includes(e.target.value)) {
                    updatedlist[curr - 1].correct.push(e.target.value);
                }
            } else {
                updatedlist[curr - 1].correct = updatedlist[curr - 1].correct.filter(
                    val => val !== e.target.value
                );
            }
        }
        setList(updatedlist);
    };

    const handelAdd = () => {
        if (curr < 1 || !List[curr - 1]) {
            seterr("Add Question First");
            setTimeout(() => seterr(""), 5000);
        } else if (List[curr - 1].option.length >= 6) {
            seterr("Max Option Limit");
            setTimeout(() => seterr(""), 5000);
        } else {
            let updatedlist = [...List];
            updatedlist[curr - 1].option.push("");
            setList(updatedlist);
        }
    };

    const HandelRemove = () => {
        if (curr < 1 || !List[curr - 1]) {
            seterr("Add Question First");
            setTimeout(() => seterr(""), 5000);
        } else if (List[curr - 1].option.length === 1) {
            seterr("Min option Limit");
            setTimeout(() => seterr(""), 5000);
        } else {
            let updatedlist = [...List];
            updatedlist[curr - 1].option.pop();
            setList(updatedlist);
        }
    };

    const HandelAddPage = (type) => {
        let updatedList = [...List];
        updatedList.push({ question: "", option: ["", "", "", ""], correct: [], type: type });
        setcurr(curr + 1);
        setList(updatedList);
    };

    const handelReset = () => {
        if (curr < 1 || !List[curr - 1]) {
            seterr("Add Question First");
            setTimeout(() => seterr(""), 5000);
        } else {
            let updatedList = [...List];
            let type = List[curr - 1].type;
            updatedList[curr - 1] = { question: "", option: ["", "", "", ""], correct: [], type: type };
            setList(updatedList);
        }
    };

    const handelDelete = () => {
        if (curr < 1 || !List[curr - 1]) {
            seterr("Add Question First");
            setTimeout(() => seterr(""), 5000);
        } else {
            let updatedList = [...List];
            updatedList = updatedList.filter((_, index) => index !== curr - 1);
            setcurr(curr - 1);
            setList(updatedList);
        }
    };

    const handelCurr = (index) => {
        setcurr(index);
    };

    return (
        <div className='min-h-[100vh] w-[100vw] bg-[#F4F9FF] text-xl text-[#1A1A1A] dark:bg-primary-dark dark:text-[#A0A0B2] pt-17 flex items-start justify-center gap-2 p-2 box-border relative'>
            <div className={`w-3/4 max-[700px]:w-full rounded-xl flex flex-col gap-2 ${!viewVisible ? ' min-h-87 ' : ' h-[87vh] overflow-y-scroll scrollbar-thin '}`}>
                {viewVisible ? (
                    <View List={List} setList={setList} setview={setView} setcurr={setcurr} />
                ) : (
                    <>
                        <div className='min-h-[77vh] rounded-xl flex flex-col bg-[#FFFF] text-[#5F6A7D] dark:text-[#F5F5F5] dark:bg-[#1F1F2F] relative'>
                            {
                                (List.length == 0 && !toolBar) && <div className='h-[77vh] w-full flex items-center justify-center text-3xl flex-col gap-2 '
                                >
                                    <div className='flex items-center justify-center flex-col gap-4  p-5 rounded-2xl  bg-[#d6edff] text-[#5F6A7D] dark:bg-[#30303d] shadow-md  dark:text-[#A0A0B2] hover:shadow-[#1A2A43] dark:hover:shadow-[#485474] transition-all duration-300 ' onClick={() => settoolBar(true)}>
                                        <img src={(mode == "dark" ? darkBigAdd : bigAdd)} alt="" />
                                        Add Question
                                    </div>
                                </div>
                            }
                            {List.slice(curr - 1, curr).map((question, index) => (
                                <div key={index} className='w-full'>
                                    <textarea
                                        className='min-h-15 w-full mb-4 pl-2 pr-2 box-border bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2'
                                        placeholder="Enter The Question"
                                        style={{ fontSize: getfontSize() }}
                                        maxLength={150}
                                        onChange={(e) => handelChange(e)}
                                        value={question.question}
                                    ></textarea>

                                    <div className='flex flex-col items-center justify-center gap-4 py-6'>
                                        <div className='flex justify-center flex-wrap w-full text-md gap-x-4 gap-y-1'>
                                            {question.option.map((opt, ind) => (
                                                <input
                                                    type="text"
                                                    key={ind}
                                                    placeholder={`Enter option ${ind + 1}`}
                                                    className='border-[1px] h-12 w-1/3 pl-2 pr-2 rounded-2xl min-w-48'
                                                    maxLength={35}
                                                    onChange={(e) => HandelOptionChange(e, ind)}
                                                    value={opt}
                                                />
                                            ))}
                                        </div>

                                        <ul className='w-full h-1/2 flex items-center justify-center gap-3 flex-wrap'>
                                            <div className='text w-full h-10 text-2xl underline'>Correct Answer</div>
                                            {question.option.map((opt, ind) => (
                                                <label key={ind} className="flex items-center gap-2">
                                                    <div className='flex items-center justify-center text-sm gap-2 border-[1px] p-2 rounded-xl'>
                                                        <input
                                                            type={List[curr - 1]?.type === "single" ? "radio" : "checkbox"}
                                                            name={`question-${index}`}
                                                            value={ind}
                                                            onChange={(e) => handleAnswerChange(e, index)}
                                                            checked={
                                                                List[curr - 1]?.type === "single"
                                                                    ? List[curr - 1]?.correct[0] == ind.toString()
                                                                    : List[curr - 1]?.correct.includes(ind.toString())
                                                            }
                                                        />
                                                        <span>{opt || `Option ${ind + 1}`}</span>
                                                    </div>
                                                </label>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                            <div className='absolute bottom-5 text-red-600 h-4 w-full text-center font-medium'>
                                {err}
                            </div>
                        </div>

                        <div className='h-18 w-full border rounded-xl flex items-center gap-4 bg-[#FFFF] text-[#5F6A7D] dark:bg-[#1F1F2F] overflow-x-auto p-2 scrollbar-thin' ref={scrollContainerRef}>
                            {Array.from({ length: List.length }, (_, i) => i + 1).map((key, index) => (
                                <div
                                    className={'h-full w-15 rounded-md flex items-center justify-center text text-[#5F6A7D] dark:hover:bg-[#626d7a] shrink-0 p-2 border-1 cursor-pointer ' +
                                        (index === curr - 1 ? "border-0 bg-[#4A90E2] dark:bg-[#2c4666] text-white" : "")}
                                    key={index}
                                    onClick={() => handelCurr(key)}
                                >
                                    {index + 1}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className={` ${toolBar ? " w-30 sticky min-h-[88vh] max-[700px]:fixed max-[700px]:right-2 max-[700px]:border" : "w-10  fixed right-0 h-10"} rounded-xl  bg-[#FFFF] text-[#5F6A7D] dark:bg-[#1F1F2F] flex flex-col items-center justify-center gap-5 transition-all duration-300 ease-in-out`}>
                <div className={`relative h-[88vh] w-full flex flex-col items-center justify-center gap-5 ${!toolBar ? "h-0" : ""}  `}>
                    <img src={right} className={`h-8 w-8 absolute top-1 right-1 transition-all duration-300 ease-in-out cursor-pointer  rounded-lg ${toolBar ? '' : 'rotate-180'}`} onClick={handeTool} alt="toggle" />
                    {toolBar && (
                        <>
                            <div onClick={handelAdd}><Icons name="Add Option" svg={add} dark={darkadd} /></div>
                            <div onClick={HandelRemove}><Icons name="Drop Option" svg={remove} dark={darkremove} /></div>
                            <div onClick={handelDelete}><Icons name="Delete" svg={del} dark={darkdel} /></div>
                            <div onClick={handelReset}><Icons name="Reset" svg={reset} dark={darkreset} /></div>
                            <div onClick={() => HandelAddPage("single")}><Icons name="Add Single" svg={single} dark={darksingle} /></div>
                            <div onClick={() => HandelAddPage("multiple")}><Icons name="Add Multiple" svg={multiple} dark={darkmultiple} /></div>
                            <div onClick={handelView}><Icons name="View" svg={eye} dark={darkeye} /></div>
                            <div><Icons name="Share" svg={share} dark={darkshare} /></div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorkSpace;
