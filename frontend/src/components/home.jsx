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
import { useAppearance } from '../context/AppearanceContext';
import { useNavigate } from 'react-router';
const Home = () => {
  const { theme, show } = useAppearance()
  const navigate = useNavigate();
  const handelHost = () => {
    navigate('/create');
  }
  const handelPractice=()=>{
        navigate('/practice');

  }
  return (
    <div className='h-[100vh] w-[100vw] fixed left-0 bg-background text-xl text-foreground transition-colors duration-280'>
      <div className={'h-full max-[750px]:w-full w-8/10 pt-20 bg-background flex items-start justify-center text-xl text-foreground overflow-auto transition-all duration-280 ease-in-out fixed min-w-[700px]:left-0 right-0 ' +
       (`${(show == "show") && "p-4"} `) + ((show != "show") ? 'w-full' : ' max-[950px]:w-3/4')
      }>
        <div className={'flex flex-col gap-3 mb-10 text-foreground max-[900px]:w-full p-5 ' + ((show != "show") ? "w-4/5" : "")}>
          <div className='flex flex-col gap-5 w-full'>
            <div className='text-3xl font-bold w-full text-start text-foreground'>
              Create & Practice Quizzes — Your Way
            </div>
            <div className='text-start text-muted-foreground'>
              Build quizzes your way — manually for full control or let our AI generate smart questions in seconds. Practice adaptively with personalized quizzes made just for you.
            </div>
            <div className='w-full flex justify-center  '>
              <div className='border border-border h-80 max-[700px]:h-50 w-1/2 max-[700px]:w-full rounded-md p-5 flex items-center justify-center bg-card text-muted-foreground shadow-soft'>
                Video to be displayed
              </div>
            </div>
            <div className="flex items-center justify-center flex-wrap gap-4 mt-2">
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-95 transition-all ease-in duration-150 px-6 py-1.5 font-semibold rounded-lg cursor-pointer"
               onClick={handelHost}>Host</button>
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-95 transition-all ease-in duration-150 px-6 py-1.5 font-semibold rounded-lg cursor-pointer" onClick={handelPractice}>Practice</button>
            </div>
          </div>

          <div className='mt-10 flex flex-col gap-6'>
            <div className='text-2xl text-start font-semibold text-foreground'>
              Features
            </div>
            <div className='cards flex items-center justify-center gap-8 flex-wrap'>

              <div className='h-70 w-60 rounded-2xl flex flex-col bg-card border border-border p-5 text-foreground justify-center gap-3 shadow-soft hover:shadow-card hover:scale-105 transition-all duration-300 ease-out cursor-pointer'>
                <div className=' h-10 text-center font-semibold text-lg'>
                  Create And Host
                </div>
                <div className='h-20 flex items-center justify-center'>
                  <img src={(theme == "dark" ? darkCardCreate : cardCreate)} className='h-full' alt="" />
                </div>
                <div className='text-base text-muted-foreground h-30 mt-2'>
                  Add your own questions and host live quizzes with full control.
                </div>
              </div>

              <div className='h-70 w-60 rounded-2xl flex flex-col bg-card border border-border p-5 text-foreground justify-center gap-3 shadow-soft hover:shadow-card hover:scale-105 transition-all duration-300 ease-out cursor-pointer'>
                <div className=' h-10 text-center font-semibold text-lg'>
                  Generate with AI
                </div>
                <div className='h-20 flex items-center justify-center'>
                  <img src={(theme == "dark" ? darkai : ai)} className='h-full' alt="" />
                </div>
                <div className='text-base text-muted-foreground h-30 mt-2'>
                  Enter a topic or text — let AI create a quiz for you in seconds.
                </div>
              </div>

              <div className='h-70 w-60 rounded-2xl flex flex-col bg-card border border-border p-5 text-foreground justify-center gap-3 shadow-soft hover:shadow-card hover:scale-105 transition-all duration-300 ease-out cursor-pointer'>
                <div className=' h-10 text-center font-semibold text-lg'>
                  Practice with AI
                </div>
                <div className='h-20 flex items-center justify-center'>
                  <img src={(theme == "dark" ? darkbow : bow)} className='h-full' alt="" />
                </div>
                <div className='text-base text-muted-foreground h-30 mt-2'>
                  Get smart, personalized quizzes based on your performance.
                </div>
              </div>

              <div className='h-70 w-60 rounded-2xl flex flex-col bg-card border border-border p-5 text-foreground justify-center gap-3 shadow-soft hover:shadow-card hover:scale-105 transition-all duration-300 ease-out cursor-pointer'>
                <div className=' h-10 text-center font-semibold text-lg'>
                  Results
                </div>
                <div className='h-20 flex items-center justify-center'>
                  <img src={(theme == "dark" ? result : darkresult)} className='h-full' alt="" />
                </div>
                <div className='text-base text-muted-foreground h-30 mt-2'>
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