'use client'

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useAuth
} from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { Toaster } from './ui/sonner'
import { useEffect, useState } from 'react'

const Header = () => {
  const pathname = usePathname()
  const { sessionClaims } = useAuth()
  const [scrolled, setScrolled] = useState(false);

  const hideHeaderRoutes = ['/admin', '/creator', '/']
  const shouldHideHeader = hideHeaderRoutes.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  )

  const roleClaim = sessionClaims?.metadata?.role;
  const isAdmin = !!roleClaim && String(roleClaim).toUpperCase() === "ADMIN";

  useEffect(() => {
    if (shouldHideHeader) return;

    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [shouldHideHeader]);

  if (shouldHideHeader) {
    return null;
  }

  return (
    <header className={`flex justify-between items-center sticky top-0 bg-white z-10 transition-all duration-500 gap-4 h-16 rounded-b-xl px-4 max-w-7xl mx-auto ${scrolled ? 'shadow-sm' : ''}`}>
      <div>
        <Link href='/'><h2 className='text-xl font-serif'>Happenings</h2></Link>
      </div>
      <div className='flex items-center space-x-2'>
        <SignedOut>
          <SignInButton>
            <Button>
              SignIn
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          {!isAdmin && (
            <Link href='/creator/manage-events/create-event'>
              <Button variant="ghost">Become a Creator</Button>
            </Link>
          )}
          <UserButton />
        </SignedIn>
      </div>
    </header>
  )
}

export default function Providers({ children }) {
  return (
    <ClerkProvider>
      <Header />
      {children}
      <Toaster />
      {/* <Footer /> */}
    </ClerkProvider>
  )
}