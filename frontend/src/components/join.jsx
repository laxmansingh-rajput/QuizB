import React from 'react'
import { useContext } from 'react';
import ModeContext from '../context/context.js'
const Join = () => {
  const { mode, show } = useContext(ModeContext);
  return (
    <div className='h-[100vh] w-[100vw] fixed left-0 bg-background text-xl text-foreground transition-colors duration-280'>
      <div className={'h-full w-8/10 pt-12 bg-background text-xl text-foreground transition-all duration-280 ease-in-out fixed flex flex-col items-center justify-center right-0 '
        + ((show != "show") ? 'w-full' : '')
      }>
        <div className='h-80 w-200 box-border p-8 rounded-lg flex flex-col gap-10 bg-card border border-border text-foreground shadow-soft transition-all ease-in-out duration-280'>
          <div className='text-3xl font-bold flex-start relative top-0'>
            Enter the Quiz Code
          </div>
          <div className='flex flex-col items-center justify-center gap-8 w-full'>
            <input type="text" placeholder='Enter quiz code' className='w-3/5 rounded-md h-10 box-border p-2 bg-input border border-border text-foreground focus:ring-ring focus:outline-none focus:ring-2' />
            <button className='text-md px-6 py-2 rounded-md bg-primary text-primary-foreground font-semibold cursor-pointer hover:scale-95 transition-all ease-in-out duration-200'>
              Search Quiz
            </button>
          </div>
        </div>
      </div >
    </div>
  )
}

export default Join