import Image from "next/image";
import Favicon from "@/public/favicon.png";
import SummarizerBox from "@/app/SummarizerBox";

export default function Home() {
  return (
    <>
      <nav className="py-4 px-5 flex items-center -space-x-1">
        <Image 
          src={Favicon}
          alt="summarizer-logo"
          width={70}
          height={70}
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
