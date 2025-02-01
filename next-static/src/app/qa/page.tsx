"use client";

import { useEffect, useRef, useCallback } from 'react';
import MatrixBackground from '@/components/MatrixBackground';
import Link from 'next/link';
import { marked } from 'marked';

export default function QAPage() {
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const messageCacheRef = useRef(new Map());
  const chatHistoryRef = useRef([
    { role: "system", content: "あなたは親切なアシスタントです。" }
  ]);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (chatMessagesRef.current) {
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
      }
    });
  };

  const addMessage = useCallback((text: string, className: string) => {
    if (!chatMessagesRef.current) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    
    if (className === 'ai-message') {
      try {
        let parsedHtml = messageCacheRef.current.get(text);
        if (!parsedHtml) {
          parsedHtml = marked.parse(text);
          messageCacheRef.current.set(text, parsedHtml);
        }
        messageDiv.innerHTML = parsedHtml;
      } catch (error) {
        console.error('Markdown parsing error:', error);
        messageDiv.textContent = text;
      }
    } else {
      messageDiv.textContent = text;
    }
    
    chatMessagesRef.current.appendChild(messageDiv);
    scrollToBottom();

    if (messageCacheRef.current.size > 100) {
      const firstKey = messageCacheRef.current.keys().next().value;
      messageCacheRef.current.delete(firstKey);
    }
  }, []);

  const sendMessage = useCallback(async () => {
    if (!chatInputRef.current) return;
    const message = chatInputRef.current.value.trim();
    if (!message) return;

    addMessage(message, 'user-message');
    chatHistoryRef.current.push({ role: "user", content: message });
    chatInputRef.current.value = '';

    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-message';
    loadingDiv.innerHTML = `
      <div class="spinner"></div>
      <div>回答を生成中...</div>
    `;
    chatMessagesRef.current?.appendChild(loadingDiv);
    scrollToBottom();

    try {
      const response = await fetch('https://api.hirokit.jp/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: chatHistoryRef.current })
      });

      const data = await response.json();
      loadingDiv.remove();
      addMessage(data.response, 'ai-message');
      chatHistoryRef.current.push({ role: "assistant", content: data.response });
    } catch (err) {
      console.error(err);
      loadingDiv.remove();
      addMessage('申し訳ありません。エラーが発生しました。', 'ai-message');
    }
  }, [addMessage]);

  useEffect(() => {
    marked.setOptions({
      renderer: new marked.Renderer(),
      pedantic: false,
      gfm: true,
      breaks: true
    });

    const inputElement = chatInputRef.current;
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    };

    inputElement?.addEventListener('keypress', handleKeyPress);

    return () => {
      inputElement?.removeEventListener('keypress', handleKeyPress);
    };
  }, [sendMessage]);

  return (
    <main>
      <MatrixBackground />
      <Link href="/" className="home-button">
        ホームに戻る
      </Link>
      
      <div className="chat-container">
        <div className="chat-messages" ref={chatMessagesRef}>
          <div className="message ai-message">
            何でも質問してください！
          </div>
        </div>
        <div className="input-container">
          <input
            type="text"
            className="chat-input"
            ref={chatInputRef}
            placeholder="メッセージを入力..."
          />
          <button className="send-button" onClick={sendMessage}>送信</button>
        </div>
      </div>
    </main>
  );
} 