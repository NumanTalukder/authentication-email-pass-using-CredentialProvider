'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
  const router = useRouter()

  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError('All fields are necessary!')
    }

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (res.error) {
        setError('Invalid Credentials')
      }

      router.replace('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col gap-4 border-t-4 border-green-700 py-10 px-8 rounded-lg shadow-md'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='w-[400px] bg-green-700 text-white py-2'>
          Login
        </button>
      </form>
      <div className='flex flex-col'>
        {error && <div className='bg-red-500 p-2 rounded-md'>{error}</div>}
        <div className='flex gap-1 text-right'>
          Not Registered?
          <Link href='/register'>Register</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
