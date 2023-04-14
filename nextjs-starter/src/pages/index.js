import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useAuth, SignIn, SignedOut, SignedIn} from '@clerk/nextjs'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <h1>Welcome to John Lei's Todo App</h1>
      <SignedOut>
        <SignIn redirectUrl={"/todo"}/>
      </SignedOut>
      <SignedIn>
      <Link href={`/todo/`}>If signed in, click here to go to todos </Link>
      </SignedIn>
    </>
  )
}
