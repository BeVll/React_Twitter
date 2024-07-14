import axios from "axios";
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});
console.log(import.meta.env.VITE_API_URL);
export const apiForm = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "multipart/form-data"
    }
});