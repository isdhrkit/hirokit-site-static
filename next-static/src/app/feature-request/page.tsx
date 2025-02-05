"use client";

import { useState } from 'react';
import MatrixBackground from '@/components/MatrixBackground';
import Link from 'next/link';

interface FeatureRequest {
  title: string;
  description: string;
  requesterEmail?: string;
}

export default function FeatureRequestPage() {
  const [formData, setFormData] = useState<FeatureRequest>({
    title: '',
    description: '',
    requesterEmail: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('https://api.hirokit.jp/feature-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      if (response.ok) {
        setMessage({
          text: '機能要望を送信しました。ご協力ありがとうございます！',
          isError: false
        });
        setFormData({ title: '', description: '', requesterEmail: '' });
      } else {
        const data = await response.json();
        setMessage({
          text: data.error || '送信に失敗しました。もう一度お試しください。',
          isError: true
        });
      }
    } catch (error) {
      console.error('エラー:', error);
      setMessage({
        text: '送信中にエラーが発生しました。もう一度お試しください。',
        isError: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <main className="min-h-screen bg-black font-mono text-[#0F0]">
      <MatrixBackground />
      <Link href="/" className="home-button">
        ホームに戻る
      </Link>

      <div className="relative z-[2] min-h-screen flex justify-center items-center p-4">
        <div className="w-full max-w-[600px] bg-black/80 p-8 border-2 border-[#0F0] rounded-lg shadow-[0_0_15px_rgba(0,255,0,0.3)]">
          <h1 className="text-2xl mb-6 text-center">機能要望フォーム</h1>
          
          {message && (
            <div className={`p-4 mb-6 rounded-lg border ${
              message.isError 
                ? 'border-red-500 bg-red-500/10 text-red-500' 
                : 'border-[#0F0] bg-[#0F0]/10'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="title" className="block mb-2">
                タイトル <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-3 bg-black border border-[#0F0] text-[#0F0] rounded outline-none focus:border-[#0F0] focus:shadow-[0_0_5px_rgba(0,255,0,0.5)]"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block mb-2">
                詳細な説明 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                className="w-full p-3 bg-black border border-[#0F0] text-[#0F0] rounded outline-none focus:border-[#0F0] focus:shadow-[0_0_5px_rgba(0,255,0,0.5)]"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="requesterEmail" className="block mb-2">
                メールアドレス（任意）
              </label>
              <input
                type="email"
                id="requesterEmail"
                name="requesterEmail"
                value={formData.requesterEmail}
                onChange={handleChange}
                className="w-full p-3 bg-black border border-[#0F0] text-[#0F0] rounded outline-none focus:border-[#0F0] focus:shadow-[0_0_5px_rgba(0,255,0,0.5)]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 bg-transparent border-2 border-[#0F0] text-[#0F0] rounded cursor-pointer transition-all duration-300 
                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#0F0] hover:text-black hover:shadow-[0_0_20px_#0F0]'}`}
            >
              {isSubmitting ? '送信中...' : '送信する'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
} 