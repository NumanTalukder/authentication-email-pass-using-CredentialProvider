import { connectMongoDB } from '@/lib/mongodb'
import User from '@/model/user'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials

        await connectMongoDB()
        const user = User.findOne({ email })

        if (!user) {
          return null
        }

        const matchPass = bcrypt.compare(password, user.password)

        if (!matchPass) {
          return null
        }

        return user
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
