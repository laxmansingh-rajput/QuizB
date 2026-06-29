import React from 'react';
import edit from '../../assets/lightedit.svg';
import darkedit from '../../assets/darkedit.svg';
import ModeContext from '../../../context/context.js';
import { useContext } from 'react';
import cancel from '../../assets/cancel.svg';
import darkcancel from '../../assets/darkcancel.svg';
import del from '../../assets/delete.svg';
import darkdel from '../../assets/darkdelete.svg';

const View = ({ List, setview, setcurr, setList }) => {
    const { mode } = useContext(ModeContext);

    const handelEdit = (index) => {
        setcurr(index);
        setview(false);
    };
    const handelDelete = (ind) => {
        let a = confirm("do you want to delet question No" + ind + 1)
        if (a) {
            let updatedList = [...List];
            updatedList = updatedList.filter((_, index) => index !== ind);
            setcurr(Math.max(1, ind))
            setList(updatedList);

        }

    };

    return (
        <div className={'h-auto w-full bg-card text-foreground rounded-2xl shadow-soft p-6 box-border pt-0 gap-6 text-start relative '
            +(List.length<=2 &&("h-full"))
        }>
            <div className='sticky top-0 left-0 text-2xl font-semibold w-full flex items-center justify-center h-10 bg-card z-48'>
                <div className='h-10 w-full text-center flex items-center justify-center relative mt-2 text-foreground'>
                    View
                    <img
                        src={mode === 'dark' ? darkcancel : cancel}
                        className='h-8 rounded hover:bg-black/20 absolute cursor-pointer right-0 top-[2px]'
                        onClick={() => setview(false)}
                        alt="cancel"
                    />
                </div>
            </div>

            {/* List Content */}
            {List.length === 0 ? (
                <div className="text-xl text-center flex items-center justify-center font-semibold h-[40vh]">
                    No questions available
                </div>
            ) : (
                List.map((key, index) => (
                    <div key={index} className='border-b pb-4 relative pt-3'>
                        <div className='flex absolute top-2 right-2 h-10 items-center justify-center gap-2'>
                            <img
                                src={mode === 'dark' ? darkedit : edit}
                                className='h-full  rounded hover:bg-black/20 cursor-pointer'
                                alt="edit"
                                onClick={() => handelEdit(index + 1)}
                            />
                            <img
                                src={mode === 'dark' ? darkdel : del}
                                className='h-full  rounded hover:bg-black/20 cursor-pointer'
                                alt="edit"
                                onClick={() => handelDelete(index)}
                            />
                        </div>

                        <div className='text-lg font-semibold mb-1'>
                            {`Q${index + 1}: ${key.question || "No Question"}`}
                        </div>

                        <div className='ml-4 mb-1'>
                            <div className='font-medium mb-1'>Options:</div>
                            {key.option.map((opt, ind) => (
                                <div key={ind} className='ml-2'>
                                    {`Option ${ind + 1}: ${opt || "Not Declared Yet"}`}
                                </div>
                            ))}
                        </div>

                        <div className='ml-4'>
                            <div className='font-medium mb-1'>Correct Answer(s):</div>
                            {key.correct.length === 0 ? (
                                <div className='ml-2 text-gray-500 dark:text-[#F5F5F5]'>None selected</div>
                            ) : (
                                key.correct.map((corr, i) => (
                                    <div key={i} className='ml-2'>
                                        {key.option[corr]
                                            ? `Option ${+corr + 1}: ${key.option[corr]}`
                                            : `Index ${corr} (Invalid)`
                                        }
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default View;
