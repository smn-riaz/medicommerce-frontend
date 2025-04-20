"use client"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Home, ContactRound, ShoppingBag, Book } from "lucide-react"
const items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
        title: "Profile",
        url: "/user/profile",
        icon: ContactRound,
      },
    {
      title: "Orders",
      url: "/user/orders",
      icon: ShoppingBag,
    },


    
  ]
 
export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar items={items}/>
      <main className="bg-[#FFFFFF]  min-h-screen">
        <SidebarTrigger />
        <div className="p-4 pt-0 ">{children}</div>
      </main>
    </SidebarProvider>
  )
}