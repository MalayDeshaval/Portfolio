import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Smooth springs for the trailing effect
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const trailX = useSpring(0, springConfig);
  const trailY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      trailX.set(e.clientX);
      trailY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") !== null || 
        target.closest("button") !== null
      );

      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [trailX, trailY, isVisible]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* Trailing Circle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-primary/40 rounded-full"
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isVisible ? (isHovering ? 0.8 : 0.4) : 0,
          borderColor: isHovering ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.4)",
        }}
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Trailing Glow */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 bg-primary/5 rounded-full blur-sm"
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isVisible ? (isHovering ? 0.8 : 0.5) : 0,
        }}
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
};

export default CustomCursor;
