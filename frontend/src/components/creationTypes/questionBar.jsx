import React, { useEffect, useRef, useState } from 'react'

const questionBar = ({ list, generateErr, setlist, type, settype, qno, setqno }) => {
  const Ref = useRef(null);
  const blockRef = useRef(null);
  const [layout, setlayout] = useState(['box1', 'box2'])
  const [draggedItem, setDraggedItem] = useState(null)
  const [adjustment, setadjustment] = useState(null)
  const [width, setwidth] = useState(0)
  useEffect(() => {
    const measure = () => {
      if (blockRef.current) {
        setwidth(blockRef.current.offsetWidth)
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('resize', measure)
    }
  }, [])

  const handelQuestionswitch = (i) => {
    setqno(i)
  }
  const [curr, setcurr] = useState(qno)
  
  useEffect(() => {
    setcurr(qno)
  }, [qno])

  const handleDragStart = (e, boxName) => {
    setDraggedItem(boxName);
    e.dataTransfer.effectAllowed = 'move';
  }

  const handleDragOver = (e, box) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggedItem && draggedItem != box)
      setadjustment(box)
  }

  const handleDrop = (e, dropTarget) => {
    e.preventDefault();

    if (draggedItem && draggedItem !== dropTarget) {
      setlayout(() => {
        const newLayout = [...layout];
        const draggedIndex = newLayout.indexOf(draggedItem);
        const dropIndex = newLayout.indexOf(dropTarget);

        [newLayout[draggedIndex], newLayout[dropIndex]] =
          [newLayout[dropIndex], newLayout[draggedIndex]];

        return newLayout;
      });
    }
    setDraggedItem(null);
    setadjustment(null)
  }

  const handleDragEnd = () => {
    setDraggedItem(null);
    setadjustment(null)
  }

  function getwidth() {
    return (6 * width / 10) + 'px'
  }
  function getwidth2() {
    return (4 * width / 10) + 'px'
  }
  const boxes = {

    box1: (<div draggable="true" className="h-full w-4/10 relative z-40"
      onDragStart={(e) => handleDragStart(e, 'box1')}
      onDragOver={(e) => handleDragOver(e, 'box1')}
      onDrop={(e) => handleDrop(e, 'box1')}
      onDragEnd={handleDragEnd}
      onDragLeave={() => setadjustment(null)}

    >
      {
        <div style={{ width: getwidth() }} className={`z-20 pointer-events-none h-full border-1 border-blue-950  transition-all ease-in duration-100
                     ${(layout[0] === 'box1') ? 'left-0' : 'right-0'} rounded-md absolute ${(adjustment === 'box1') ? ' opacity-100 scale-100' : "opacity-0 hidden scale-95"}`}>
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
                setqno(curr)
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
            [qno - 2, qno - 1, qno, qno + 1, qno + 2].map((i, _) => (
                (i > 0 && i < list.length+1) && (
                <div key={i}
                  className={(qno == i) ? ' border-1  h-8 w-10 cursor-pointer rounded-sm flex items-center transition-all ease-in p-3 justify-center text-white font-semibold  bg-primary-button dark:bg-primary-dark-button dark:hover:scale-95  hover:scale-95 border-[#1A1A1A]' : 'border-1 hover:scale-95 h-4 w-5 text-sm  rounded-sm flex items-center cursor-pointer transition-all ease-in  p-3 justify-center font-semibold border-primary-text dark:border-primary-dark-text '}
                  onClick={() => handelQuestionswitch(i)} >
                  {`${i}`}
                </div>) 
          ))
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