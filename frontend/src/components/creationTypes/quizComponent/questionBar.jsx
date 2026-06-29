import React, { useEffect, useRef, useState } from 'react'
import useRenderQuestion from '../quizFunction/useRenderQuestion';
import { handleDragStart1, handleDragOver1, handleDrop1, handleDragEnd1 } from '../dragAndDrop/dragFunctions';
import useDrag2 from '../dragAndDrop/useDrag2';
import useQuizBar from '../quizFunction/useQuizBar';
import { animationBar, animationBar2 } from '../quizFunction/quizHandler';

const questionBar = ({ list, generateErr, qno, setqno, setVisible, animate, setanimate, adjustment, setadjustment, draggedItem, setDraggedItem }) => {

  const { layout, setlayout, } = useDrag2()
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
      onDrag={() => {
        console.log(adjustment)
        console.log(animate)
      }}
    >
      {
        <div style={{ width: getwidth() }} className={`z-20 pointer-events-none  h-full border-1 border-blue-950  transition-all ease-in duration-100
                     ${(layout[0] === 'box1') ? ` left-0 ${animationBar(animate)}` : `right-0  ${animationBar2(animate)}`} rounded-md absolute ${(adjustment === 'box1') ? ' opacity-100 scale-100' : "opacity-0 hidden scale-95"}`}>
          <div className='h-full w-full bg-blue-400 opacity-10'>
          </div>
        </div>
      }
      <div className='h-full w-full bg-card border border-border text-foreground rounded-xl flex items-center justify-center gap-4 px-4 py-2 z-50 shadow-soft'>
        <button
          className='text-[12px] px-5 py-1 h-8 w-10 cursor-pointer rounded-lg flex items-center justify-center text-primary-foreground font-semibold bg-primary hover:scale-95 transition-all duration-200 shadow-soft'
          onClick={() => setqno(qno > 1 ? qno - 1 : 1)}>
          Prev
        </button>

        <input
          type="text"
          className='h-8 w-10 bg-input border border-border text-foreground rounded-lg flex items-center justify-center text-center font-semibold focus:outline-none focus:ring-1 focus:ring-ring'
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
          className='text-[12px] px-5 py-1 h-8 w-10 cursor-pointer rounded-lg flex items-center justify-center text-primary-foreground font-semibold bg-primary hover:scale-95 transition-all duration-200 shadow-soft'
          onClick={() => setqno(qno < list.length ? qno + 1 : list.length)}>
          Next
        </button>

      </div>
    </div>),
    box2: (<div draggable='true' className='z-30 h-full w-6/10 relative' onDragStart={(e) => handleDragStart(e, 'box2')}
      onDragOver={(e) => handleDragOver(e, 'box2')}
      onDrop={(e) => handleDrop(e, 'box2')}
      onDragEnd={handleDragEnd}
    >
      {
        <div style={{ width: getwidth2() }} className={`z-20 pointer-events-none  h-full border-1 border-blue-950 transition-all ease-in duration-100
                     ${(layout[0] === 'box2') ? `left-0 ${animationBar(animate)} ` : ` right-0 ${animationBar2(animate)}`} rounded-md absolute ${(adjustment === 'box2') ? ' opacity-100 scale-100' : "opacity-0 hidden scale-95"}`}>
          <div className='h-full w-full bg-blue-400 opacity-10'>

          </div>
        </div>
      }
      <div className='bg-card border border-border text-foreground rounded-xl h-full w-full flex items-center px-30 justify-center gap-2 overflow-x-auto scrollbar-thin z-50 shadow-soft'>
        <div className='h-full w-60 flex items-center justify-center gap-2 overflow-x-auto relative'>
          {
            RenderQuestion.map((i, _) => (
              <div key={i}
                className={(qno == i) ? 'h-8 w-10 cursor-pointer rounded-lg flex items-center transition-all ease-in p-3 justify-center text-primary-foreground font-semibold bg-primary shadow-soft hover:scale-95' : 'hover:scale-95 h-8 w-10 text-sm rounded-lg flex items-center cursor-pointer transition-all ease-in p-3 justify-center font-semibold bg-secondary text-foreground hover:bg-muted border border-border shadow-soft'}
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