import React, { useContext, useState, useEffect, useRef } from 'react';
import Card from './card.jsx';
import quiz from '../assets/quiz.svg';
import darkquiz from '../assets/darkquiz.svg';
import survey from '../assets/survey.svg';
import darksurvey from '../assets/darksurvey.svg';
import bot from '../assets/bot.svg';
import darkbot from '../assets/darkbot.svg';
import ModeContext from '../context/context.js';

const Create = () => {
  const { mode, show, setshow } = useContext(ModeContext);
  const blockRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (blockRef.current) {
        setWidth(blockRef.current.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const shouldStack = show === "show" && width < 750;

  return (
    <div className="min-h-screen w-screen relative overflow-y-auto box-border overflow-x-hidden bg-background text-foreground transition-colors duration-280">
      <div className="min-h-[100vh] w-[100vw] absolute left-0 bg-background text-xl text-foreground box-border transition-colors duration-280">
        <div
          className={
            'min-h-full pt-20 bg-background text-xl text-foreground transition-all duration-280 ease-in-out absolute max-[750px]:w-full min-w-[700px]:left-0 right-0 ' +
            (show !== 'show' ? 'w-full' : 'max-[950px]:w-3/4 w-8/10')
          }
          ref={blockRef}
        >
          <h1 className="text-4xl font-bold text-foreground p-5 mt-5 box-border">
            Select Your Preference
          </h1>
          <div
            className={
              'h-auto cards w-full flex items-center gap-12 justify-center max-[730px]:flex-col mt-10 ' +
              (shouldStack ? 'flex-col' : '')
            }
          >
            <Card name="Quiz" w={width} svg={quiz} darksvg={darkquiz} />
            <Card name="Survey" w={width} svg={survey} darksvg={darksurvey} />
            <Card name="Use AI" w={width} svg={bot} darksvg={darkbot} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
