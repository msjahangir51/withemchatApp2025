import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export const userStore = create((set)=>({
    fullnameUpdateLoading:false,
    usernameUpdateLoading:false,
    genderUpdateLoading:false,
    passwordUpdateLoading:false,
    isUpdatingProfile: false,

    updateFullname:async(data)=>{
        try {
            const res = await axiosInstance.put("/user/update-fullname", data)

            if(res.data.success === true) return toast.success("full name is updated")
        } catch (error) {
            toast.error("your fullname is updated failed")
        }
    },



    updateUsername:async(data)=>{
        try {
            const res = await axiosInstance.put("/user/update-username", data)

            if(res.data.success === true) return toast.success("username is updated")
        } catch (error) {
            toast.error("your username is updated failed")
        }
    },

    updateGender:async(data)=>{
        try {
            const res = await axiosInstance.put("/user/update-gender", data)

            if(res.data.success === true) return toast.success("gender is updated")
        } catch (error) {
            toast.error("your gender is updated failed")
        }
    },


    updateDateOfbirth:async(data)=>{
        try {
            const res = await axiosInstance.put("/user/update-dateOfbirth", data)

            if(res.data.success === true) return toast.success("dateOfbirth is updated")
        } catch (error) {
            toast.error("your dateOfbirth is updated failed")
        }
    },


    updatePassword:async(data)=>{
        try {
            const res = await axiosInstance.put("/user/update-password", data)

            if(res.success === true) return toast.success("password is updated")
        } catch (error) {
            toast.error("your password updated failed")
        }
    },
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
          const res = await axiosInstance.put("/user/update-profile", data);
          set({ authUser: res.data });
          toast.success("Profile updated successfully");
        } catch (error) {
          console.log("error in update profile:", error);
          toast.error(error.response.data.message);
        } finally {
          set({ isUpdatingProfile: false });
        }
      },
    

}))