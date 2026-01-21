import React, { useEffect, useRef, useState } from 'react'
import useRenderQuestion from '../quizFunction/useRenderQuestion';
import { handleDragStart1, handleDragOver1, handleDrop1, handleDragEnd1 } from '../dragAndDrop/dragFunctions';
import useDrag from '../dragAndDrop/useDrag';
import useQuizBar from '../quizFunction/useQuizBar';
import { animationBar, animationBar2 } from '../quizFunction/quizHandler';

const questionBar = ({ list, generateErr, qno, setqno, setVisible }) => {
  const { layout, setlayout, adjustment, setadjustment, draggedItem, setDraggedItem, animate, setanimate } = useDrag()
  const RenderQuestion = useRenderQuestion(qno, list)
  const { blockRef, getwidth, getwidth2 } = useQuizBar()

  const handelQuestionswitch = (i) => {
    setqno(i)
  }
  const [curr, setcurr] = useState(qno)
  useEffect(() => {
    setcurr(qno)
  }, [qno])

  const handleDragStart = (e, boxName) => handleDragStart1(e, boxName, setDraggedItem, setVisible, setanimate)
  const handleDragOver = (e, box) => handleDragOver1(e, box, setadjustment, draggedItem, 'questionBar', animate, setanimate)
  const handleDrop = (e, dropTarget) => handleDrop1(e, dropTarget, draggedItem, draggedItem, layout, setlayout, setDraggedItem, setadjustment, setVisible)
  const handleDragEnd = () => handleDragEnd1(setDraggedItem, setadjustment, setVisible, setanimate)

  const boxes = {

    box1: (<div draggable="true" className="h-full w-4/10 relative z-40"
      onDragStart={(e) => handleDragStart(e, 'box1')}
      onDragOver={(e) => handleDragOver(e, 'box1')}
      onDrop={(e) => handleDrop(e, 'box1')}
      onDragEnd={handleDragEnd}
      onDragLeave={() => setadjustment(null)}
      onDrag={console.log(animate)}
      onDragEnter={()=>{
        console.log('triggered')
      }}
    >
      {
        <div style={{ width: getwidth() }} className={`z-20 pointer-events-none h-full border-1 border-blue-950  transition-all ease-in duration-100
                     ${(layout[0] === 'box1') ? ` left-0 ${animationBar(animate)}` : `right-0  ${animationBar2(animate)}`} rounded-md absolute ${(adjustment === 'box1') ? ' opacity-100 scale-100' : "opacity-0 hidden scale-95"}`}>
          <div className='h-full w-full bg-blue-400 opacity-10'>
          </div>
        </div>
      }
      <div className='h-full w-full border-1 rounded-md flex items-center justify-center gap-4 px-4 py-2 z-50'>
        <button
          className='text-[12px] px-5 py-1 h-8 w-10 cursor-pointer rounded-md flex items-center justify-center text-white font-semibold  bg-primary-button dark:bg-primary-dark-button dark:hover:scale-95  border border-[#1A1A1A] transition-all duration-200 hover:scale-95'
          onClick={() => setqno(qno > 1 ? qno - 1 : 1)}>
          Prev
        </button>

        <input
          type="text"
          className='h-8 w-10 border rounded-md flex items-center justify-center text-center font-semibold
            dark:bg-primary-dark-card focus:outline-none'
          value={curr}
          onChange={(e) => {
            setcurr(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              let value = Number(curr);
              if (0 < value && value <= list.length) {
                setqno(value)
              } else {
                generateErr('Question doesnt exist')
                setcurr(qno)
              }
            }
          }}
          onBlur={() => { setcurr(qno) }}
        />

        <span className='text-[12px] font-medium'>of {list.length}</span>

        <button
          className='text-[12px] px-5 py-1 h-8 w-10 cursor-pointer rounded-md flex items-center justify-center text-white font-semibold  bg-primary-button dark:bg-primary-dark-button  border
           border-[#1A1A1A] transition-all duration-200 hover:scale-95'
          onClick={() => setqno(qno < list.length ? qno + 1 : list.length)}>
          Next
        </button>

      </div>
    </div>),
    box2: (<div draggable='true' className='z-30 h-full w-6/10 relative' onDragStart={(e) => handleDragStart(e, 'box2')}
      onDragOver={(e) => handleDragOver(e, 'box2')}
      onDrop={(e) => handleDrop(e, 'box2')}
      onDragEnd={handleDragEnd}
      onDragLeave={() => setadjustment(null)}
    >
      {
        <div style={{ width: getwidth2() }} className={`z-20 pointer-events-none h-full border-1 border-blue-950 transition-all ease-in duration-100
                     ${(layout[0] === 'box2') ? 'left-0' : 'right-0'} rounded-md absolute ${(adjustment === 'box2') ? ' opacity-100 scale-100' : "opacity-0 hidden scale-95"}`}>
          <div className='h-full w-full bg-blue-400 opacity-10'>

          </div>
        </div>
      }
      <div className='border-1  rounded-md h-full w-full  flex items-center px-30 justify-center gap-2 overflow-x-auto
       scrollbar-thin z-50 '>
        <div className='h-full  w-60 flex  items-center justify-center gap-2 overflow-x-auto relative'>
          {
            RenderQuestion.map((i, _) => (
              <div key={i}
                className={(qno == i) ? ' border-1  h-8 w-10 cursor-pointer rounded-sm flex items-center transition-all ease-in p-3 justify-center text-white font-semibold  bg-primary-button dark:bg-primary-dark-button dark:hover:scale-95  hover:scale-95 border-[#1A1A1A]' : 'border-1 hover:scale-95 h-4 w-5 text-sm  rounded-sm flex items-center cursor-pointer transition-all ease-in  p-3 justify-center font-semibold border-primary-text dark:border-primary-dark-text '}
                onClick={() => handelQuestionswitch(i)} >
                {`${i}`}
              </div>
            )
            )
          }
        </div>
      </div>
    </div>)
  }
  return (
    <div ref={blockRef} className='h-full w-full flex gap-2 items-center justify-center '>
      {
        layout.map((element, i) => (
          boxes[element]
        ))
      }
    </div>
  )
}

export default questionBar