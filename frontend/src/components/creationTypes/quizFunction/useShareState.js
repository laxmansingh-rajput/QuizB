import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from "@clerk/react";
import { addQuiz } from '../../../controller/addQuiz';

const useShareState = (quizData) => {
    // Controlled states for form fields
    const [title, setTitle] = useState('');
    const [password, setPassword] = useState('');
    const [duration, setDuration] = useState('');
    const { getToken } = useAuth();
    const navigate = useNavigate();
    const [apiError, setApiError] = useState('');

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
            setApiError('');
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
            setApiError('');
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
        setApiError('');
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
            setApiError('');
        } else {
            setErrors({});
            setApiError('');
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
            });
            console.log(response_data);
            if (response_data && response_data.success) {
                setIsSuccess(true);
                navigate('/creation');
            } else {
                const errorMsg = response_data?.detail || response_data?.message || (typeof response_data === 'string' ? response_data : JSON.stringify(response_data)) || 'An error occurred';
                setApiError(errorMsg);
                setIsSuccess(false);
            }
            setIsLoading(false);
        }
    };

    return {
        title, setTitle,
        password, setPassword,
        duration, setDuration,
        startDate, setStartDate,
        startTime, setStartTime,
        endDate, setEndDate,
        endTime, setEndTime,
        errors, setErrors,
        isSuccess, setIsSuccess,
        isLoading, setIsLoading,
        apiError, setApiError,
        handlePasswordChange,
        handleDurationChange,
        handleStartNow,
        handleSubmit
    };
};

export default useShareState;
