"use client"

import { AppSidebar } from "@/components/ui/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Home, Pill,Pen, ShoppingBag, Users, Book, BookCopy } from "lucide-react"
const items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: BookCopy,
    },
    {
      title: "Medicines",
      url: "/admin/medicines",
      icon: Pill,
    },
   
    {
      title: "Create Medicine",
      url: "/admin/create-medicine",
      icon: Pen,
    },
    
    {
      title: "Manage Orders",
      url: "/admin/orders",
      icon: ShoppingBag,
    },
    {
      title: "Manage Users",
      url: "/admin/users",
      icon: Users
    },
    {
      title: "Prescriptions Review",
      url: "/admin/prescription-review",
      icon: Book
    },
  ]
 
export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar items={items}/>
      <main className="bg-[#FFFFFF]">
        <SidebarTrigger />
        <div className="p-4 pt-0 min-h-screen ">{children}</div>
      </main>
    </SidebarProvider>
  )
}