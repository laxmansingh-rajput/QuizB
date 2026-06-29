import React from 'react'
import { useContext, useState } from 'react'
import Questions from './questions.jsx'
import Question from './question.jsx'
import a from '../../context/context.js'

const Quiz = () => {
    const [totalQuestion, settotalQuestion] = useState(30)
    const [currQuestion, setcurrQuestion] = useState(1)
    const { mode } = useContext(a)

    const elements = {
        'box1': (
            <div className='h-full w-1/4 px-6 py-8 bg-card text-card-foreground rounded-2xl shadow-soft overflow-y-auto transition-colors duration-280'>
                <Questions totalQuestion={totalQuestion} currQuestion={currQuestion} setcurrQuestion={setcurrQuestion} />
            </div>
        ),
        'box2': (
            <div className='h-full w-3/4 px-8 py-8 bg-card text-card-foreground rounded-2xl shadow-soft overflow-y-auto transition-colors duration-280'>
                <Question />
            </div>
        )
    }

    return (
        <div className='h-screen w-screen pt-16 pb-4 px-4 bg-background text-foreground flex items-center justify-start gap-4 transition-colors duration-280 box-border'>
            {
                Object.values(elements).map((element, i) => (
                    <React.Fragment key={i}>
                        {element}
                    </React.Fragment>
                ))
            }
        </div>
    )
}

export default Quiz
