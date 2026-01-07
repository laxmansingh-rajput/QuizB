import React from 'react'
import { useContext } from 'react';
import cardCreate from '../assets/cardCreate.svg'
import darkCardCreate from '../assets/darkCardCreate.svg'
import ai from '../assets/ai.svg'
import darkai from '../assets/darkai.svg'
import bow from '../assets/bow.svg'
import darkbow from '../assets/darkbow.svg'
import darkresult from '../assets/result.svg'
import result from '../assets/darkresult.svg'
import ModeContext from '../context/context.js'
import { useNavigate } from 'react-router';
const Home = () => {
  const { mode, show } = useContext(ModeContext);
  const navigate = useNavigate();
  const handelHost = () => {
    navigate('/create');
  }
  const handelPractice=()=>{
        navigate('/practice');

  }
  return (
    <div className='h-[100vh] w-[100vw] fixed left-0 bg-primary text-xl text-primary-text dark:bg-primary-dark
     dark:text-primary-dark-text'>
      <div className={'h-full max-[750px]:w-full  w-8/10 pt-20  bg-primary flex items-start justify-center text-xl text-primary-text  overflow-auto dark:bg-primary-dark  transition-all duration-500 ease-in-out fixed min-w-[700px]:left-0 right-0 ' +
       (`${(show == "show") && "p-4"} `) + ((show != "show") ? 'w-full' : ' max-[950px]:w-3/4')
      }>
        <div className={'flex flex-col gap-3 mb-10 dark:text-primary-dark-text max-[900px]:w-full p-2 ' + ((show != "show") ? "w-4/5" : "")}>
          <div className='flex flex-col gap-5 w-full'>
            <div className='text-3xl font-bold w-full text-start'>
              Create & Practice Quizzes — Your Way
            </div>
            <div className='text-start dark:text-primary-dark-text'>
              Build quizzes your way — manually for full control or let our AI generate smart questions in seconds. Practice adaptively with personalized quizzes made just for you.
            </div>
            <div className='w-full flex justify-center  '>
              <div className='border h-80 max-[700px]:h-50 w-1/2 max-[700px]:w-full rounded-md p-5'>
                Video to be displayed
              </div>
            </div>
            <div class="flex  items-center justify-center flex-wrap gap-4 mt-2">
              <button class="bg-primary-buttom dark:bg-primary-dark-button hover:scale-95 transition-all ease-in duration-150 text-white px-6 py-1.5 font-semibold rounded-lg cursor-pointer
                "
               onClick={handelHost}>Host</button>
              <button class="bg-primary-buttom dark:bg-primary-dark-button hover:scale-95 transition-all ease-in duration-150 text-white px-6 py-1.5 font-semibold rounded-lg cursor-pointer  " onClick={handelPractice}>Practice</button>
            </div>
          </div>

          <div className='mt-10 flex flex-col gap-6'>
            <div className='text-2xl text-start font-semibold'>
              Features
            </div>
            <div className='cards flex items-center justify-center gap-8 flex-wrap'>

              <div className='h-70 w-60  rounded-2xl flex flex-col bg-primary-tool-card p-5 text-primary-tool-card-text dark:bg-primary-dark-card
               dark:text-primary-dark-card-text justify-center gap-3 shadow-xl hover:shadow-[5px_5px_20px_#1A2A43]/40 dark:hover:shadow-[5px_5px_20px_#485474]  transition-all duration-500 ease-out cursor-pointer'>
                <div className=' h-10 text-center font-medium'>
                  Create And Host
                </div>
                <div className='h-20 flex items-center justify-center'>
                  <img src={(mode == "dark" ? darkCardCreate : cardCreate)} className='h-full' alt="" />
                </div>
                <div className='text-lg h-30 '>
                  Add your own questions and host live quizzes with full control.
                </div>
              </div>

              <div className='h-70 w-60  rounded-2xl flex flex-col bg-primary-tool-card p-5 text-primary-tool-card-text dark:bg-primary-dark-card dark:text-primary-dark-card-text justify-center gap-3 shadow-xl hover:shadow-[5px_5px_20px_#1A2A43]/40 dark:hover:shadow-[5px_5px_20px_#485474]  transition-all duration-500 ease-out cursor-pointer'>
                <div className=' h-10 text-center font-medium'>
                  Generate with AI
                </div>
                <div className='h-20 flex items-center justify-center'>
                  <img src={(mode == "dark" ? darkai : ai)} className='h-full' alt="" />
                </div>
                <div className='text-lg h-30 '>
                  Enter a topic or text — let AI create a quiz for you in seconds.
                </div>
              </div>

              <div className='h-70 w-60  rounded-2xl flex flex-col bg-primary-tool-card p-5 text-primary-tool-card-text dark:bg-primary-dark-card dark:text-primary-dark-card-text justify-center gap-3 shadow-xl hover:shadow-[5px_5px_20px_#1A2A43]/40 dark:hover:shadow-[5px_5px_20px_#485474] t transition-all duration-300 ease-out cursor-pointer'>
                <div className=' h-10 text-center font-medium'>
                  Practice with AI
                </div>
                <div className='h-20 flex items-center justify-center'>
                  <img src={(mode == "dark" ? darkbow : bow)} className='h-full' alt="" />
                </div>
                <div className='text-lg h-30 '>
                  Get smart, personalized quizzes based on your performance.
                </div>
              </div>

              <div className='h-70 w-60  rounded-2xl flex flex-col bg-primary-tool-card p-5 text-primary-tool-card-text dark:bg-primary-dark-card dark:text-primary-dark-card-text justify-center gap-3 shadow-xl hover:shadow-[5px_5px_20px_#1A2A43]/40 dark:hover:shadow-[5px_5px_20px_#485474] t transition-all duration-300 ease-out cursor-pointer'>
                <div className=' h-10 text-center font-medium'>
                  Results
                </div>
                <div className='h-20 flex items-center justify-center'>
                  <img src={(mode == "dark" ? result : darkresult)} className='h-full' alt="" />
                </div>
                <div className='text-lg h-30 '>
                  Track scores instantly and see where you rank among others.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div>
  )
}

export default Home