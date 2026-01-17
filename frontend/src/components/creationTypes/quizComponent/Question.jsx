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
            <div draggable className='border-1 max-h-full h-full  row-start-1 col-start-1 col-end-2  p-2 box-border rounded-md relative flex flex-col gap-15'
                
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
        </div>
    )
}

export default Question