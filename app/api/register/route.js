import { connectMongoDB } from '@/lib/mongodb'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import User from '@/model/user'

export const POST = async (req) => {
  try {
    const { name, email, password } = await req.json()

    const hashedPass = await bcrypt.hash(password, 10)

    await connectMongoDB()
    User.create({ name, email, password: hashedPass })

    return NextResponse.json({ message: 'User Registered' }, { status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: `error: ${error}` }, { status: 500 })
  }
}
