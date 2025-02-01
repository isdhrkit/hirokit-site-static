"use client";

import MatrixBackground from '@/components/MatrixBackground';
import Link from 'next/link';
import TechResourceBoard from '@/components/TechResourceBoard';

export default function TechResources() {
  return (
    <main className="min-h-screen flex flex-col">
      <MatrixBackground />
      <Link href="/" className="home-button">
        ホームに戻る
      </Link>
      <div className="relative z-[2] pt-8 pb-16 px-4 md:px-6 flex-1 flex items-center justify-center">
        <div className="max-h-[100vh]">
          <TechResourceBoard />
        </div>
      </div>
    </main>
  );
} 