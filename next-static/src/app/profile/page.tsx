"use client";

import MatrixBackground from '@/components/MatrixBackground';
import Link from 'next/link';
import Image from 'next/image';

export default function ProfilePage() {
  return (
    <main>
      <MatrixBackground />
      <Link href="/" className="home-button">
        ホームに戻る
      </Link>
      
      <div className="content">
        <div className="profile-board">
          <Link href="/login" className="profile-image">
            <Image src="/images/profile.svg" alt="Profile" width={120} height={120} />
          </Link>
          <h1>HIROKIT</h1>
          <div className="profile-content">
            <div className="status-section">
              <h2>SYSTEM STATUS</h2>
              <div className="status-item">
                <span className="label">ROLE:</span>
                <span className="value">Engineer</span>
              </div>
              <div className="status-item">
                <span className="label">LOCATION:</span>
                <span className="value">Japan Tokyo</span>
              </div>
              <div className="status-item">
                <span className="label">SKILLS:</span>
                <span className="value">TypeScript / PHP / AWS / etc...</span>
              </div>
            </div>
            
            <div className="about-section">
              <h2>ABOUT</h2>
              <p>ソフトウェアエンジニアとして活動中。<br />
              クラウドインフラに興味があります。</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 