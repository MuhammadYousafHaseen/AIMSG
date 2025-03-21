import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export const runtime = 'edge';

export async function POST(req: Request) {
 try {
    const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your prompt should be structured like this: 'What is your favorite book?||What is your favorite hobby?||What is your favorite place to visit?'Ensure the question are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment."
     
   

     const result = streamText({
       model: openai('gpt-4o'),
       prompt,
      
     });
   
     return result.toDataStreamResponse();
 } catch (error) {
     console.log("An Unexpected Error in sending message: ", error);
     return Response.json({ success: false, message: "Error sending message" }, { status: 500 });
 }
}
// import { openai } from '@ai-sdk/openai';
// import { streamText } from 'ai';

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export async function POST(req: Request) {
//   const { messages } = await req.json();

//   const result = streamText({
//     model: openai('gpt-4o'),
//     messages,
//   });

//   return result.toDataStreamResponse();
// }