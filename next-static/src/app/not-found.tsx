"use client";

import Link from 'next/link';
import MatrixBackground from '@/components/MatrixBackground';

export default function NotFound() {
  return (
    <main className="fixed inset-0 bg-black font-mono text-[#0F0] not-found overflow-hidden">
      <MatrixBackground />
      <div className="absolute inset-0 z-[2] flex flex-col justify-center items-center px-4">
        <div className="flex flex-col items-center gap-4">
          <h1>404</h1>
          <div className="flex flex-col items-center gap-2">
            <p>お探しのページが見つかりませんでした。</p>
            <Link href="/" className="inline-block text-[#0F0] no-underline border-2 border-[#0F0] px-5 py-2.5 
                                  transition-all duration-300 hover:bg-[#0F0] hover:text-black 
                                  hover:shadow-[0_0_20px_#0F0]">
              トップページに戻る
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 