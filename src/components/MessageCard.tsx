'use client'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from './ui/button'
import { Message } from '@/model/user.model'
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import {X} from 'lucide-react'
  
type MessageCardProps = {
  message:Message;
  onMessageDelete: (messageId: string) => void;
}

function MessageCard({message, onMessageDelete}:MessageCardProps) {
  const {toast }= useToast();
  const handleDeleteConfirm = async () => {
     axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
    toast("Success!", {
      description: "Message deleted successfully" 
    })
    onMessageDelete(message._id);
    
  }
    return (
    <Card>
    <CardHeader>
    
    </CardHeader>
    <CardContent>
      <p>{message.content}</p>
    </CardContent>
    <CardFooter>
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive"><X /></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </CardFooter>
    
  </Card>
  
  )
}

export default MessageCard
