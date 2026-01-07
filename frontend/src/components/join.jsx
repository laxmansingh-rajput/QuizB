import React from 'react'
import { useContext } from 'react';
import ModeContext from '../context/context.js'
const Join = () => {
  const { mode, show } = useContext(ModeContext);
  return (
    <div className='h-[100vh] w-[100vw] fixed left-0 bg-primary text-xl text-primary-text dark:bg-primary-dark dark:text-primary-dark-text'>
      <div className={'h-full w-8/10 pt-12  bg-primary text-xl text-primary-text dark:bg-primary-dark dark:text-primary-dark-text transition-all ' +
        ' duration-500 ease-in-out fixed flex flex-col  items-center  justify-center right-0 '
        + ((show != "show") ? 'w-full' : '')
      }>
        <div className='h-80  w-200 box-border p-5 rounded-md flex flex-col gap-15 bg-primary-card dark:bg-primary-dark-card   shadow-[5px_5px_15px_()] dark:shadow-primary-dark-shadow shadow-primary-shadow  transition-all ease-in-out duration-500
        dark:text-primary-dark-text  '>
          <div className='text-3xl bold font-bold flex-start relative top-0'>
            Enter the Quiz Code
          </div>
          <div className=' flex flex-col items-center justify-center gap-8 w-full'>
            <input type="text" placeholder='Enter quiz code' className=' border-1 w-3/5 rounded-md h-10 box-border p-2 ' />
            <button className='text-md px-5 py-0.75 rounded-md bg-primary-button dark:bg-primary-dark-button font-semibold cursor-pointer hover:scale-95 transition-all ease-in-out duration-200'>
              Search Quiz
            </button>
          </div>
        </div>
      </div >
    </div>
  )
}

export default Join