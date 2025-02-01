import Image from "next/image";
import Link from "next/link";
import MatrixBackground from "@/components/MatrixBackground";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-[#0F0] font-mono overflow-hidden">
      <MatrixBackground />
      
      <nav className="fixed left-5 top-5 flex flex-col gap-2.5 z-10">
        <Link 
          href="/roulette/drink" 
          className="px-5 py-2.5 bg-black/80 text-[#0F0] border-2 border-[#0F0] rounded hover:bg-[#0F0] hover:text-black transition-all shadow-[0_0_15px_rgba(0,255,0,0.3)] hover:shadow-[0_0_20px_#0F0] text-center"
        >
          お酒ルーレット
        </Link>
        <Link 
          href="/qa" 
          className="px-5 py-2.5 bg-black/80 text-[#0F0] border-2 border-[#0F0] rounded hover:bg-[#0F0] hover:text-black transition-all shadow-[0_0_15px_rgba(0,255,0,0.3)] hover:shadow-[0_0_20px_#0F0] text-center"
        >
          AI Q&A
        </Link>
      </nav>

      <div className="fixed right-5 top-5 bg-black/80 border-2 border-[#0F0] rounded-lg p-5 text-[#0F0] font-mono z-10 shadow-[0_0_15px_rgba(0,255,0,0.3)] w-[min(300px,calc(100%-80px))]">
        <Link href="/profile" className="block">
          <div 
            className="w-[120px] h-[120px] mx-auto mb-5 border-2 border-[#0F0] rounded-lg overflow-hidden flex items-center justify-center shadow-[0_0_15px_#0F0,inset_0_0_15px_#0F0] hover:scale-105 hover:shadow-[0_0_25px_#0F0,inset_0_0_25px_#0F0] transition-all animate-pulse"
          >
            <Image
              src="/images/profile.svg"
              alt="Profile"
              width={120}
              height={120}
              className="w-full h-full object-contain [filter:invert(51%)_sepia(98%)_saturate(1095%)_hue-rotate(87deg)_brightness(128%)_contrast(119%)]"
            />
          </div>
        </Link>
        <h2 className="text-center mb-4 text-xl shadow-[0_0_5px_#0F0] before:content-['Click_profile_to_view_more'] before:block before:text-sm before:mb-1.5 before:opacity-80">
          CONNECT WITH ME
        </h2>
        <a
          href="https://github.com/isdhrkit"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-[#0F0] no-underline my-2.5 p-2 border border-[#0F0] rounded hover:bg-[#0F0] hover:text-black transition-all"
        >
          <Image
            src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg"
            alt="GitHub"
            width={24}
            height={24}
            className="mr-2.5 [filter:invert(51%)_sepia(98%)_saturate(1095%)_hue-rotate(87deg)_brightness(128%)_contrast(119%)]"
          />
          GitHub
        </a>
        <a
          href="https://twitter.com/hirokit_0111"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-[#0F0] no-underline my-2.5 p-2 border border-[#0F0] rounded hover:bg-[#0F0] hover:text-black transition-all"
        >
          <Image
            src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/twitter.svg"
            alt="Twitter"
            width={24}
            height={24}
            className="mr-2.5 [filter:invert(51%)_sepia(98%)_saturate(1095%)_hue-rotate(87deg)_brightness(128%)_contrast(119%)]"
          />
          Twitter
        </a>
      </div>
    </div>
  );
}
