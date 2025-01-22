import React, { useEffect } from 'react'
import { LogIn, LogInIcon, LogOut, MessageSquare, Settings, Settings2, User } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { authStore } from '../store/authStore';
function Navbar() {
  const location = useLocation();

  const {authUser ,logout} = authStore()
  return (
    <div className='z-10 fixed top-0 left-0 right-0 flex justify-between items-center w-full bg-base-200 p-4 border-b border-primary/50'>

      {/* logo  */}
      <Link to="/" className='flex items-center group gap-x-3 cursor-pointer'>
        <div className='size-10 bg-primary/5 rounded-md group-hover:bg-primary/10 flex items-center justify-center select-none'>
          <MessageSquare className='size-5 text-primary select-none' />
        </div>
        <h1 className='text-primary tracking-wider select-none'>WITH {" "} ME</h1>
      </Link>
      {/* end of logo  */}

      {
        authUser ? (
          <div>
            <Link to="/setting" className="btn btn-sm">
              <Settings className='size-4' />
              <p className='text-xs hidden md:block'>Settings</p>
            </Link>


            <Link to="/profile" className="btn btn-sm">
              <User className='size-4' />
              <p className='text-xs hidden md:block'>Profile</p>
            </Link>
            <button onClick={logout} className="btn btn-sm">
              <LogOut className='size-4' />
              <p className='text-xs hidden md:block'>Logout</p>
            </button>
          </div>
        ) : (
          <div>
            {

              location.pathname === '/signup' ? (
                <Link to="/signin" className="btn btn-sm btn-primary">
                  Sign In
                </Link>
              ) : location.pathname === '/signin' ? (
                <Link to="/signup" className="btn btn-sm btn-secondary">
                  Sign Up
                </Link>
              ) : <Link to="/signin" className="btn btn-sm btn-primary">
                Sign In
              </Link>}
          </div>
        )
      }
    </div>
  )
}

export default Navbar