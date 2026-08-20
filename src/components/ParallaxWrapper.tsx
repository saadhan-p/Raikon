"use client";

import React, { useEffect, useRef, useState } from 'react';

interface ParallaxWrapperProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  direction?: 'vertical' | 'horizontal';
}

export default function ParallaxWrapper({
  children,
  speed = 0.5,
  className = '',
  direction = 'vertical',
}: ParallaxWrapperProps) {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        // Calculate offset based on scroll position relative to viewport center
        const centerY = window.innerHeight / 2;
        const elementCenterY = rect.top + rect.height / 2;
        const diffY = elementCenterY - centerY;
        
        setOffset(diffY * speed * -0.5);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  const style = {
    transform:
      direction === 'vertical'
        ? `translateY(${offset}px)`
        : `translateX(${offset}px)`,
    transition: 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Smooth easing
    willChange: 'transform',
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
