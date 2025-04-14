'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ShoppingCart, BellRing } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import logo from "../../assets/logo.png"
import { usePathname } from 'next/navigation'
import Logo from './Logo'
import { useUser } from '@/context/UserContext'
import { logout } from '@/services/auth'
import { Badge } from '../ui/badge'
import { Skeleton } from '../ui/skeleton'
import { useAppSelector } from '@/redux/hooks'
import { totalQuantitySelector } from '@/redux/features/cartSlice'
import { NotificationPopover } from './NotificationPopup'

export default function Navbar() {

  const totalQuantity = useAppSelector(totalQuantitySelector)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const pathname = usePathname()
 
  const {user, setIsLoading, isLoading} = useUser()

 const handleLogOut = () => {
  logout()
  setIsLoading(true)
 }

  return (
    <nav className="w-full bg-white border-b shadow-sm fixed top-0 left-0 z-50 mb-20">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        
       
        <Link href="/" className="text-xl font-bold text-primary flex items-center gap-2">
          <Logo />
        </Link>

   
        <div className="hidden md:flex items-center gap-6">
         
          <Link href="/" className="hover:text-primary transition">Home</Link>
          <Link href="/about"  className={`hover:text-primary transition ${pathname === "/about" ? "text-primary font-semibold":""}`}>About</Link>
          <Link href="/shop" className={`hover:text-primary transition ${pathname === "/shop" ? "text-primary font-semibold":""}`}>Medicines</Link>
          <Link href="/admin/medicines" className="hover:text-primary transition">Dashboard</Link>
          {
  user?.name && <div className='hidden md:flex items-center'>
  <Badge>{user.name.toUpperCase()}</Badge>
  </div>
}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/cart" className={`flex justify-center items-center ${pathname === "/cart" ? "text-primary font-semibold":""}`}>
            <ShoppingCart className="w-6 h-6 hover:text-primary transition" /> {totalQuantity>0 && <sup className=''><Button className="rounded-full bg-accent-content text-white cursor-pointer w-[30px] h-[30px]">{totalQuantity}</Button></sup>}
          </Link>
          {
            (isLoading && !user?.email) ? <Skeleton className="w-[70px] h-[40px] rounded-md bg-[#f2eded]" /> : 
            <>
             {
            (user?.email) ? (<Button onClick={handleLogOut} className='bg-amber-600 hover:bg-amber-600 cursor-pointer'>Logout</Button>) : (<Link href="/login">
              <Button >Login</Button>
            </Link>)
          }
            </>
          }
         
         
         <NotificationPopover />
        </div>

       
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white border-t">
          
          <Link href="/" className="block py-1">Home</Link>
          <Link href="/about" className={`block py-1 {pathname === "/about" ? "text-primary font-semibold":""}`}>About</Link>
          <Link href="/shop" className={`block py-1 {pathname === "/shop" ? "text-primary font-semibold":""}`}>Medicines</Link>
          <Link href="/shop" className="block py-1">Dashboard</Link>
          <Link href="/cart" className="block py-1  items-center gap-2">
            <ShoppingCart className="w-5 h-5" /> Cart
          </Link>
          <hr />
          <Link href="/login" className="block py-1">Login</Link>
        </div>
      )}
    </nav>
  )
}
