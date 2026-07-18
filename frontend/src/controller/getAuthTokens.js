import { useAuth } from "@clerk/react";
export const getAuthTokens = async () => {
    const { getToken } = useAuth()
    return await getToken()
}