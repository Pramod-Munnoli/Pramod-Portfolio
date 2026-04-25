import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Extremely smooth spring physics for the inner dot
  const dotSpringConfig = { damping: 40, stiffness: 400, mass: 0.1 };
  const dotX = useSpring(cursorX, dotSpringConfig);
  const dotY = useSpring(cursorY, dotSpringConfig);

  // Very fluid, elegant trailing spring for the outer ring
  const ringSpringConfig = { damping: 25, stiffness: 120, mass: 0.8 };
  const ringX = useSpring(cursorX, ringSpringConfig);
  const ringY = useSpring(cursorY, ringSpringConfig);

  useEffect(() => {
    const updateMousePosition = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Track when hovering over clickable elements
    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    // Add event listeners
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    // Observe DOM mutations to add listeners to new interactive elements
    const setupClickables = () => {
      const clickableElements = document.querySelectorAll(
        'a, button, input, select, textarea, [role="button"], .clickable, .glass-card, [tabindex]:not([tabindex="-1"])'
      );
      clickableElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
    };

    setupClickables();
    
    // Initial visible check if mouse is already in window
    if (cursorX.get() !== -100) {
      setIsVisible(true);
    }

    const observer = new MutationObserver((mutations) => {
      let shouldSetup = false;
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          shouldSetup = true;
        }
      });
      if (shouldSetup) setupClickables();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  // Check if touch device
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* Outer Glow / Trailing Aura */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: '40px',
          height: '40px',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.8 : 1,
          backgroundColor: isHovering ? 'rgba(0, 245, 255, 0.1)' : 'rgba(168, 85, 247, 0.05)',
          border: isHovering ? '1px solid rgba(0, 245, 255, 0.5)' : '1px solid rgba(168, 85, 247, 0.3)',
          boxShadow: isHovering ? '0 0 30px rgba(0, 245, 255, 0.3)' : '0 0 15px rgba(168, 85, 247, 0.15)',
        }}
        transition={{
          scale: { type: 'spring', stiffness: 200, damping: 25 },
          backgroundColor: { duration: 0.3 },
          border: { duration: 0.3 },
          boxShadow: { duration: 0.3 },
          opacity: { duration: 0.3 }
        }}
      />
      
      {/* Main Inner Dot (mix-blend-difference for that ultra-premium feel) */}
      <motion.div
        className="fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: '10px',
          height: '10px',
          mixBlendMode: 'difference',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 4 : 1,
          backgroundColor: isHovering ? '#fff' : '#fff',
        }}
        transition={{
          scale: { type: 'spring', stiffness: 300, damping: 20 },
          opacity: { duration: 0.2 }
        }}
      />
    </>
  );
};

export default CustomCursor;
