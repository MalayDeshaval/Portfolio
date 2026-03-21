import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Terminal, ChevronDown } from "lucide-react";

const roles = [
  "Ethical Hacker",
  "Cyber Security Enthusiast",
  "Web Security Researcher",
  "Penetration Tester",
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentRole.slice(0, text.length + 1));
          if (text.length === currentRole.length) {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          setText(currentRole.slice(0, text.length - 1));
          if (text.length === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  const skills = [
    "Web Security",
    "Penetration Testing",
    "Ethical Hacking",
    "AI Security",
  ];
  const tools = ["Nmap", "Burp Suite", "Wireshark", "Metasploit", "Nikto"];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center cyber-grid-bg">
      <div className="section-container text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-primary" />
            <span className="font-mono text-sm text-muted-foreground tracking-widest uppercase">
              Secure Portfolio
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold neon-text mb-4 leading-tight">
            Cyber Security
            <br />
            Portfolio
          </h1>

          <div className="h-8 flex items-center justify-center mb-8">
            <Terminal className="w-4 h-4 text-secondary mr-2" />
            <span className="font-mono text-lg text-secondary">
              {text}
              <span className="animate-pulse-neon">|</span>
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href="#projects"
              className="neon-glow-btn bg-primary text-primary-foreground px-8 py-3 rounded-lg font-display font-semibold text-sm tracking-wider uppercase"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="neon-glow-btn-purple bg-secondary/20 text-secondary border border-secondary/40 px-8 py-3 rounded-lg font-display font-semibold text-sm tracking-wider uppercase"
            >
              Contact Me
            </a>
          </div>

          {/* Skill & Tool Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="glass-card neon-border p-4"
            >
              <h3 className="font-display text-xs tracking-widest text-primary mb-3 uppercase">
                Core Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s} className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded text-sm font-mono">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="glass-card neon-border-purple p-4"
            >
              <h3 className="font-display text-xs tracking-widest text-secondary mb-3 uppercase">
                Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((t) => (
                  <span key={t} className="bg-secondary/10 text-secondary border border-secondary/20 px-3 py-1 rounded text-sm font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
