import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const jobCategories = [
  'Software Engineering',
  'Digital Marketing',
  'Data Science',
  'Product Management',
  'UI/UX Design',
  'Cybersecurity',
  'Finance',
  'Sales',
];

const typingWords = ['Build', 'Your', 'Future'];

const HeroSection = () => {
  const navigate = useNavigate();
  const [displayedText, setDisplayedText] = React.useState('');
  const [wordIndex, setWordIndex] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(0);
  const [showCursor, setShowCursor] = React.useState(true);
  const intervalRef = useRef();

  // Typing effect
  useEffect(() => {
    if (wordIndex < typingWords.length) {
      if (charIndex < typingWords[wordIndex].length) {
        intervalRef.current = setTimeout(() => {
          setDisplayedText(
            typingWords.slice(0, wordIndex).join(' ') +
              (wordIndex > 0 ? ' ' : '') +
              typingWords[wordIndex].slice(0, charIndex + 1)
          );
          setCharIndex((c) => c + 1);
        }, 120);
      } else {
        setTimeout(() => {
          setWordIndex((w) => w + 1);
          setCharIndex(0);
        }, 500);
      }
    }
    return () => clearTimeout(intervalRef.current);
  }, [wordIndex, charIndex]);

  // Cursor blink
  useEffect(() => {
    const blink = setInterval(() => setShowCursor((c) => !c), 500);
    return () => clearInterval(blink);
  }, []);

  return (
    <div className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden bg-[#101a2b]">
      {/* Blueprint SVG Grid Background */}
      <svg className="absolute inset-0 w-full h-full z-0" style={{ pointerEvents: 'none' }}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2a3553" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      {/* 3D Constellation Placeholder */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-16 pb-8">
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white mb-6 font-[Montserrat,Arial,sans-serif]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {displayedText}
          <span className="text-accent font-bold">{showCursor ? '|' : ' '}</span>
        </motion.h1>
        <motion.p
          className="text-xl text-blue-200 mb-8 font-[Archivo,Arial,sans-serif]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Your career journey starts here. Explore opportunities, connect, and grow.
        </motion.p>
        {/* 3D Constellation Placeholder */}
        <div className="w-[340px] h-[340px] md:w-[420px] md:h-[420px] flex items-center justify-center mb-8">
          {/* TODO: Replace with react-three-fiber 3D constellation */}
          <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-800/60 to-blue-400/30 border-2 border-blue-500/30 flex items-center justify-center relative">
            {/* Nodes */}
            {jobCategories.map((cat, i) => (
              <motion.div
                key={cat}
                className="absolute text-xs md:text-sm text-blue-100 bg-blue-900/80 px-2 py-1 rounded-full shadow-lg cursor-pointer hover:bg-yellow-400 hover:text-black transition-colors border border-blue-400/40"
                style={{
                  left: `${50 + 40 * Math.cos((2 * Math.PI * i) / jobCategories.length)}%`,
                  top: `${50 + 40 * Math.sin((2 * Math.PI * i) / jobCategories.length)}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                whileHover={{ scale: 1.2 }}
                onClick={() => navigate('/browse')}
                title={cat}
              >
                {cat}
              </motion.div>
            ))}
            {/* Center Node */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-blue-900 shadow-xl border-4 border-blue-200 text-lg cursor-pointer hover:scale-105 transition-transform">
              Career
            </div>
          </div>
        </div>
        <Button className="bg-yellow-400 text-blue-900 font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-300 transition-colors text-lg" onClick={() => navigate('/jobs')}>
          Explore Jobs
        </Button>
      </div>
      {/* New AI Prediction Section */}
      <div className="w-full flex flex-col items-center justify-center py-12 bg-gradient-to-r from-blue-900/80 to-blue-700/80 mt-8">
        <h2 className="text-3xl font-bold text-white mb-2 font-[Montserrat,Arial,sans-serif]">Filter Applicants with AI Prediction</h2>
        <p className="text-blue-100 mb-4 max-w-xl text-center">Use our advanced AI to instantly filter and rank applicants by their predicted placement success. Make smarter, faster hiring decisions with just one click.</p>
        <Button className="bg-yellow-400 text-blue-900 font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-300 transition-colors text-lg" onClick={() => window.location.href='/admin/jobs'}>
          Try AI-Powered Filtering
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;