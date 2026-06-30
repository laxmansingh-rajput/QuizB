import React from 'react';
import sun from './assets/sun.svg';
import moon from './assets/moon.svg';
import Logo from '../Logo';
import { useAppearance } from '../../context/AppearanceContext.jsx';

const Nav = () => {
    const { theme, setTheme } = useAppearance();
    return (
        <div className='fixed top-0 left-0 z-50 h-12 w-full bg-card border-b border-border text-foreground box-border px-2 flex items-center justify-between shadow-soft transition-colors duration-280'>
            <div className='flex items-center justify-start gap-2'>
                <Logo className='h-10 cursor-pointer' onClick={() => window.location.href = '/'} />
            </div>
            <div className='h-6 w-12 box-border px-1 cursor-pointer rounded-full bg-secondary flex items-center justify-start relative'
                onClick={() => {
                    setTheme(theme === 'light' ? 'dark' : 'light');
                }}>
                <img src={theme === 'dark' ? moon : sun} className={'select-none h-4 transition-all ease-in-out duration-500 absolute ' + (theme === 'dark' ? "translate-x-5 rotate-360" : "translate-x-0 -rotate-360")} alt="" />
            </div>
        </div>
    );
};

export default Nav;
