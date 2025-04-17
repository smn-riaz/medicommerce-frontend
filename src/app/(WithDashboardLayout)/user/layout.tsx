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
    {
      title: "Prescription Orders",
      url: "/user/prescription-orders",
      icon: Book,
    },

    
  ]
 
export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar items={items}/>
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}