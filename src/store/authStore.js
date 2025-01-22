import { create } from "zustand"
import axiosInstance from "../lib/axios"
import toast from "react-hot-toast"
import { messageStore } from "./messageStore"
export const authStore = create((set, get) => ({
    isLoading: true,
    authUser: null,
    SignUpLoading: false,
    signInLoading: false,


    checkAuth:async()=>{
        const connectSocket = messageStore.getState().connectSocket;
        try {
            const res = await axiosInstance.get("/auth/user");
            set({authUser: res.data});
            set({isLoading:false})
            connectSocket()
        } catch (error) {
            console.log(error.response.data.message)
        }finally{
            set({isLoading:false})
        }
    },
    signup: async (data) => {
        set({ SignUpLoading: true })
        try {
            const connectSocket = messageStore.getState().connectSocket;
            const res = await axiosInstance.post("/auth/signup", data)
            set({ authUser: res.data })
            toast.success("Account has been created")
            set({ SignUpLoading: false })
            connectSocket()
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            set({ SignUpLoading: false })
        }
    },

    signin: async (data) => {
        set({ signInLoading: true })
        
        try {
            const connectSocket = messageStore.getState().connectSocket;
            const res = await axiosInstance.post("/auth/signin", data)
            set({ authUser: res.data })
            toast.success("Loggin successfully")
            connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ signInLoading: false })
        }
    },
    logout:async()=>{
        try {
            const disconnectSocket = messageStore.getState().disconnectSocket;
            disconnectSocket()
            const res = await axiosInstance.get("/auth/logout");
            set({authUser:null})
            toast.success(res.data)
        } catch (error) {
            toast.error(res.response.data.message)
        }
    }
}))
