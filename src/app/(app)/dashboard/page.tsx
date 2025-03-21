// 'use client'
// import { Message } from '@/model/user.model'
// import React, { useCallback, useEffect, useState } from 'react'
// import { useToast } from "@/hooks/use-toast"
// import { useSession } from 'next-auth/react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { acceptMessageSchema } from '@/schemas/acceptMessageSchema';
// import axios, { AxiosError } from 'axios';
// import { ApiResponse } from '@/types/ApiResponse';
// import { User } from 'next-auth';
// import { Button } from '@/components/ui/button';
// import { Switch } from '@/components/ui/switch';
// import { Separator } from '@/components/ui/separator';
// import { Loader2, RefreshCcw } from 'lucide-react';
// import MessageCard from '@/components/MessageCard';





// function Page() {
//   const [messages,setMessages] = useState<Message[]>([])
//   const [isLoading,setIsLoading] = useState(false)
//   const [isSwitchLoading,setIsSwitchLoading] = useState(false)




//   const {toast} = useToast()

//   const handleDeleteMessage = (messageId:string) => {
//     setMessages(messages.filter((message)=> message._id !== messageId))
//   }

//   const{data:session} = useSession()

//   const form = useForm({
//     resolver: zodResolver(acceptMessageSchema)
//   })

//   const {register,watch,setValue} = form;

//   const acceptMessages = watch('acceptMessages')

