import RegisterForm from '@/components/RegisterForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

const Register = async () => {
  const session = await getServerSession(authOptions)

  if (session) redirect('/dashboard')

  return (
    <div className='bg-white flex items-center justify-center h-screen'>
      <RegisterForm />
    </div>
  )
}

export default Register
