import { create } from "zustand";
import axiosInstance from "../lib/axios"
import { io } from "socket.io-client"
import { authStore } from "./authStore";
const BASE_URL = "https://chatappbackend2025.onrender.com"
export const messageStore = create((set, get) => ({
    sidebarUsers: null,
    SidebarUserLoading: true,
    selectUser: false,
    selectUserData: null,
    messages: [],
    hasMore: true,
    skip: 0,
    limit: 10,
    socket: null,
    onlineUsers: null,
    selectedUsers: async (data) => {
        try {
            set({ selectUserData: data })
            set({ selectUser: true })
        } catch (error) {
            console.log(error.response.data.message)
        }
    },
    closedUsers: async (data) => {
        try {
            set({ selectUserData: null })
            set({ selectUser: false })
        } catch (error) {
            console.log(error.response.data.message)
        }
    },
    sendMessage: async (receiverId, text) => {
        try {
            const res = await axiosInstance.post("/message/send-message", { receiverId, text })
            const newMessage = res.data.message
            set((state) => ({
                messages: [...state.messages, newMessage]
            }))

        } catch (error) {
            console.log(error.response.data.message)
        }
    },

    sidebarUser: async () => {
        try {
            const res = await axiosInstance.get("/message/sidebarUser");
            set({ sidebarUsers: res.data })
            set({ SidebarUserLoading: false })
        } catch (error) {
            console.log(error.response.data)
        } finally {
            set({ SidebarUserLoading: false })
        }
    },
    loadMessages: async (receiverId) => {
        const { skip, limit } = get();
        try {

            console.log(get().selectUserData._id)
            const response = await axiosInstance.get("/message/load-message", {
                params: { skip, limit, receiverId: get().selectUserData._id },
            });
            const newMessages = response.data.messages;

            set((state) => {
                return {
                    messages: [...state.messages, ...newMessages],
                    hasMore: newMessages.length >= limit,
                    skip: state.skip + limit,
                };
            });

        } catch (error) {
            console.log(error.response.data.message)
        }
    },
    subscribeToMessages: () => {
        const { selectUserData, socket, messages } = get()
        if (!selectUserData) return;
        socket.on("newMessage", (newMessage) => {
            console.log("new message ", newMessage)
            set((state) => ({
                messages: [...state.messages, newMessage]
            }))
        })
    },
    UnsubscribeToMessages: () => {
        const { socket } = get()
        socket.off("newMessage")
    },
    resetMessages: () => {
        set({
            messages: [],
            hasMore: true,
            skip: 0,
        });
    },
    connectSocket: () => {
        const authUser = authStore.getState().authUser;
        if (!authUser || get.socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id
            },
            withCredentials: true,
        })

        set({ socket: socket })
        socket.connect();

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds })
        })
    },

    disconnectSocket: () => {
        if (!get().socket?.connected) get().socket.disconnect();
    }


}))