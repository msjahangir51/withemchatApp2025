import axios from "axios";

 const axiosInstance = axios.create({
    baseURL: "https://chatappbackend2025.onrender.com/api",
    withCredentials:true
})
export default axiosInstance