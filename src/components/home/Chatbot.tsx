"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"; // optional utility for classNames
import socket from "@/lib/socket";
import Image from "next/image";
import messageImg from '../../assets/messageImg.png'
import { MessageCircle, MessageSquareDiff, SendHorizonal } from "lucide-react";

interface Message {
  senderId: string;
  message: string;
  sentAt: string;
}

interface ChatBoxProps {
  userId: string;
  receiverId: string; // Admin or customer
}

export default function ChatBox({ userId, receiverId }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([{
    senderId: "system",
    message: "Hello",
    sentAt: new Date().toISOString(),
  }]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.connect();

    const roomId = [userId, receiverId].sort().join("-");
    socket.emit("joinRoom", { senderId: userId, receiverId });

    socket.on("receiveMessage", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, receiverId]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const msg: Message = {
      senderId: userId,
      message: newMessage.trim(),
      sentAt: new Date().toISOString(),
    };

    socket.emit("sendMessage", {
      senderId: userId,
      receiverId,
      message: newMessage.trim(),
    });

    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
  };

  return (

    <Popover>
    <PopoverTrigger asChild>
    <div className="cursor-pointer w-[45px] h-[45px] rounded-full bg-blue-600 flex justify-center items-center">
        <MessageSquareDiff color="white"/>
    </div>
   
    </PopoverTrigger>
    <PopoverContent className="w-80">
    <div className="w-full max-w-md border shadow-lg rounded-xl p-4 flex flex-col bg-white">
      <div className="text-lg font-semibold mb-2">Chat</div>

      <div className="flex-1 overflow-y-auto max-h-80 px-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={cn(
              "my-1 px-3 py-2 rounded-lg text-sm max-w-[80%]",
              msg.senderId === userId
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-100 text-black mr-auto"
            )}
          >
            {msg.message}
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2">
      
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
          placeholder="Type a message..."
        />
        
        <SendHorizonal className="cursor-pointer text-[#155DFC]" />
      </div>
    </div>
    </PopoverContent>
    </Popover>
   
  );
}
