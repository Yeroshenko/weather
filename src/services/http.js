import axios from "axios";

export const http = axios.create({
    withCredentials: false,
    baseURL: process.env.VUE_APP_API
});
