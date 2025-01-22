import React, { useState } from 'react'
import StyleIngSingLeftSide from '../components/StyleIngSingLeftSide'
import { Eye, EyeClosed, EyeOff, Loader, MessageSquare } from 'lucide-react'
import {Link} from "react-router-dom"
import toast from 'react-hot-toast'
import { authStore } from '../store/authStore'

function SignInPage() {
  const {signin, signInLoading} = authStore()
  const [FormData,SetFormData]= useState({
    username:"",
    password:""
  })


  const handleSignin = (e)=>{
    e.preventDefault()
    if(!FormData.username || !FormData.password)return toast.error("All Fields are required!");
    if(FormData.username.trim().length < 4) return toast.error("Username must be at least 4 characters long")
    if(FormData.password.length< 8) return toast.error("Password must be at least 8 characters long")
    return signin(FormData)
  }

  const dataSetHandeler = (e)=>{
    const {name,value} = e.target;
    SetFormData({...FormData, [name]:value})

    console.log(FormData)
    
  }
  const [showpass,setShowPass] = useState(false)
  return (
    <div className='pt-10 w-full min-h-screen grid md:grid-cols-2  items-center gap-8'>
      <div className='w-full h-full flex items-center justify-center'>
        <form onSubmit={handleSignin} className='max-w-md w-auto mx-auto p-8 bg-base-300 rounded-sm'>
          <div className='flex items-center flex-col justify-center'>

            <div className='size-14 rounded-md bg-primary/5 flex items-center justify-center'>

              <MessageSquare className='size-6 text-primary' />
            </div>
            <h1 className='text-center text-2xl my-2'>Welcome back!</h1>
            <p className='text-center mb-4'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit?</p>
          </div>



          <div className='flex flex-col gap-4'>
            <div className='form-control'>
              <input onChange={dataSetHandeler} name='username' className='input input-bordered' type="text" placeholder='Enter your username' />
            </div>

            <div className='form-control relative'>
              <input onChange={dataSetHandeler} name='password' className='input input-bordered' type={!showpass?"password":"text"} placeholder='Enter your password' />
              
              {<button type='button' onClick={()=> setShowPass(!showpass)} className='absolute right-3 inset-y-0'>
               {showpass? <Eye/>: <EyeOff/>}
              </button>}
            </div>

            <button type='submit' className='btn btn-primary uppercase -tracking-wider' disabled={signInLoading}>{signInLoading? <Loader className='size-4 animate-spin'/>: ""}Sign in</button>
          </div>


          <p className='text-sm text-center text-base-content mt-4'>Don't have an account? <Link className='link-hover link-primary ml-1' to={"signup"}>signup</Link></p>
        </form>
      </div>
        <StyleIngSingLeftSide />
    </div>
  )
}

export default SignInPage