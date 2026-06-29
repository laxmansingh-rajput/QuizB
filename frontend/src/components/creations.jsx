import React from 'react'
import { useContext } from 'react';
import ModeContext from '../context/context.js'
const Creation = () => {
  const { mode, show } = useContext(ModeContext);
  return (
    <div className='h-[100vh] w-[100vw] fixed left-0 bg-background text-xl text-foreground transition-colors duration-280'>

    <div className={'h-full w-8/10 pt-20 bg-background text-xl text-foreground transition-all duration-280 ease-in-out fixed right-0 ' + ((show != "show") ? 'w-full' : '')
    }>
      Creation
    </div >
    </div>
  )
}

export default Creation