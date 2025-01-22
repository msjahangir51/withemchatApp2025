import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Toaster } from "react-hot-toast"
import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignupPage from "./pages/SignupPage"
import { authStore } from './store/authStore'
import { Loader } from 'lucide-react'
import ProfilePage from './pages/ProfilePage'
import SettingPage from './pages/SettingPage'
import { messageStore } from './store/messageStore'

function App() {
  const { checkAuth,authUser ,isLoading} = authStore()
  // const {connectSocket} = messageStore()
  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  if(isLoading) return <div className='w-full h-screen flex items-center justify-center'>
    <Loader className='loading-spinner'></Loader>
  </div>
  return (
    <div className='w-full min-h-screen'>
      <Navbar />
      <Routes>
        <Route path='/' element={authUser?<HomePage />: <Navigate to={"/signin"}/>} />
        <Route path='/signin' element={authUser?<Navigate to="/"/>:<SignInPage />} />
        <Route path='/signup' element={authUser?<Navigate to="/"/>:<SignupPage />} />
        <Route path='/profile' element={authUser? <ProfilePage />:<Navigate to="/signin"/>} />
        <Route path='/setting' element={authUser? <SettingPage />:<Navigate to="/signin"/>} />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />

    </div>
  )
}

export default App