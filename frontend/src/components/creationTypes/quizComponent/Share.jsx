import React from 'react';
import useShareState from '../quizFunction/useShareState';

const Share = ({ setLeft, quizData }) => {
    const {
        title,
        password,
        duration,
        startDate,
        startTime,
        endDate,
        endTime,
        errors,
        isSuccess,
        isLoading,
        apiError,
        setTitle,
        setStartDate,
        setEndDate,
        setEndTime,
        setApiError,
        setErrors,
        handlePasswordChange,
        handleDurationChange,
        handleStartNow,
        handleSubmit
    } = useShareState(quizData);

    return (
        <div className="h-full w-full bg-card border border-border text-foreground rounded-2xl shadow-soft p-6 box-border flex flex-col gap-6 text-start overflow-y-auto max-h-[85vh] transition-all duration-300">
            {/* Sticky Header */}
            <div className="sticky top-0 left-0 bg-card z-10 pb-4 border-b border-border flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Share Quiz</h2>
                    <p className="text-sm text-muted-foreground mt-1">Configure sharing and access settings for your quiz</p>
                </div>
                <button
                    type="button"
                    onClick={() => !isLoading && setLeft('questionbar')}
                    disabled={isLoading}
                    className={`h-9 w-9 rounded-xl flex items-center justify-center border border-border hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer shadow-sm focus:outline-none ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                                <p className="font-bold">Quiz ready to share!</p>
                                <p className="opacity-90 mt-0.5">Your configurations have been saved successfully.</p>
                            </div>
                        </div>
                    )}

                    {/* Error Alert Banner */}
                    {apiError && (
                        <div className="bg-destructive/10 border border-destructive/30 text-destructive p-4 rounded-xl flex items-start gap-3 transition-all duration-300">
                            <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <div className="text-sm">
                                <p className="font-bold">Error sharing quiz</p>
                                <p className="opacity-90 mt-0.5">{apiError}</p>
                            </div>
                        </div>
                    )}

                    {/* General Settings Group */}
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
                                    setApiError('');
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

                        {/* Quiz Password / PIN Field */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="quiz-password" className="text-xs font-semibold text-foreground flex items-center justify-between">
                                <span>Quiz Password / PIN (6 digits) <span className="text-destructive font-bold">*</span></span>
                            </label>
                            <input
                                id="quiz-password"
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                placeholder="e.g. 123456"
                                value={password}
                                onChange={handlePasswordChange}
                                className={`w-full px-3 py-2 bg-input border ${errors.password ? 'border-destructive focus:ring-2 focus:ring-destructive' : 'border-border focus:ring-2 focus:ring-ring'
                                    } text-foreground rounded-xl placeholder:text-muted-foreground/40 focus:outline-none transition-all duration-200 text-xs font-mono tracking-wider`}
                            />
                            {errors.password && (
                                <span className="text-[10px] font-semibold text-destructive mt-0.5">
                                    {errors.password}
                                </span>
                            )}
                        </div>

                        {/* Quiz Duration (in minutes) Field */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="quiz-duration" className="text-xs font-semibold text-foreground flex items-center justify-between">
                                <span>Quiz Duration (in minutes) <span className="text-destructive font-bold">*</span></span>
                            </label>
                            <input
                                id="quiz-duration"
                                type="text"
                                inputMode="numeric"
                                placeholder="e.g. 30"
                                value={duration}
                                onChange={handleDurationChange}
                                className={`w-full px-3 py-2 bg-input border ${errors.duration ? 'border-destructive focus:ring-2 focus:ring-destructive' : 'border-border focus:ring-2 focus:ring-ring'
                                    } text-foreground rounded-xl placeholder:text-muted-foreground/40 focus:outline-none transition-all duration-200 text-xs`}
                            />
                            {errors.duration && (
                                <span className="text-[10px] font-semibold text-destructive mt-0.5">
                                    {errors.duration}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Schedule Settings Group */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 border-b border-border/40 pb-1.5">Scheduling</h3>

                        {/* Start and End Settings (Responsive 4-column / 2x2 grid) */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                            {/* Start Date */}
                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center justify-between gap-1">
                                    <label htmlFor="start-date" className="text-xs font-semibold text-foreground truncate">
                                        Start Date <span className="text-destructive font-bold">*</span>
                                    </label>
                                    <button
                                        type="button"
                                        onClick={handleStartNow}
                                        className="text-[10px] font-bold text-primary hover:underline cursor-pointer whitespace-nowrap shrink-0"
                                    >
                                        Now
                                    </button>
                                </div>
                                <input
                                    id="start-date"
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => {
                                        setStartDate(e.target.value);
                                        if (e.target.value) {
                                            setErrors((prev) => ({ ...prev, startDate: '' }));
                                        }
                                        setApiError('');
                                    }}
                                    className={`w-full px-3 py-2 bg-input border ${errors.startDate ? 'border-destructive focus:ring-2 focus:ring-destructive' : 'border-border focus:ring-2 focus:ring-ring'
                                        } text-foreground rounded-xl focus:outline-none transition-all duration-200 text-xs`}
                                />
                                {errors.startDate && (
                                    <span className="text-[10px] font-semibold text-destructive mt-0.5">
                                        {errors.startDate}
                                    </span>
                                )}
                            </div>

                            {/* Start Time */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="start-time" className="text-xs font-semibold text-foreground">
                                    Start Time
                                </label>
                                <input
                                    id="start-time"
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    className="w-full px-3 py-2 bg-input border border-border focus:ring-2 focus:ring-ring text-foreground rounded-xl focus:outline-none transition-all duration-200 text-xs"
                                />
                            </div>

                            {/* End Date */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="end-date" className="text-xs font-semibold text-foreground">
                                    End Date <span className="text-destructive font-bold">*</span>
                                </label>
                                <input
                                    id="end-date"
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => {
                                        setEndDate(e.target.value);
                                        if (e.target.value) {
                                            setErrors((prev) => ({ ...prev, endDate: '' }));
                                        }
                                        setApiError('');
                                    }}
                                    className={`w-full px-3 py-2 bg-input border ${errors.endDate ? 'border-destructive focus:ring-2 focus:ring-destructive' : 'border-border focus:ring-2 focus:ring-ring'
                                        } text-foreground rounded-xl focus:outline-none transition-all duration-200 text-xs`}
                                />
                                {errors.endDate && (
                                    <span className="text-[10px] font-semibold text-destructive mt-0.5">
                                        {errors.endDate}
                                    </span>
                                )}
                            </div>

                            {/* End Time */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="end-time" className="text-xs font-semibold text-foreground">
                                    End Time
                                </label>
                                <input
                                    id="end-time"
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    className="w-full px-3 py-2 bg-input border border-border focus:ring-2 focus:ring-ring text-foreground rounded-xl focus:outline-none transition-all duration-200 text-xs"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Button Action Bar */}
                <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-border">
                    <button
                        type="button"
                        onClick={() => !isLoading && setLeft('questionbar')}
                        disabled={isLoading}
                        className={`px-5 h-10 rounded-xl text-sm font-semibold border border-border hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-ring ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`px-6 h-10 rounded-xl text-sm font-semibold bg-primary hover:bg-primary/95 text-primary-foreground transition-all duration-200 cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-ring ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Sharing...' : 'Share Quiz'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Share;
