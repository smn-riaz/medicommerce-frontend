"use client"

import { useState } from "react"
import { BellRing } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Notification {
  id: string
  title: string
  time: string
}

const notifications: Notification[] = [
  { id: "1", title: "Order #123 confirmed", time: "2 hours ago" },
  { id: "2", title: "New message from support", time: "5 hours ago" },
  { id: "3", title: "Medicine out for delivery", time: "Yesterday" },
]

export function NotificationPopover() {
 

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative cursor-pointer hover:bg-muted p-2 rounded-md">
          <BellRing className="h-5 w-5" />
          
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-3">
        <h4 className="text-lg font-semibold mb-2">Notifications</h4>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          
         {
               notifications?.map((note) => (
                <div
                  key={note.id}
                  className="p-3 rounded-md bg-muted hover:bg-muted/70 transition"
                >
                  <p className="text-sm font-medium">{note.title}</p>
                  <p className="text-xs text-muted-foreground">{note.time}</p>
                </div>
              ))
         }
          
        </div>
      </PopoverContent>
    </Popover>
  )
}
