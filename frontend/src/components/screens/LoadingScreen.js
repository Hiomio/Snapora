"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);
  
  // Premium showcase images
  const showcaseImages = [
    "/images/bg-img1.jpg",
    "/images/bg-img2.jpg",
    "/images/bg-img3.jpg",
  ];
  
  // Dynamic loading messages
  const loadingMessages = [
    "Curating your visual journey",
    "Analyzing aesthetic preferences",
    "Connecting with creative minds",
    "Preparing immersive experience",
    "Finalizing your personalized feed"
  ];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 6;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 300);
    
    // Rotate showcase images
    const imageRotation = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % showcaseImages.length);
    }, 4500);
    
    return () => {
      clearInterval(timer);
      clearInterval(imageRotation);
    };
  }, []);

  // Floating holographic elements
  useEffect(() => {
    if (!containerRef.current) return;
    
    const elements = [];
    const elementCount = 12;
    const container = containerRef.current;
    
    const shapes = ['circle', 'triangle', 'square', 'hexagon'];
    const colors = ['rgba(138, 43, 226, 0.15)', 'rgba(75, 0, 130, 0.15)', 'rgba(148, 0, 211, 0.15)'];
    
    for (let i = 0; i < elementCount; i++) {
      const element = document.createElement('div');
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      
      element.className = 'absolute pointer-events-none';
      
      // Random size between 20px and 80px
      const size = Math.random() * 60 + 20;
      
      // Shape-specific styling
      if (shape === 'circle') {
        element.style.borderRadius = '50%';
      } else if (shape === 'triangle') {
        element.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
      } else if (shape === 'hexagon') {
        element.style.clipPath = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
      }
      
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      // Random position
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;
      
      // Floating animation
      const duration = Math.random() * 20 + 20;
      const delay = Math.random() * 5;
      const xMovement = Math.random() * 100 - 50;
      const yMovement = Math.random() * 100 - 50;
      
      element.style.animation = `float ${duration}s infinite ease-in-out ${delay}s`;
      element.style.setProperty('--x-movement', `${xMovement}px`);
      element.style.setProperty('--y-movement', `${yMovement}px`);
      
      // Glow effect
      element.style.boxShadow = `0 0 ${size/2}px ${size/4}px rgba(138, 43, 226, 0.2)`;
      
      container.appendChild(element);
      elements.push(element);
    }
    
    return () => {
      elements.forEach(element => {
        if (container.contains(element)) {
          container.removeChild(element);
        }
      });
    };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 overflow-hidden bg-black">
      {/* Dynamic background with parallax layers */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={showcaseImages[currentImageIndex]}
              alt="Showcase background"
              fill
              priority
              quality={100}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black/90"></div>
          </motion.div>
        </AnimatePresence>
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 z-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}></div>
      </div>
      
      {/* Holographic floating elements container */}
      <div ref={containerRef} className="absolute inset-0 z-10 overflow-hidden">
        <style jsx global>{`
          @keyframes float {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(var(--x-movement), calc(-1 * var(--y-movement))) rotate(5deg); }
            50% { transform: translate(0, calc(-1.5 * var(--y-movement))) rotate(0deg); }
            75% { transform: translate(calc(-0.5 * var(--x-movement)), calc(-0.5 * var(--y-movement))) rotate(-5deg); }
          }
        `}</style>
      </div>
      
      {/* Main content container */}
      <motion.div 
        className="relative flex flex-col items-center z-20 w-full max-w-4xl px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Interactive light rings */}
        <motion.div 
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full pointer-events-none"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: 'radial-gradient(circle, rgba(138, 43, 226, 0.3) 0%, rgba(138, 43, 226, 0) 70%)'
          }}
        />
        
        <motion.div 
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full pointer-events-none"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          style={{
            background: 'radial-gradient(circle, rgba(255, 20, 147, 0.3) 0%, rgba(255, 20, 147, 0) 70%)'
          }}
        />
        
        {/* Logo with interactive morphing effect */}
        <motion.div 
          className="relative mb-12 mt-6 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
        >
          <motion.div 
            className="absolute inset-0 rounded-full"
            animate={{
              scale: isHovering ? [1, 1.4, 1] : [1, 1.2, 1],
              opacity: isHovering ? [0.4, 0.8, 0.4] : [0.3, 0.6, 0.3],
              background: isHovering 
                ? 'conic-gradient(from 180deg, rgba(138, 43, 226, 0.4), rgba(255, 20, 147, 0.4), rgba(138, 43, 226, 0.4))'
                : 'conic-gradient(from 180deg, rgba(138, 43, 226, 0.3), rgba(255, 20, 147, 0.3), rgba(138, 43, 226, 0.3))'
            }}
            transition={{
              duration: isHovering ? 1.5 : 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              filter: 'blur(20px)'
            }}
          />
          
          <div className="relative z-10 bg-gradient-to-br from-black via-zinc-900 to-black p-8 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.8)] backdrop-blur-xl border-2 border-white/30 hover:border-white/50 transition-all ring-4 ring-white/10">
            <div className="relative w-24 h-24">
              <Image
                src="/images/logo.png"
                className="drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]"
                alt="Pixora logo"
                height={96}
                width={96}
                priority
                style={{
                  filter: 'contrast(1.1) brightness(1.1)',
                  imageRendering: 'crisp-edges'
                }}
              />
            </div>
          </div>
        </motion.div>
        
        {/* Brand name with dynamic gradient */}
        <motion.h1 
          className="text-7xl font-bold mb-12 text-center tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          style={{
            textShadow: '0 0 40px rgba(138, 43, 226, 0.5), 0 0 80px rgba(255, 20, 147, 0.3), 0 4px 16px rgba(0, 0, 0, 0.8)',
            fontWeight: 800,
            letterSpacing: '0.02em'
          }}
        >
          <motion.span 
            className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-fuchsia-300 to-purple-300"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              backgroundSize: ['200% 200%', '300% 300%', '200% 200%']
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            style={{
              WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.3)',
              paintOrder: 'stroke fill',
              filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.4)) brightness(1.2)'
            }}
          >
          Snapora
          </motion.span>
        </motion.h1>
        
        {/* Interactive progress indicator */}
        <div className="w-full max-w-lg relative mb-10">
          {/* Background track with glow */}
          <div className="w-full h-3 bg-zinc-800/60 rounded-full overflow-hidden backdrop-blur-lg border border-white/10 shadow-[0_0_15px_rgba(138,43,226,0.2)]">
            <motion.div 
              className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-500 relative overflow-hidden"
              initial={{ width: "0%" }}
              animate={{ 
                width: `${progress}%`,
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ 
                width: { duration: 0.3 },
                backgroundPosition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              {/* Animated shimmer effect */}
              <motion.div 
                className="absolute inset-y-0 left-0 w-20 bg-white/30"
                animate={{ 
                  left: ['-20%', '120%'],
                  opacity: [0, 0.5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5
                }}
                style={{
                  transform: 'skewX(-20deg)',
                  filter: 'blur(8px)'
                }}
              />
            </motion.div>
          </div>
          
          {/* Percentage indicator that follows progress */}
          <motion.div 
            className="absolute -bottom-6 text-xs font-medium text-white/80"
            animate={{ 
              left: `${progress}%`,
              x: '-50%'
            }}
            transition={{ type: 'spring', damping: 15 }}
          >
            {Math.round(progress)}%
          </motion.div>
        </div>
        
        {/* Dynamic loading message with typewriter effect */}
        <motion.div 
          className="relative h-12 mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={Math.floor(progress / 20)}
              className="text-white text-xl font-semibold tracking-wide px-8 py-3 rounded-full inline-block"
              initial={{ opacity: 0, y: 5 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                background: 'rgba(0, 0, 0, 0.4)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(12px)',
              }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 16px rgba(138, 43, 226, 0.3)',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale'
              }}
            >
              {progress < 100 ? (
                <>
                  {loadingMessages[Math.floor(progress / 20)]}
                  <motion.span
                    className="inline-block ml-1"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ...
                  </motion.span>
                </>
              ) : (
                <motion.span
                  animate={{ 
                    scale: [1, 1.05, 1],
                    textShadow: ['0 2px 16px rgba(255,255,255,0.5)', '0 2px 24px rgba(255,255,255,0.7)', '0 2px 16px rgba(255,255,255,0.5)']
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Ready to explore!
                </motion.span>
              )}
            </motion.p>
          </AnimatePresence>
        </motion.div>
        
        {/* Interactive elements that appear based on progress */}
        {progress > 50 && progress < 100 && (
          <motion.button
            className="mt-8 text-white text-sm font-medium border-2 border-white/30 px-6 py-2.5 rounded-full bg-black/50 backdrop-blur-xl hover:bg-black/70 hover:text-white hover:border-white/50 transition-all flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 20px rgba(138, 43, 226, 0.4), 0 0 40px rgba(255, 20, 147, 0.2)'
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)',
              WebkitFontSmoothing: 'antialiased'
            }}
          >
            <span>Skip Introduction</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </motion.button>
        )}
        
        {progress === 100 && (
          <motion.button
            className="mt-12 px-12 py-5 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-600 text-white text-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-3 group border-2 border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              boxShadow: '0 12px 40px -10px rgba(138, 43, 226, 0.6), 0 0 60px rgba(255, 20, 147, 0.3)'
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 16px 50px -10px rgba(255, 20, 147, 0.7), 0 0 80px rgba(138, 43, 226, 0.4)'
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)',
              WebkitFontSmoothing: 'antialiased',
              letterSpacing: '0.025em'
            }}
          >
            <span>Enter Pixora</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity
              }}
              className="group-hover:translate-x-1 transition-transform"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.span>
          </motion.button>
        )}
      </motion.div>
      
      {/* Image indicators with preview thumbnails on hover */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-30">
        {showcaseImages.map((img, index) => (
          <motion.div 
            key={index} 
            className="relative group"
            whileHover={{ scale: 1.3 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <div 
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentImageIndex ? "w-8 bg-white" : "w-3 bg-white/40"
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
            
            {/* Thumbnail preview */}
            <motion.div 
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-24 h-16 rounded-md overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              initial={{ scale: 0.9 }}
              animate={{ scale: index === currentImageIndex ? 1 : 0.9 }}
            >
              <Image
                src={img}
                alt="Preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      
      {/* Subtle watermark */}
      <motion.div 
        className="absolute bottom-4 right-4 text-white/30 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Pixora v2.0
      </motion.div>
    </div>
  );
};

export default LoadingScreen;