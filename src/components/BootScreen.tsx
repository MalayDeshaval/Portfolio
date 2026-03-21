import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);
  const lines = [
    "> Initializing Secure System...",
    "> Loading encryption modules...",
    "> Establishing secure connection...",
    "> System ready.",
    "",
    "Welcome to Malay Deshaval's",
    "Cyber Security Portfolio",
  ];

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    lines.forEach((_, i) => {
      timers.push(setTimeout(() => setPhase(i + 1), 400 * (i + 1)));
    });
    timers.push(setTimeout(onComplete, 400 * lines.length + 1200));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-lg w-full px-6">
          <div className="font-mono text-sm space-y-1">
            {lines.slice(0, phase).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={
                  i >= 5
                    ? "text-xl sm:text-2xl font-display neon-text text-center mt-4"
                    : i === 3
                    ? "text-primary"
                    : "text-muted-foreground"
                }
              >
                {line}
              </motion.div>
            ))}
          </div>
          {phase < lines.length && (
            <div className="mt-4 flex items-center gap-2">
              <div className="h-1 flex-1 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(phase / lines.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                {Math.round((phase / lines.length) * 100)}%
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BootScreen;
