import axios from "axios";

export const addQuiz = async (token, { title, quizData, password, startDate, startTime, endDate, endTime, type, duration }) => {
    try {
        const startEvent = new Date(startDate + " " + startTime + " " + " UTC")
        const endEvent = new Date(endDate + " " + endTime + " " + " UTC")
        const payload = {
            quiz_title: title,
            questions: quizData,
            start: startEvent.toISOString(),
            end: endEvent.toISOString(),
            password: parseInt(password, 10),
            quiz_type: type,
            quiz_duration: duration
        }
        console.log(payload)
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}add_quiz`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
        return error.response?.data || { success: false, message: error.message }
    }
}
export const saveQuiz = async ({ title, quizData }) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}add_quiz`,
            {
                quiz_title: title,
                questions: quizData,
                quiz_type: 'Saved'
            },
            {
                withCredentials: true
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
        return error.response?.data || { success: false, message: error.message }
    }
}