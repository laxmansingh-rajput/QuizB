import axios from 'axios'

export const getCreation = async (token) => {
    try {
        const url = import.meta.env.VITE_BACKEND_URL
        const response = await axios.get(`${url}get_creation`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return response.data

    }
    catch (error) {
        console.log(error)
        return {
            success: false
        }
    }
}