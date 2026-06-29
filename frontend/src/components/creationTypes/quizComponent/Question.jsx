import React from 'react'
import single from '../../../assets/s.svg'
import multiple from '../../../assets/m.svg'
import cross from '../../../assets/cross.svg'
const Question = ({
    list,
    qno,
    type,
    err,
    Arr,
    setlist,
    settype,
  
    QuestionHandeler,
    optionHandeler,
    handelRemoveOption,
    handelAddOption,
    handelCorrect,
}) => {
    return (
        <div className='h-full w-full'>
            <div draggable className='bg-card text-card-foreground shadow-soft max-h-full h-full p-6 box-border rounded-2xl relative flex flex-col gap-6'
                
            >
                <textarea className="question h-20 max-h-25 w-full border-b border-border bg-transparent text-foreground p-2 focus:border-primary focus:outline-none resize-none" placeholder="Enter The Question"
                    value={`${list[qno - 1].question}`} maxLength={150} onChange={(e) => { QuestionHandeler(e) }} >
                </textarea>
                <div className="options flex flex-col h-3/4 gap-2 w-full items-center">
                    <div className='flex flex-col gap-3 w-11/12 md:w-2/3 h-full relative'>
                        {
                            list[qno - 1].options.map((opt, i) => (
                                <div key={i} className='h-10 w-full text-sm rounded-xl border border-border bg-input p-2 flex items-center text-foreground shadow-soft'>
                                    <input type="text" className='h-full w-full bg-transparent focus:outline-none text-foreground' placeholder={`Enter option ${i + 1}`} maxLength={150} value={`${list[qno - 1].options[i]}`} onChange={(e) => optionHandeler(e, i)} />
                                    <img src={cross} className='h-5 cursor-pointer' onClick={() => { handelRemoveOption(i) }} alt="" />
                                </div>
                            ))
                        }
                        <div className='w-full absolute bottom-25 border border-border rounded-xl text-sm h-10 flex items-center justify-around bg-secondary/80 text-foreground'>
                            <div className='font-bold'>Correct answer{type ? "" : "s"}:</div>
                            {
                                list[qno - 1].options.map((checked, i) => (
                                    <div key={i} className='flex items-center justify-center gap-1 text-ms'>
                                        <input type={type ? "radio" : "checkbox"} value={i} name='curr' checked={list[qno - 1].correct[i]}
                                            onChange={(e, i) => handelCorrect(e)}
                                        />
                                        <div>{Arr[i]}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='text-red-600 dark:text-destructive w-full text-sm font-bold absolute bottom-10'>
                            {`${err}`}
                        </div>
                    </div>
                </div>
                <div className='h-auto w-full absolute left-6 bottom-4'>
                    <button type="button" className='bg-primary text-primary-foreground hover:scale-95 text-sm font-semibold transition-all duration-300 ease-in-out cursor-pointer rounded-xl px-4 py-2 relative shadow-soft' onClick={() => { handelAddOption() }}>
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
        </div>
    )
}

export default Question