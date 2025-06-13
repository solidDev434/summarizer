import Image from "next/image";
import Favicon from "@/public/favicon.png";
import SummarizerBox from "@/app/SummarizerBox";

export default function Home() {
  return (
    <>
      <nav className="p-2 sm:py-4 sm:px-5 flex items-center -space-x-1">
        <Image 
          src={Favicon}
          alt="summarizer-logo"
          width={70}
          height={70}
          className="size-[60px] sm:w-max"
        />

        <h1 className="text-lg font-black">SummarizeAI</h1>
      </nav>

      {/* Summarizer Box */}

      <section className="flex justify-center">
        <SummarizerBox />
      </section>
    </>
  );
}
