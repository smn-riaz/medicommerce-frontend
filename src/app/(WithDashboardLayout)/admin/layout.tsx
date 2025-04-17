"use client"

import { AppSidebar } from "@/components/ui/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Home, Pill,Pen, ShoppingBag, Users, Book } from "lucide-react"
const items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
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
      title: "Orders",
      url: "/admin/orders",
      icon: ShoppingBag,
    },
    {
      title: "Users",
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
      <main>
        <SidebarTrigger />
        <div className="p-4 pt-0 min-h-screen ">{children}</div>
      </main>
    </SidebarProvider>
  )
}