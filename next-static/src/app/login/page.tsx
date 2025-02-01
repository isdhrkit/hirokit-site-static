"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MatrixBackground from '@/components/MatrixBackground';

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('https://api.hirokit.jp/auth/check', {
        credentials: 'include'
      });
      if (response.ok) {
        router.push('/secret');
        return;
      }
    } catch (error) {
      console.error('認証チェックエラー:', error);
    }
    setIsLoading(false);
  };

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

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black font-mono text-[#0F0] overflow-hidden">
        <MatrixBackground />
        <div className="relative z-[2] min-h-screen flex justify-center items-center">
          <div className="loading">認証状態を確認中...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black font-mono text-[#0F0] overflow-hidden">
      <MatrixBackground />
      <Link href="/" className="home-button">
        ホームに戻る
      </Link>

      <div className="relative z-[2] min-h-screen flex justify-center items-center">
        <div className="login-container">
          {errorMessage && (
            <div className="error-message">{errorMessage}</div>
          )}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">ユーザー名</label>
              <input type="text" id="username" name="username" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">パスワード</label>
              <input type="password" id="password" name="password" required />
            </div>
            <button type="submit">ログイン</button>
          </form>
        </div>
      </div>
    </main>
  );
} 