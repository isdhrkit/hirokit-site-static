"use client";

import MatrixBackground from '@/components/MatrixBackground';
import Link from 'next/link';
import { useEffect } from 'react';

export default function DrinkRoulettePage() {
  useEffect(() => {
    const result = document.getElementById('result');
    if (!result) return;

    const spin = () => {
      result.textContent = '...';
      result.className = 'result';
      
      let dots = 0;
      const loadingInterval = setInterval(() => {
        dots = (dots + 1) % 4;
        result.textContent = '.'.repeat(dots);
      }, 200);
      
      setTimeout(() => {
        clearInterval(loadingInterval);
        const random = Math.random();
        if (random < 0.5) {
          result.textContent = 'YES!';
          result.classList.add('yes');
        } else {
          result.textContent = 'NO...';
          result.classList.add('no');
        }
      }, 2000);
    };

    const button = document.querySelector('button');
    button?.addEventListener('click', spin);

    return () => {
      button?.removeEventListener('click', spin);
    };
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <MatrixBackground />
      <Link href="/" className="home-button">
        ホームに戻る
      </Link>
      <div className="roulette-container">
        <div className="warning">
          <p>※ お酒は20歳になってから。</p>
          <p>※ 飲酒運転は法律で禁止されています。</p>
          <p>※ 妊娠中や授乳期の飲酒は、胎児・乳児の発育に悪影響を与えるおそれがあります。</p>
          <p>※ お酒は適量を心がけ、飲みすぎないようにしましょう。</p>
        </div>
        <h1>今日はお酒を飲んでもいい？</h1>
        <div id="result" className="result"></div>
        <button>回す！</button>
      </div>
    </main>
  );
} 