//   const fetchAcceptMessage = useCallback(async () => {
//     setIsSwitchLoading(true)
//     try {
//       const response = await axios.get<ApiResponse>('/api/accept-message')
//       setValue('acceptMessages',response.data.isAcceptingMessage)
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       toast("Error!", {
//         description: axiosError.response?.data.message || "Failed to fetch message Settings" ,
//       })
//     } finally{
//       setIsSwitchLoading(false)
//     }
//   },[setValue,toast])

//   const fetchMessages = useCallback( async (refresh: boolean = false) => {
//     setIsLoading(true)
//     setIsSwitchLoading(false)
//     try {
//       const response = await axios.get<ApiResponse>('/api/get-messages')
//       setMessages(response.data.messages || [])
//       if(refresh) {
//         toast("Success!", {
//           description:  "Message Settings Updated Successfully. Showing latest Messages" ,
//         })
//       }
//     } catch (error) {
//        const axiosError = error as AxiosError<ApiResponse>;
//       toast("Error!", {
//         description: axiosError.response?.data.message || "Failed to fetch message Setting" ,
//       })
//     } finally{
//       setIsLoading(false)
//       setIsSwitchLoading(false)
//     }
//   },[toast, setIsLoading, setMessages])

//   useEffect(() => {
//     if(!session || !session.user) return

//     fetchMessages()
//     fetchAcceptMessage()
    
//   },[session, setValue, fetchAcceptMessage, fetchMessages])

//   const handleSwitchChange = async () => {
//     setIsSwitchLoading(true)
//     try {
//       const response = await axios.post<ApiResponse>('/api/accept-message', {
//         acceptMessages: !acceptMessages
//       })
//       setValue('acceptMessages', !acceptMessages)
//       toast("Success!", {
//         description: response.data.message ,
//       })
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       toast("Error!", {
//         description: axiosError.response?.data.message || "Failed to fetch message accepting status" ,
//     })
//   }

//   const {username} = session?.user as User
//   const baseUrl = `${window.location.protocol}//${window.location.host}`
//   const profileUrl = `${baseUrl}/u/${username}`

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(profileUrl)
//     toast("Success!", {
//       description: "Profile URL Copied to Clipboard" ,
//     })
//   }

//   if(!session || !session.user) {
//     return <div>Not Authorized! Please Sign In</div>
//   }

//   return (
//     <div className="my-8 md:mx-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-6xl lg:mx-auto p-6 transition-all duration-300">
      
//       {/* Dashboard Header */}
//       <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white text-center">
//         Your Dashboard
//       </h1>
  
//       {/* Copy Link Section */}
//       <div className="mb-6">
//         <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
//           Copy Your Unique Link
//         </h2>
//         <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-2 rounded-lg shadow-sm">
//         <input 
//             title='Profile URL'
//             type="text" 
//             value={profileUrl} 
//             className="flex-1 bg-transparent text-gray-900 dark:text-gray-200 border-none outline-none px-3 py-2 rounded-l-md text-sm"
//             readOnly 
//             disabled 
//           />
//           <Button 
//             onClick={copyToClipboard} 
//             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-all duration-200"
//           >
//             Copy
//           </Button>
//         </div>
//       </div>
  
//       {/* Accept Messages Toggle */}
//       <div className="mb-6 flex items-center space-x-3">
//         <Switch 
//           {...register('acceptMessages')} 
//           checked={acceptMessages} 
//           onCheckedChange={handleSwitchChange} 
//           disabled={isSwitchLoading} 
//         />
//         <span className="text-gray-700 dark:text-gray-300 text-lg">
//           Accept Messages:{" "}
//           <span className={`font-semibold ${acceptMessages ? "text-green-500" : "text-red-500"}`}>
//             {acceptMessages ? "On" : "Off"}
//           </span>
//         </span>
//       </div>
  
//       <Separator />
  
//       {/* Refresh Messages Button */}
//       <div className="flex justify-center mt-6">
//         <Button 
//           className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition-all duration-200"
//           variant="outline"
//           onClick={(e) => {
//             e.preventDefault();
//             fetchMessages(true);
//           }}
//         >
//           {isLoading ? (
//             <Loader2 className="animate-spin h-5 w-5 text-blue-500" />
//           ) : (
//             <RefreshCcw className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//           )}
//           <span className="text-gray-700 dark:text-gray-300">Refresh</span>
//         </Button>
//       </div>
  
//       {/* Messages Grid */}
//       <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//         {messages.length > 0 ? (
//           messages.map((message) => (
//             <MessageCard 
//               key={message.id} 
//               message={message} 
//               onMessageDelete={handleDeleteMessage} 
//             />
//           ))
//         ) : (
//           <p className="text-center text-gray-600 dark:text-white text-lg">No messages found</p>
//         )}
//       </div>
  
//     </div>
//   );
  
// }
// }

// export default Page
//improved code after revision

'use client';

import { Message } from '@/model/user.model';
import React, { useCallback, useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { acceptMessageSchema } from '@/schemas/acceptMessageSchema';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Loader2, RefreshCcw } from 'lucide-react';
import MessageCard from '@/components/MessageCard';

function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const form = useForm({ resolver: zodResolver(acceptMessageSchema) });
  const { register, watch, setValue } = form;
  const acceptMessages = watch('acceptMessages');

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const { data } = await axios.get<ApiResponse>('/api/accept-message');
      setValue('acceptMessages', data.isAcceptingMessage);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast(
       'Error!',
        {description: axiosError.response?.data.message || 'Failed to fetch message settings.',}
      );
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue, toast]);

  const fetchMessages = useCallback(async (refresh = false) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get<ApiResponse>('/api/get-messages');
      console.log(data)
      setMessages(data.messages || []);
      if (refresh) {
        toast( 'Success!',
          {description: 'Messages refreshed successfully.',
}        );
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast( 'Error!',
        {description: axiosError.response?.data.message || 'Failed to fetch messages.',}
      );
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (status !== 'authenticated') return;
    fetchMessages();
    fetchAcceptMessage();
  }, [status, fetchMessages, fetchAcceptMessage]);

  const handleSwitchChange = async () => {
    setIsSwitchLoading(true);
    try {
      const { data } = await axios.post<ApiResponse>('/api/toggle-accept-message', {
        acceptMessages: !acceptMessages,
      });
      setValue('acceptMessages', !acceptMessages);
      toast('Success!', {description: data.message });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast('Error!',
        {description: axiosError.response?.data.message || 'Failed to update message settings.',
      });
    } finally {
      setIsSwitchLoading(false);
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages((prev) => prev.filter((message) => message._id !== messageId));
  };

  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${session?.user?.username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast( 'Success!', {description: 'Profile URL copied to clipboard.' });
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="text-center text-lg text-gray-700 dark:text-white">
        Not Authorized! Please Sign In
      </div>
    );
  }

  return (
    <div className="my-8 mx-auto max-w-6xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-300">
      {/* Dashboard Header */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Your Dashboard
      </h1>

      {/* Copy Link Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
          Copy Your Unique Link
        </h2>
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
          <input
          title='Profile URL'
            type="text"
            value={profileUrl}
            className="flex-1 bg-transparent text-gray-900 dark:text-gray-200 border-none outline-none px-3 py-2 text-sm"
            readOnly
            disabled
          />
          <Button onClick={copyToClipboard} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Copy
          </Button>
        </div>
      </div>

      {/* Accept Messages Toggle */}
      <div className="mb-6 flex items-center space-x-3">
        <Switch {...register('acceptMessages')} checked={acceptMessages} onCheckedChange={handleSwitchChange} disabled={isSwitchLoading} />
        <span className="text-gray-700 dark:text-gray-300 text-lg">
          Accept Messages:{' '}
          <span className={`font-semibold ${acceptMessages ? 'text-green-500' : 'text-red-500'}`}>{acceptMessages ? 'On' : 'Off'}</span>
        </span>
      </div>

      <Separator />

      {/* Refresh Messages Button */}
      <div className="flex justify-center mt-6">
        <Button
          className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg"
          variant="outline"
          onClick={() => fetchMessages(true)}
        >
          {isLoading ? <Loader2 className="animate-spin h-5 w-5 text-blue-500" /> : <RefreshCcw className="h-5 w-5 text-gray-600 dark:text-gray-300" />}
          <span className="text-gray-700 dark:text-gray-300">Refresh</span>
        </Button>
      </div>

      {/* Messages Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message) => <MessageCard key={message._id} message={message} onMessageDelete={handleDeleteMessage} />)
        ) : (
          <p className="text-center text-gray-600 dark:text-white text-lg">No messages found</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

