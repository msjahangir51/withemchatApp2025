import React from 'react'
import { authStore } from '../store/authStore'
import { TriangleAlert } from 'lucide-react'

function ProfilePage() {
  const { authUser } = authStore()
  console.log(authUser)

  const notSETProfile = "/avatar.png";

  const dateObj = new Date(authUser.createdAt);
  const formatted = `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`;
  console.log(formatted)
  return (
    <div className='py-20 w-full min-h-screen h-auto'>
      {/* profile section  */}
      <div className='w-full flex items-center justify-center'>
        <div className='size-24 block rounded-full overflow-hidden'>
          <img className='w-full h-full object-cover' src={authUser.profilePic ? authUser.profilePic : notSETProfile} />
        </div>
      </div>
      {/* end of profile section  */}


      <div className='max-w-md mx-auto mt-8 space-y-6'>
        <div className='w-full h-12 border rounded-sm relative flex items-center'>
          <p className='absolute -top-3 left-2 bg-base-100 rounded-sm px-2 '>Fullname</p>
          <p className='ml-3'>{authUser.fullname}</p>
        </div>

        <div className='w-full h-12 border rounded-sm relative flex items-center'>
          <p className='absolute -top-3 left-2 bg-base-100 rounded-sm px-2 '>username</p>
          <p className='ml-3'>{authUser.username}</p>
        </div>


        {authUser.gender ? (
          <div className='w-full h-12 border rounded-sm relative flex items-center'>
            <p className='absolute -top-3 left-2 bg-base-100 rounded-sm px-2 '>gender</p>
            <p className='ml-3'>{authUser.gender}</p>
          </div>
        ) : null}
        {authUser.dateOfbirth ? (
          <div className='w-full h-12 border rounded-sm relative flex items-center'>
            <p className='absolute -top-3 left-2 bg-base-100 rounded-sm px-2 '>date of birth</p>
            <p className='ml-3'>{authUser.dateOfbirth}</p>
          </div>
        ) : null}

        {
          !authUser.gender || !authUser.dateOfbirth || !authUser.profilePic
            ? (
              <p className='flex gap-x-4 items-center'>Please go to Settings and set up your profile.<TriangleAlert className='animate-pulse text-warning' /></p>
            ) : ""
        }


        <div className='w-full h-12 flex items-center justify-between border-success/10 border-b-2 border-solid'>
          <h1>Status: </h1>
          <h1 className='text-success'>Active</h1>
        </div>

        <div className='w-full h-12 flex items-center justify-between border-secondary/10 border-b-2 border-solid'>
          <h1>Profile since: </h1>
          <h1 className='text-secondary'>{formatted}</h1>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage