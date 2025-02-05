"use client";

import Link from 'next/link';
import { useState } from 'react';

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button 
        className="hamburger-button"
        onClick={toggleMenu}
        aria-label="メニュー"
      >
        <div className={`hamburger-icon ${isOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <nav className={`side-menu ${isOpen ? 'open' : ''}`}>
        <Link href="/roulette/drink" className="menu-button" onClick={() => setIsOpen(false)}>
          お酒ルーレット
        </Link>
        <Link href="/qa" className="menu-button" onClick={() => setIsOpen(false)}>
          AI Q&A
        </Link>
        <Link href="/tech-resources" className="menu-button" onClick={() => setIsOpen(false)}>
          技術情報
        </Link>
        <Link href="/chinchillo" className="menu-button" onClick={() => setIsOpen(false)}>
          チンチロ
        </Link>
        <Link href="/mahjong" className="menu-button" onClick={() => setIsOpen(false)}>
          麻雀点数計算
        </Link>
        <Link href="/feature-request" className="menu-button" onClick={() => setIsOpen(false)}>
          機能要望フォーム
        </Link>
      </nav>
    </>
  );
};

export default SideMenu; 