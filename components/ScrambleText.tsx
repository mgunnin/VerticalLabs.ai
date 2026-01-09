import React, { useEffect, useState, useRef } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

const ScrambleText: React.FC<ScrambleTextProps> = ({ text, className, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef<number | null>(null);
  const iterationRef = useRef(0);

  useEffect(() => {
    const startScramble = () => {
      intervalRef.current = window.setInterval(() => {
        setDisplayText(prev => 
          text
            .split('')
            .map((char, index) => {
              if (index < iterationRef.current) {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );

        if (iterationRef.current >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }

        iterationRef.current += 1 / 3;
      }, 30);
    };

    const timeoutId = setTimeout(startScramble, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, delay]);

  return <span className={className}>{displayText}</span>;
};

export default ScrambleText;