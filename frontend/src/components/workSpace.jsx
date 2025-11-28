import React from "react";
import Quiz from './creationTypes/quiz.jsx';
import Survey from './creationTypes/survey.jsx';
import Ai from './creationTypes/ai.jsx';

const WorkSpace = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const type = queryParams.get("type");

    let ComponentToRender;

    if(type === "Quiz"){
        ComponentToRender = Quiz;
    } else if(type === "Survey"){
        ComponentToRender = Survey;
    } else {
        ComponentToRender = Ai;
    }

    return (
        <div className='h-[100vh] w-[100vw] bg-[#F4F9FF] text-xl text-[#1A1A1A] dark:bg-primary-dark dark:text-[#A0A0B2] 
        flex items-center justify-center   '>
            <ComponentToRender />
        </div>
    );
};

export default WorkSpace;
