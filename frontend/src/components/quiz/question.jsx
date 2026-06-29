import React from 'react'

const question = () => {
    const sample = {
        "questionNumber": 1,
        "question": "Which data structure follows the FIFO (First In First Out) principle?",
        "options": ["Stack","Queue","Tree","Graph"],
        "correctAnswer": "Queue"
    }

    return (
        <div className='flex flex-col gap-6 text-start'>
            <div className='text-2xl font-bold font-display tracking-tight text-foreground'>
                {sample.questionNumber}. {sample.question}
            </div>
            <div className="flex flex-col gap-3">
                {sample.options.map((opt, idx) => (
                    <div 
                        key={idx} 
                        className="px-5 py-4 bg-secondary hover:bg-accent text-foreground font-medium rounded-xl transition-all duration-200 cursor-pointer shadow-soft"
                    >
                        {opt}
                    </div>
                ))}
            </div>    
        </div>
    )
}

export default question
