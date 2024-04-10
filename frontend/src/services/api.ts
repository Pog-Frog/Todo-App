import axiosInstance, {saveToken} from "./config";


export const registerUser = async (user: User) => {
    try {
        const response = await axiosInstance.post("/api/signup", user);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const loginUser = async ({email, password}: { email: string, password: string }) => {
    try {
        const response = await axiosInstance.post("/api/login", {email, password});
        const {token} = response.data;
        await saveToken("user_token", token);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
