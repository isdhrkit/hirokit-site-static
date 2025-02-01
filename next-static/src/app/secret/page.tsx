"use client";

import Link from 'next/link';
import VoidParticles from '@/components/VoidParticles';

export default function SecretPage() {
  return (
    <main className="fixed inset-0 overflow-hidden">
      <div className="void-effect" />
      <div className="noise" />
      <VoidParticles />
      <Link href="/" className="secret-home-button">
        ホームに戻る
      </Link>
    </main>
  );
} 