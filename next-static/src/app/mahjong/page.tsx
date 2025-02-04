"use client";

import MatrixBackground from '@/components/MatrixBackground';
import Link from 'next/link';
import MahjongCalculator from '@/components/MahjongCalculator';

export default function MahjongPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <MatrixBackground />
      <Link href="/" className="home-button">
        ホームに戻る
      </Link>
      <div className="relative z-[2] pt-8 pb-16 px-4 md:px-6 flex-1 flex items-center justify-center">
        <MahjongCalculator />
      </div>
    </main>
  );
} 