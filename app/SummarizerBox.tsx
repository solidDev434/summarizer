"use client";

import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { HashLoader } from 'react-spinners';

const SummarizerBox = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [summarizedContent, setSummarizedContent] = useState("");

  const promptSummarize = async () => {
    if (!text.trim()) {
      toast.error('Please enter text content to summarize');
      return;
    }

    if (summarizedContent) setSummarizedContent("");

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

      toast.success("Summarization successful")
    } catch (err: any) {
      console.log(err);
      toast.error("Content Summarization Failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-[#1f1f1f] h-max md:h-11/12 w-10/12 rounded-2xl shadow-sm shadow-gray-950 border border-[#0a0a0a] grid grid-cols-1 md:grid-cols-2 p-3 md:p-5 gap-y-4 md:gap-x-5 divide-y md:divide-x divide-[#373737]">
      {/* Summarizer form */}
      <div className="h-60 md:h-full grid grid-rows-[1fr_max-content] gap-y-3 pb-4 md:pr-5">
        <div className="relative">
          <textarea 
            placeholder="Enter or paste here"
            className="no-scrollbar resize-none w-full rounded-2xl font-open-sans placeholder:text-base sm:placeholder:text-lg outline-none text-base sm:text-lg p-2 h-full"
            value={text}
            onChange={({ target }) => setText(target.value)}
          />

          {/* Loader */}
          {isLoading && (
            <div className="absolute top-0 left-0 size-full flex items-center justify-center bg-[#0a0a0a]/50 backdrop-blur-xs">
              <HashLoader color="#bf29ff" />
            </div>
          )}
        </div>

        <div className="flex justify-end overflow-y-scroll no-scrollbar">
          <button 
            onClick={promptSummarize}
            disabled={isLoading}
            className="w-max h-8 sm:h-10 px-4 py-1 bg-[#bf29ff] rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none flex items-center gap-x-1.5"
          >
            {isLoading && (
              <Loader2 className="animate-spin size-5" />
            )}
            Summarize 
          </button>
        </div>
      </div>

      {/* Summarizer Result */}
      <div className="h-60 md:h-full overflow-y-scroll no-scrollbar">
        {summarizedContent ? (
          <p className="text-base leading-relaxed sm:text-lg sm:leading-loose">{summarizedContent}</p>
        ) : null}
      </div>
    </div>
  )
}

export default SummarizerBox;