import React from 'react'
import { useContext } from 'react';
import ModeContext from '../context/context.js'
const Join = () => {
  const { mode, show } = useContext(ModeContext);
  return (
    <div className='h-[100vh] w-[100vw] fixed left-0 bg-primary text-xl text-primary-text dark:bg-primary-dark text-primary-dark-text'>
      <div className={'h-full w-8/10 pt-12  bg-primary text-xl text-primary-text dark:bg-primary-dark text-primary-dark-text transition-all ' +
        ' duration-500 ease-in-out fixed flex flex-col  items-center  justify-center right-0 '
        + ((show != "show") ? 'w-full' : '')
      }>
        <div className=' border-2 h-80  w-200  p-4 rounded-md flex flex-col gap-12'>
          <div className='text-3xl bold font-bold flex-start relative top-0'>
            Enter the Quiz Code
          </div>
          <div className=' flex flex-col items-center justify-center gap-6 w-full'>
            <input type="text" className='border-2 w-3/5 rounded-md h-10 box-border p-2 ' />
            <button className='border-2 px-3 py-0.5 rounded-md'>
              Search Quiz
            </button>
          </div>
        </div>
      </div >
    </div>
  )
}

export default Join