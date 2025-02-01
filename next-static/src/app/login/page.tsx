"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MatrixBackground from '@/components/MatrixBackground';

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('https://api.hirokit.jp/auth/check', {
        credentials: 'include'
      });
      if (response.ok) {
        router.push('/secret');
      }
    } catch (error) {
      console.error('認証チェックエラー:', error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    setErrorMessage('');

    try {
      const response = await fetch('https://api.hirokit.jp/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      });

      if (response.ok) {
        setTimeout(() => {
          router.push('/secret');
        }, 100);
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'ログインに失敗しました。');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('エラーが発生しました。もう一度お試しください。');
    }
  };

  return (
    <main className="min-h-screen bg-black font-mono text-[#0F0] overflow-hidden">
      <MatrixBackground />
      <Link href="/" className="home-button">
        ホームに戻る
      </Link>

      <div className="relative z-[2] min-h-screen flex justify-center items-center p-4">
        <div suppressHydrationWarning>
          <div className={`${loading ? 'login-form-hidden' : 'login-form-visible'} login-container bg-black/80 p-8 border border-[#0F0] rounded-lg w-full max-w-[500px] mx-auto`}>
            {errorMessage && (
              <div className="error-message text-red-500 mb-6 text-center">{errorMessage}</div>
            )}
            <form onSubmit={handleLogin}>
              <div className="form-group mb-6">
                <label htmlFor="username" className="block mb-3">ユーザー名</label>
                <input 
                  type="text" 
                  id="username" 
                  name="username" 
                  required 
                  className="w-full p-3 bg-black border border-[#0F0] text-[#0F0] outline-none focus:border-[#0F0] focus:shadow-[0_0_5px_rgba(0,255,0,0.5)]"
                />
              </div>
              <div className="form-group mb-6">
                <label htmlFor="password" className="block mb-3">パスワード</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  required 
                  className="w-full p-3 bg-black border border-[#0F0] text-[#0F0] outline-none focus:border-[#0F0] focus:shadow-[0_0_5px_rgba(0,255,0,0.5)]"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-black border border-[#0F0] text-[#0F0] cursor-pointer transition-all duration-300 hover:bg-[#0F0] hover:text-black"
              >
                ログイン
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
} 