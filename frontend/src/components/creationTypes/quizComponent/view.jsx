import React from 'react';
import { useAppearance } from '../../../context/AppearanceContext.jsx';

const View = ({ questionList, setLeft, setcurr, setQuestionList }) => {
    const { theme } = useAppearance();

    const handelEdit = (index) => {
        setcurr(index);
        setLeft(false);
    };

    const handelDelete = (ind) => {
        let a = confirm("Do you want to delete Question No. " + (ind + 1) + "?");
        if (a) {
            let updatedList = [...questionList];
            if (updatedList.length === 1) {
                // If deleting the last remaining question, reset to default empty template
                setQuestionList([{ question: "", option: ["", "", ""], correct_option: [], question_type: "Single" }]);
                setcurr(1);
            } else {
                updatedList = updatedList.filter((_, index) => index !== ind);
                // Maintain valid current selected question number
                setcurr(Math.max(1, Math.min(ind + 1, updatedList.length)));
                setQuestionList(updatedList);
            }
        }
    };

    const letterOptions = ["A", "B", "C", "D", "E", "F"];

    return (
        <div className="h-full w-full bg-card border border-border text-foreground rounded-2xl shadow-soft p-6 box-border flex flex-col gap-6 text-start overflow-y-auto max-h-[85vh] transition-all duration-300">
            {/* Sticky Header */}
            <div className="sticky top-0 left-0 bg-card z-10 pb-4 border-b border-border flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">View Questions</h2>
                    <p className="text-sm text-muted-foreground mt-1">Review all questions created in this workspace</p>
                </div>
                <button
                    onClick={() => setLeft('questionbar')}
                    className="h-9 w-9 rounded-xl flex items-center justify-center border border-border hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer shadow-sm"
                    title="Back to Editor"
                >
                    {/* Inline Close SVG Icon */}
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Questions Grid/List Container */}
            <div className="flex flex-col gap-6 overflow-y-auto pr-1">
                {questionList.length === 0 || (questionList.length === 1 && !questionList[0].question && questionList[0].option.every(o => !o)) ? (
                    <div className="text-xl text-center flex flex-col items-center justify-center font-semibold text-muted-foreground h-[40vh] gap-3">
                        <svg className="w-12 h-12 text-muted-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        No questions available
                    </div>
                ) : (
                    questionList.map((item, index) => {
                        return (
                            <div 
                                key={index} 
                                className="group relative bg-background/50 hover:bg-background/80 border border-border/80 hover:border-primary/20 rounded-xl p-5 flex flex-col gap-4 transition-all duration-300 shadow-soft hover:shadow-card"
                            >
                                {/* Top Header for each Card */}
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div className="flex flex-col gap-1.5 w-full">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-sm font-bold bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">
                                                Question {index + 1}
                                            </span>
                                            <span className="text-[11px] font-semibold bg-secondary/80 text-muted-foreground px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                {item.question_type === 'Single' ? "Single Choice" : "Multiple Choice"}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-foreground leading-snug mt-1">
                                            {item.question || <span className="italic text-muted-foreground/60">No question text entered yet</span>}
                                        </h3>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                                        <button
                                            onClick={() => handelEdit(index + 1)}
                                            className="flex items-center justify-center gap-1.5 h-8 px-3 rounded-lg text-xs font-semibold bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/10 transition-all duration-200 cursor-pointer shadow-sm"
                                            title="Edit this question"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handelDelete(index)}
                                            className="flex items-center justify-center gap-1.5 h-8 px-3 rounded-lg text-xs font-semibold bg-destructive/10 hover:bg-destructive text-destructive hover:text-destructive-foreground border border-destructive/10 transition-all duration-200 cursor-pointer shadow-sm"
                                            title="Delete this question"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Delete
                                        </button>
                                    </div>
                                </div>

                                {/* Options list */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                                    {item.option && item.option.map((opt, i) => {
                                        const isCorrect = item.correct_option && item.correct_option.includes(opt);

                                        return (
                                            <div 
                                                key={i} 
                                                className={`flex items-center justify-between gap-3 text-sm p-3 rounded-xl border transition-all duration-200 ${
                                                    isCorrect 
                                                        ? "bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-medium shadow-[0_0_10px_rgba(16,185,129,0.04)]" 
                                                        : "bg-secondary/40 hover:bg-secondary/60 border-border text-foreground/80"
                                                }`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className={`w-5 h-5 flex items-center justify-center text-xs font-bold rounded-md ${
                                                        isCorrect 
                                                            ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400" 
                                                            : "bg-card text-muted-foreground border border-border"
                                                    }`}>
                                                        {letterOptions[i] || i + 1}
                                                    </span>
                                                    <span>{opt || <span className="italic opacity-60">Empty option</span>}</span>
                                                </div>
                                                {isCorrect && (
                                                    <span className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 p-0.5 rounded-full">
                                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default View;
