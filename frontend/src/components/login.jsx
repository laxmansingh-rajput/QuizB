import React, { useState } from 'react'
import qb from '../assets/quizB.svg'
import light from '../assets/light.png'
import { useContext } from 'react'
import dark from '../assets/dark.png'
import Modecontext from '../context/context.js'
import google from '../assets/google.svg'
import eye from '../assets/lightPshow.svg'
import heye from '../assets/lightPhide.svg'
import darkheye from '../assets/darkPhide.svg'
import darkeye from '../assets/darkPshow.svg'
import { useForm } from "react-hook-form"
import { Navigate, useNavigate } from 'react-router'
const Login = () => {
  const { mode } = useContext(Modecontext)
  const { register, handleSubmit } = useForm()
  const [pass, setpass] = useState(false)
  const onSubmit = (data) => console.log(data)
  const navigte = useNavigate()
  return (
    <div className='h-[100vh] w-[100vw] pt-11  bg-primary text-xl text-primary-text dark:bg-primary-dark dark:text-primary-dark-text flex items-center justify-center 
    '>
      <img src={qb} className='fixed top-3 left-5 h-15 cursor-pointer' onClick={() => navigte('/')} alt="" />
      <div className='h-3/4 w-1/2  rounded-2xl flex items-center justify-center bg-white dark:bg-[#28283b] dark:shadow-[#69698d] p-3 shadow-lg gap-2'>
        <div className='  w-1/2   flex flex-col items-center justify-center gap-7  '>
          <form onSubmit={handleSubmit(onSubmit)} className='h-full w-full flex flex-col items-center justify-center gap-6'>
            <div className='text-3xl font-bold'>
              Login
            </div>
            <div className='border rounded-md h-10 w-8/10 p-2 flex items-center justify-center font-mono font-medium cursor-pointer gap-2 hover:bg-black hover:text-white dark:hover:text-black dark:hover:bg-white'>
              <img src={google} className='h-6' alt="" /> Login With Google
            </div>
            <input {...register("firstName", { required: true, maxLength: 20 })} placeholder='Email' className='border rounded-md h-10 w-8/10 p-2' />
            <div className='h-full w-full relative'>
              <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} placeholder='Password' type={!pass ? 'password' : 'text'} className='border rounded-md h-10 w-8/10 p-2' />
              <img src={(pass ? ((mode == "dark") ? darkheye : heye) : ((mode == "dark") ? darkeye : eye))} className='absolute right-11 top-[11px] h-5 cursor-pointer'
                onClick={() => setpass(!pass)} alt="" />
            </div>
            <input type="submit" className='h-10  rounded-full pl-7 pr-7 text-2xl cursor-pointer bg-primary-button dark:bg-primary-dark-button hover:bg-[#357ABD]
             dark:hover:bg-[#72B5FF]  ' />
          </form>
        </div>
        <div className='border h-3/4'>

        </div>
        <div className={`h-full w-1/2 flex ${(mode == "dark") ? "" : ""} items-center justify-start`}>
          <img src={mode == "dark" ? dark : light} className='' alt="" />
        </div>
      </div>
    </div>
  )
}

export default Login