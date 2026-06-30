import React, { useState } from 'react'
import Logo from './Logo'
import light from '../assets/light.png'
import dark from '../assets/dark.png'
import { useAppearance } from '../context/AppearanceContext.jsx'
import google from '../assets/google.svg'
import eye from '../assets/lightPshow.svg'
import heye from '../assets/lightPhide.svg'
import darkheye from '../assets/darkPhide.svg'
import darkeye from '../assets/darkPshow.svg'
import { useForm } from "react-hook-form"
import { Navigate, useNavigate } from 'react-router'
const Login = () => {
  const { theme } = useAppearance()
  const { register, handleSubmit } = useForm()
  const [pass, setpass] = useState(false)
  const onSubmit = (data) => console.log(data)
  const navigte = useNavigate()
  return (
    <div className='h-[100vh] w-[100vw] pt-11 bg-background text-xl text-foreground flex items-center justify-center transition-colors duration-280'>
      <Logo className='fixed top-3 left-5 h-15 cursor-pointer' onClick={() => navigte('/')} />
      <div className='h-3/4 w-1/2 rounded-2xl flex items-center justify-center bg-card border border-border text-card-foreground p-6 shadow-card gap-2'>
        <div className='w-1/2 flex flex-col items-center justify-center gap-7'>
          <form onSubmit={handleSubmit(onSubmit)} className='h-full w-full flex flex-col items-center justify-center gap-6'>
            <div className='text-3xl font-bold text-foreground'>
              Login
            </div>
            <div className='border border-border rounded-md h-10 w-8/10 p-2 flex items-center justify-center font-medium cursor-pointer gap-2 bg-secondary hover:bg-muted text-foreground transition-colors duration-200'>
              <img src={google} className='h-6' alt="" /> Login With Google
            </div>
            <input {...register("firstName", { required: true, maxLength: 20 })} placeholder='Email' className='w-8/10 p-2 h-10 bg-input border border-border text-foreground rounded-md focus:ring-ring focus:outline-none focus:ring-2' />
            <div className='h-full w-full relative flex justify-center'>
              <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} placeholder='Password' type={!pass ? 'password' : 'text'} className='w-8/10 p-2 h-10 bg-input border border-border text-foreground rounded-md focus:ring-ring focus:outline-none focus:ring-2' />
              <img src={(pass ? ((theme == "dark") ? darkheye : heye) : ((theme == "dark") ? darkeye : eye))} className='absolute right-[15%] top-[11px] h-5 cursor-pointer z-10'
                onClick={() => setpass(!pass)} alt="" />
            </div>
            <input type="submit" className='h-10 rounded-full px-8 text-xl cursor-pointer bg-primary text-primary-foreground font-semibold hover:bg-primary/95 transition-colors duration-200' />
          </form>
        </div>
        <div className='border-l border-border h-3/4'>

        </div>
        <div className={`h-full w-1/2 flex items-center justify-start`}>
          <img src={theme == "dark" ? dark : light} className='' alt="" />
        </div>
      </div>
    </div>
  )
}

export default Login