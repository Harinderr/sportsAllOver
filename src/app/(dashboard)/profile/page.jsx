import Dash from '@/components/Dash/dashboard'
import Sidebar from '@/components/sidebar'
import { useSession } from 'next-auth/react'
import React from 'react'

const Profile = () => {
  
  return (
    <div className='w-full min-h-screen'>
      <Sidebar></Sidebar>
    </div>
  )
}

export default Profile