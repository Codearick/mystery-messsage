// import { GoogleGenAI } from "@google/genai";
// import { streamText } from 'ai';

// export const runtime = 'edge'


// const model = 'gemini-2.5-flash';
// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// const prompt = "Create a list of 5 open-ended and engaging questions formatted as a single string. Each question should be be seperated by '||'. These question are for an anonymous messaging platform for adult group (18+), and should be suitable for a diverse audience. The questions should be little personal, quirky, sometimes funny and sometimes adult questions focusing on universal themes that encourage interaction. For example, your output should be structured like this: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What is your body count?||What is your wildest fantasy?||Are you single?'. Ensure the questions are intriguing, foster curiosity, and contribute to a welcoming conversational environment."

// export async function GET(request: Request) {
//     try {

//         const response = await ai.models.generateContentStream({
//             model,
//             contents: prompt,
//             config: {
//                 thinkingConfig: {
//                     thinkingBudget: 0, // Disables thinking
//                 },
//             },
//         });


//         // for await (const chunk of response) {
//         //     console.log(chunk.text);
//         // }

//         const stream = GoogleGenerativeAIStream({stream: response});
//         return new StreamingTextResponse(stream);


//     } catch (error) {
//         console.error("An unexpected error occured: ", error);
//         throw error
//     }
// }

import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const runtime = 'edge'


const model = google('gemini-2.5-flash');
const prompt = "Create a list of 5 open-ended and engaging questions formatted as a single string. Each question should be be seperated by '||'. These question are for an anonymous messaging platform for adult group (18+), and should be suitable for a diverse audience. The questions should be little personal, quirky, sometimes funny and sometimes adult questions focusing on universal themes that encourage interaction. For example, your output should be structured like this: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What is your body count?||What is your wildest fantasy?||Are you single?'. Ensure the questions are intriguing, foster curiosity, and contribute to a welcoming conversational environment."


export async function GET(request: Request) {
    try {

        const result = streamText({
            model,
            prompt
        })

        return result.toTextStreamResponse();

    } catch (error) {
        console.error('An unexpected error occurred:', error);
        // You can customize this however you like
        return new Response('Internal Server Error', { status: 500 });
    }
}