import React from 'react'
import Sidebar from '../components/SideBar'
import { EqualApproximatelyIcon, MessageSquare } from 'lucide-react'
import { messageStore } from '../store/messageStore'
import MessageBox from '../components/MessageBox'
function HomePage() {
  const {selectUser} = messageStore()
  return (
    <div className='w-full h-screen md:py-20 px-5 flex'>
      <Sidebar/>
      
      {selectUser?<MessageBox/> :(<div className='hidden w-full h-full md:flex items-center justify-center flex-col p-4'>
        <div className='size-16 bg-primary/5 rounded-md flex items-center justify-center'>
          <MessageSquare className='size-7'/>
        </div>

        <h1 className='text-xl'>Message is Empty</h1>
      </div>)}
    </div>
  )
}

export default HomePage