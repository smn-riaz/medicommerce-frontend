'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ShoppingCart, BellRing } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import logo from "../../assets/logo.png"
import { usePathname, useRouter } from 'next/navigation'
import Logo from './Logo'
import { useUser } from '@/context/UserContext'
import { logout } from '@/services/auth'
import { Badge } from '../ui/badge'
import { Skeleton } from '../ui/skeleton'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { clearCart, totalQuantitySelector } from '@/redux/features/cartSlice'
import { NotificationPopover } from './NotificationPopup'
import { protectedRoutes } from '@/constants'


export default function Navbar() {

  const totalQuantity = useAppSelector(totalQuantitySelector)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const pathname = usePathname()

  const router = useRouter()
 
  const {user,setUser, setIsLoading} = useUser()

  const dispatch = useAppDispatch()


  const handleLogOut = () => {
    setUser(null)
    logout();
    dispatch(clearCart())
    setIsLoading(true)
    if (protectedRoutes.some(route => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <nav className="w-full bg-white border-b shadow-sm fixed top-0 left-0 z-50 mb-20">
    <div className="container mx-auto px-4 py-3 flex items-center justify-between">
    
      <Link href="/" className="text-xl font-bold text-primary flex items-center gap-2">
        <Logo />
      </Link>
  
    
      <div className="hidden md:flex items-center gap-6">
        <Link href="/" className="hover:text-primary transition">Home</Link>
  
        <Link
          href="/about"
          className={`hover:text-primary transition ${
            pathname === "/about" ? "text-primary font-semibold" : ""
          }`}
        >
          About
        </Link>
  
        <Link
          href="/shop"
          className={`hover:text-primary transition ${
            pathname === "/shop" ? "text-primary font-semibold" : ""
          }`}
        >
          Medicines
        </Link>
  
        {user?.role && (
          <Link href={`/${user?.role}`} className="hover:text-primary transition">
            Dashboard
          </Link>
        )}
  
        {user?.name && (
          <div className="hidden md:flex items-center">
            <Badge>{user.name.toUpperCase()}</Badge>
          </div>
        )}
      </div>
  
 
      <div className="hidden md:flex items-center gap-4">
        <Link
          href="/cart"
          className={`flex justify-center items-center ${
            pathname === "/cart" ? "text-primary font-semibold" : ""
          }`}
        >
          <ShoppingCart className="w-6 h-6 hover:text-primary transition" />
          {totalQuantity > 0 && (
            <sup>
              <Button className="rounded-full bg-accent-content text-white cursor-pointer w-[30px] h-[30px]">
                {totalQuantity}
              </Button>
            </sup>
          )}
        </Link>
  
        {user?.email ? (
          <Button
            onClick={handleLogOut}
            className="bg-amber-600 hover:bg-amber-600 cursor-pointer"
          >
            Logout
          </Button>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
  
        <NotificationPopover />
      </div>
  
    
      <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </div>
  

    {mobileMenuOpen && (
      <div className="md:hidden px-4 pb-4 space-y-2 bg-white border-t">
        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-primary transition">Home</Link>
  
        <Link
          href="/about" onClick={() => setMobileMenuOpen(false)}
          className={`block py-1 hover:text-primary transition ${
            pathname === "/about" ? "text-primary font-semibold" : ""
          }`}
        >
          About
        </Link>
  
        <Link
          href="/shop" onClick={() => setMobileMenuOpen(false)}
          className={`block py-1 hover:text-primary transition ${
            pathname === "/shop" ? "text-primary font-semibold" : ""
          }`}
        >
          Medicines
        </Link>
  
        {user?.role && (
          <Link
            href={`/${user?.role}`} onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-primary transition"
          >
            Dashboard
          </Link>
        )}
  
        {user?.name && (
          <div className="block py-1">
            <Badge>{user.name.toUpperCase()}</Badge>
          </div>
        )}
  
        <Link
          href="/cart" onClick={() => setMobileMenuOpen(false)}
          className={`block py-1 items-center gap-2 hover:text-primary transition ${
            pathname === "/cart" ? "text-primary font-semibold" : ""
          }`}
        >
          <span className='flex justify-start'>
          Cart {totalQuantity > 0 && (
            <span className="ml-2 bg-accent-content text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              {totalQuantity}
            </span>
          )}</span>
         
        </Link>
  
        <hr />
  
        {user?.email ? (
          <button
            onClick={() => {
              handleLogOut
              setMobileMenuOpen(false)
            }}
            className="block py-1 text-left w-full text-amber-600 font-medium hover:underline"
          >
            Logout
          </button>
        ) : (
          <Link href="/login" onClick={() => setMobileMenuOpen(false)}  className="block py-1 hover:text-primary transition">
            Login
          </Link>
        )}
      </div>
    )}
  </nav>
  
  

  )
}
