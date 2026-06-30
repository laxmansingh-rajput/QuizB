import React from 'react'
import { useAppearance } from '../context/AppearanceContext.jsx'

const Practice = () => {
    const { theme, show } = useAppearance();
    return (
        <div className='h-[100vh] w-[100vw] fixed left-0 bg-background text-xl text-foreground transition-colors duration-280'>

            <div className={'h-full w-8/10 pt-20 bg-background text-xl text-foreground transition-all duration-280 ease-in-out fixed right-0 ' + ((show != "show") ? 'w-full' : '')
            }>
                practice
            </div >
        </div>
    )
}

export default Practice