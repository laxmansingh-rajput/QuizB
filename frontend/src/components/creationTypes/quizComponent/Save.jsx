import React, { useState } from 'react';
import { saveQuiz } from '../../../controller/addQuiz';

const Save = ({ setLeft, quizData }) => {
    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState({});
    const [isSuccess, setIsSuccess] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!title.trim()) {
            newErrors.title = 'Quiz Title is required.';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsSuccess(false);
        } else {
            setErrors({});
            setIsSuccess(true);
            await saveQuiz({ title, quizData });
            console.log('Quiz Saved:', { title });
        }
    };

    return (
        <div className="h-full w-full bg-card border border-border text-foreground rounded-2xl shadow-soft p-6 box-border flex flex-col gap-6 text-start overflow-y-auto max-h-[85vh] transition-all duration-300">
            {/* Header */}
            <div className="sticky top-0 left-0 bg-card z-10 pb-4 border-b border-border flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Save Quiz</h2>
                    <p className="text-sm text-muted-foreground mt-1">Configure saving and template settings for your quiz</p>
                </div>
                <button
                    type="button"
                    onClick={() => setLeft('questionbar')}
                    className="h-9 w-9 rounded-xl flex items-center justify-center border border-border hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer shadow-sm focus:outline-none"
                    title="Back to Editor"
                >
                    {/* Inline Close SVG Icon */}
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 justify-between">
                <div className="flex flex-col gap-6">
                    {/* Success Alert Banner */}
                    {isSuccess && (
                        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 p-4 rounded-xl flex items-start gap-3 transition-all duration-300">
                            <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="text-sm">
                                <p className="font-bold">Quiz saved successfully!</p>
                                <p className="opacity-90 mt-0.5">Your configurations have been saved.</p>
                            </div>
                        </div>
                    )}

                    {/* Settings Group */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 border-b border-border/40 pb-1.5">General Settings</h3>

                        {/* Quiz Title Field */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="quiz-title" className="text-xs font-semibold text-foreground flex items-center justify-between">
                                <span>Quiz Title <span className="text-destructive font-bold">*</span></span>
                            </label>
                            <input
                                id="quiz-title"
                                type="text"
                                placeholder="Enter a descriptive quiz title"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    if (e.target.value.trim()) {
                                        setErrors((prev) => ({ ...prev, title: '' }));
                                    }
                                }}
                                className={`w-full px-3 py-2 bg-input border ${errors.title ? 'border-destructive focus:ring-2 focus:ring-destructive' : 'border-border focus:ring-2 focus:ring-ring'
                                    } text-foreground rounded-xl placeholder:text-muted-foreground/40 focus:outline-none transition-all duration-200 text-xs`}
                            />
                            {errors.title && (
                                <span className="text-[10px] font-semibold text-destructive mt-0.5">
                                    {errors.title}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Button Action Bar */}
                <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-border">
                    <button
                        type="button"
                        onClick={() => setLeft('questionbar')}
                        className="px-5 h-10 rounded-xl text-sm font-semibold border border-border hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 h-10 rounded-xl text-sm font-semibold bg-primary hover:bg-primary/95 text-primary-foreground transition-all duration-200 cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                        Save Quiz
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Save;
