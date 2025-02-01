"use client";

import { useEffect } from 'react';

const VoidParticles = () => {
  useEffect(() => {
    const createParticle = () => {
      const particles = document.getElementById('particles');
      if (!particles) return;

      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const startX = Math.random() * window.innerWidth;
      const startY = window.innerHeight + Math.random() * window.innerHeight * 0.5;
      const size = 1 + Math.random() * 2;
      const duration = 8 + Math.random() * 7;
      const moveX = -150 + Math.random() * 300;
      
      particle.style.left = `${startX}px`;
      particle.style.bottom = `${-10}px`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      particle.style.setProperty('--duration', `${duration}s`);
      particle.style.setProperty('--moveX', `${moveX}px`);
      
      particles.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, duration * 1000);
    };
    
    const interval = setInterval(createParticle, 100);
    
    // 初期パーティクルの生成
    for (let i = 0; i < 50; i++) {
      setTimeout(createParticle, Math.random() * 2000);
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div className="void-particles" id="particles" />;
};

export default VoidParticles; 