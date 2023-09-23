'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const RegisterForm = () => {
  const router = useRouter()

  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !email || !password) {
      setError('All fields are necessary!')
    }

    const resUserExists = await fetch('/api/userExists', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    })

    const { user } = await resUserExists.json()

    if (user) {
      setError('This email is taken!')
      return
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      if (res.ok) {
        const form = e.target
        form.reset()
        setName('')
        setEmail('')
        setPassword('')
        router.push('/')
      } else {
        console.log('User Registration Failed')
      }
    } catch (error) {
      console.log(`error: ${error}`)
    }
  }

  return (
    <div className='flex flex-col gap-4 border-t-4 border-green-700 py-10 px-8 rounded-lg shadow-md'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
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
          Register
        </button>
      </form>
      <div className='flex flex-col'>
        {error && <div className='bg-red-500 p-2 rounded-md'>{error}</div>}

        <div className='flex gap-1 text-right'>
          Already Registered?
          <Link href='/'>Login</Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
