import axios from "axios";


export const BASE_URL = "http://localhost:8080";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
})

export const saveToken = async (key: string, value: string) => {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        console.error(error);
    }
}

axiosInstance.interceptors.request.use(async (req) => {
    try {
        const token = localStorage.getItem("user_token");
        req.headers.Authorization = `Bearer ${token}`;
        return req;
    } catch (error) {
        console.error(error);
        return req;
    }
})

export const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

export const postFetcher = (url: string, data: any) => axiosInstance.post(url, data).then((res) => res.data);

export const putFetcher = (url: string, data: any) => axiosInstance.put(url, data).then((res) => res.data);

export const deleteFetcher = (url: string) => axiosInstance.delete(url).then((res) => res.data);

export default axiosInstance