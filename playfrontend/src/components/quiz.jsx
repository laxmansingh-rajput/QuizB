import React from 'react'
import { useContext, useState } from 'react'
import Questions from './questions.jsx'
import a from '../context/context.js'
const quiz = () => {
    const [totalQuestion, settotalQuestion] = useState(30)
    const [currQuestion, setcurrQuestion] = useState(1)
    const elements = {
        'box1': (
            <div className='h-full w-2/10 px-4 py-2 shadow-md shadow-primary-shadow dark:shadow-[#ffff]'>
                <Questions totalQuestion={totalQuestion} currQuestion={currQuestion} setcurrQuestion={setcurrQuestion} />
            </div>
        ),
        'box2': (
            <div className='h-full w-8/10  '>

            </div>)
    }
    return (
        <div className='h-screen w-screen pt-12 bg-primary dark:bg-primary-dark text-primary-text dark:text-primary-dark-text
         flex items-center justify-start'>
            {
                Object.values(elements).map((element, i) => (
                    <>
                        {element}
                    </>
                ))
            }

        </div>
    )
}

export default quiz