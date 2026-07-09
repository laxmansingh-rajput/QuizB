import React, { useState } from 'react';
import { addQuiz } from '../../../controller/addQuiz'
import { useAuth } from "@clerk/react"

const Share = ({ setLeft, quizData }) => {
    // Controlled states for form fields
    const [title, setTitle] = useState('');
    const [password, setPassword] = useState('');
    const [duration, setDuration] = useState('');
    const { getToken } = useAuth();

    // Controlled states for scheduling fields
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');

    // Controlled state for end date
    // TODO: Implement the logic to default the end date (expiry date) to tomorrow's date.
    // I want to implement and learn this part myself.
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');

    // State for validation errors
    const [errors, setErrors] = useState({});

    // State for success feedback
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Limit and clean password/PIN inputs (allow only numbers, up to 6 digits)
    const handlePasswordChange = (e) => {
        const val = e.target.value;
        // Allow empty string or only digits up to 6 characters
        if (val === '' || (/^\d+$/.test(val) && val.length <= 6)) {
            setPassword(val);
            if (val.length === 6) {
                setErrors((prev) => ({ ...prev, password: '' }));
            }
        }
    };

    // Limit and clean duration input (allow only numbers)
    const handleDurationChange = (e) => {
        const val = e.target.value;
        if (val === '' || /^\d+$/.test(val)) {
            setDuration(val);
            if (val !== '') {
                setErrors((prev) => ({ ...prev, duration: '' }));
            }
        }
    };

    // Automatically set Start Date & Start Time to current local values
    const handleStartNow = () => {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const timeStr = `${hours}:${minutes}`;

        setStartDate(dateStr);
        setStartTime(timeStr);

        setErrors((prev) => ({
            ...prev,
            startDate: ''
        }));
    };

    const validate = () => {
        const newErrors = {};

        // Title validation
        if (!title.trim()) {
            newErrors.title = 'Quiz Title is required.';
        }

        // Password/PIN validation
        if (!password) {
            newErrors.password = 'Quiz Password is required.';
        } else if (password.length !== 6) {
            newErrors.password = 'Password must be exactly 6 digits.';
        } else if (!/^\d{6}$/.test(password)) {
            newErrors.password = 'Password must contain only numeric digits.';
        }

        // Duration validation
        if (!duration) {
            newErrors.duration = 'Quiz Duration is required.';
        } else if (isNaN(duration) || parseInt(duration, 10) <= 0) {
            newErrors.duration = 'Duration must be a positive number.';
        } else if (parseInt(duration, 10) > 300) {
            newErrors.duration = 'Duration must not exceed 300 min';
        }

        // Start Date validation (Compulsory)
        if (!startDate) {
            newErrors.startDate = 'Start Date is required.';
        }

        // End Date validation (Compulsory)
        if (!endDate) {
            newErrors.endDate = 'End Date is required.';
        }

        // Logical date check
        if (startDate && endDate) {
            const start = new Date(`${startDate}T${startTime || '00:00'}`);
            const end = new Date(`${endDate}T${endTime || '00:00'}`);
            if (end < start) {
                newErrors.endDate = 'End date cannot be before start date.';
            }
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
            setIsLoading(true);
            const token = await getToken();

            const response_data = await addQuiz(token, {
                title,
                quizData,
                password,
                startDate,
                startTime,
                endDate,
                endTime,
                type: 'Normal',
                duration: parseInt(duration, 10)
            })
            console.log(response_data)
            if (response_data && response_data.success) {
                setIsSuccess(true);
            }
            setIsLoading(false);
        }
    };

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
