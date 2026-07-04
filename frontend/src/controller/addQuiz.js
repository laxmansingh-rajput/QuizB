import axios from "axios";

export const addQuiz = async ({ title, quizData, password, startDate, startTime, endDate, endTime, type }) => {
    try {
        const startEvent = new Date(startDate + " " + startTime + " " + " UTC")
        const endEvent = new Date(endDate + " " + endTime + " " + " UTC")
        console.log(quizData)
        const data = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}add_quiz`,
            {
                quiz_title: title,
                questions: quizData,
                start: startEvent.toISOString(),
                end: endEvent.toISOString(),
                password: parseInt(password, 10),
                quiz_type: type
            },
            {
                withCredentials: true
            }
        )

        
    } catch (error) {
        console.log(error)
    }
}
export const saveQuiz = async ({ title, quizData }) => {
    try {
        const data = await axios.post(
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
    } catch (error) {
        console.log(error)
    }
}