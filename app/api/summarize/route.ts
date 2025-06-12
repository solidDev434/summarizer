import { NextRequest, NextResponse } from 'next/server';

const HF_TOKEN = process.env.HUGGING_FACE_API;

export async function POST(req: NextRequest) {
    const { text } = await req.json();

    // try {
        if (!text) {
            return NextResponse.json({ error: "Invalid request. 'text' field is required." }, { status: 400 });
        }

        const response = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${HF_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputs: text }),
        });

        if (!response.ok) {
            const error = await response.text();
            return NextResponse.json({ error }, { status: 500 });
        }

        const result = await response.json();
        return NextResponse.json({ summary: result[0]?.summary_text || '' });
    // }
    
    // catch (error: any) {
    //     console.error("Error calling Hugging Face API:", error)
    //     return NextResponse.json({ 
    //         error: "Error in AI response",
    //         details: error.message || "Unknown error",
    //     }, { status: 500 });
    // }
}
