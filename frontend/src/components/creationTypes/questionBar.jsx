import React, { useEffect, useRef, useState } from 'react'

const questionBar = ({ list, setlist, type, settype, qno, setqno }) => {
  const Ref = useRef(null);
  useEffect(() => {
    if (Ref.current) {
      Ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [qno])
  const handelQuestionswitch = (i) => {
    setqno(i + 1)
  }
  const [curr, setcurr] = useState(qno)
  useEffect(() => {
    setcurr(qno)
  }, [qno])

  return (
    <div className='h-full w-full grid gap-2 grid-cols-[40fr_60fr]'>
      <div className='border-2 rounded-xl flex items-center justify-center gap-4 px-4 py-2'>

        <button
          className='text-sm px-3 py-1 h-8 w-10 cursor-pointer rounded-md flex items-center justify-center text-white font-semibold bg-[#1A1A1A] border border-[#1A1A1A] transition-all duration-200 hover:scale-95'
          onClick={() => setqno(qno > 1 ? qno - 1 : 1)}>
          Prev
        </button>

        <input
          type="text"
          className='h-8 w-10 border rounded-md flex items-center justify-center text-center font-semibold bg-gray-50 focus:outline-none'
          value={curr}
          onChange={(e) => {
            setcurr(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if(0<curr<=list.length){
                setqno(curr)
              }else{
                setcurr(qno)
              }
            }
          }}

        />

        <span className='text-sm font-medium'>of {list.length}</span>

        <button
          className='text-sm px-3 py-1 h-8 w-10 cursor-pointer rounded-md flex items-center justify-center text-white font-semibold bg-[#1A1A1A] border border-[#1A1A1A] transition-all duration-200 hover:scale-95'
          onClick={() => setqno(qno < list.length ? qno + 1 : list.length)}>
          Next
        </button>

      </div>
      <div className='border-2  rounded-xl h-full w-full  flex items-center px-30 justify-center gap-2 overflow-x-auto scrollbar-thin '>
        <div className='h-full w-60 flex  items-center justify-center gap-2 overflow-x-auto scrollbar-thin relative '>
          {
            list.map((_, i) => (
              <div ref={(i == qno - 1) ? Ref : null} key={i}
                className={(qno == i + 1) ? ' border-1 h-8 w-10 cursor-pointer rounded-sm flex items-center  transition-all ease-in  p-3 justify-center text-white font-semibold bg-[#1A1A1A] border-[#1A1A1A]' : 'border-1 h-4 w-5 text-sm  rounded-sm flex items-center cursor-pointer transition-all ease-in  p-3 justify-center font-semibold border-[#1A1A1A]'}
                onClick={() => handelQuestionswitch(i)} >
                {`${i + 1}`}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default questionBar