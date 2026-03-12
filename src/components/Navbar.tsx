'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

const Navbar = () => {

    const {data: session} = useSession();
    const user: User = session?.user as User; 

      const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY) {
        // scrolling down
        setShowNavbar(false)
      } else {
        // scrolling up
        setShowNavbar(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [lastScrollY])

  return (
    <nav className={`sticky top-0 left-0 mt-5 w-full z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"}`}>
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
            <a className='text-xl font-bold mb-4 md:mb-0' href="/dashboard">Mystery Message</a>
            {
                session? (
                    <>
                    <span className='mr-4'>Welcome, {user.username || user.email}</span>
                    <Button className='w-full md:w-auto' onClick={()=> signOut()}>Logout</Button>
                    </>
                ) : (
                    <Link href={'/sign-in'}> 
                    <Button className='w-full md:w-auto'>Login</Button>
                    </Link>
                )
            } 
        </div>
        <Separator className='mt-5' />
    </nav>
  )
}

export default Navbar