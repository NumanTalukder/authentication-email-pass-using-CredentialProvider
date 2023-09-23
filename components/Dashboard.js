'use client'

import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

const Dashboard = () => {
  const { data: session } = useSession()

  return (
    <div className='flex flex-col gap-4 border-t-4 border-green-700 py-10 px-8 rounded-lg shadow-md'>
      <div className='flex gap-2'>
        Name: <span>{session?.user?.name}</span>
      </div>
      <div className='flex gap-2'>
        Email: <span>{session?.user?.email}</span>
      </div>
      <button
        onClick={() => signOut()}
        className='w-[400px] bg-red-600 text-white py-2'
      >
        Logout
      </button>
    </div>
  )
}

export default Dashboard
