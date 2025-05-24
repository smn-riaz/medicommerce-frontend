// components/ChatLauncher.tsx
"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AiSuggestion from "./AiSuggestion";


export default function Chatbot() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="fixed right-4 z-50 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white px-2 py-2"
        >
          💬 AI Chat
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg">Ask AI About Medicines & others</DialogTitle>
        </DialogHeader>
        <AiSuggestion />
      </DialogContent>
    </Dialog>
  );
}
