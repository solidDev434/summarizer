"use client";

import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

console.log(process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY)

const SummarizerBox = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [summarizedContent, setSummarizedContent] = useState("");

  const promptSummarize = async () => {
    if (!text.trim()) {
      toast.error('Please enter text content to summarize');
      return;
    }

    setIsLoading(true);

    try {
      const prompt = `Summarize the following text in 150 length: ${text}`;

      const payload = {
        "model": "deepseek-ai/DeepSeek-V3",
        "messages": [
          {
            role: "user",
            content: prompt,
          },
        ],
        "max_tokens": 500,
        "response_format": {
          "type": "text"
        },
        "temperature": 1,
        "top_p": 1
      }

      const { data } = await axios.post("https://api.studio.nebius.com/v1/chat/completions", payload, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEBIUS_API_KEY}`,
          "Content-Type": "application/json"
        }
      });
      const message = data.choices[0].message.content;
      setSummarizedContent(message);
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-[#1f1f1f] h-11/12 w-10/12 rounded-2xl shadow-sm shadow-gray-950 border border-[#0a0a0a] grid grid-cols-2 p-6 gap-x-5 divide-x divide-[#373737]">
      {/* Summarizer form */}
      <div className="grid grid-rows-[1fr_max-content] gap-y-1 pr-5">
        <textarea 
          placeholder="Enter or paste here"
          className="resize-none w-full rounded-2xl font-open-sans placeholder:text-lg outline-none text-lg"
          value={text}
          onChange={({ target }) => setText(target.value)}
        />

        <div className="flex justify-end">
          <button 
            onClick={promptSummarize}
            className="w-max h-10 px-6 py-1 bg-[#bf29ff] rounded-full cursor-pointer"
          >
            {isLoading ? "Summarizing..." : "Summarize"} 
          </button>
        </div>
      </div>

      {/* Summarizer Result */}
      <div className="">
        {summarizedContent ? (
          <p className="text-lg leading-loose">{summarizedContent}</p>
        ) : null}
      </div>
    </div>
  )
}

export default SummarizerBox;