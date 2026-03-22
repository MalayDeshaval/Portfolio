import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Globe, Lock, Brain, KeyRound, MailWarning, Activity } from "lucide-react";

interface Project {
  title: string;
  icon: React.ElementType;
  description: string;
  features: string[];
  tech: string[];
  concepts: string[];
}

const projects: Project[] = [
  {
    title: "Real-Time-Network-Intrusion-Detection-System",
    icon: Activity,
    description: "A real-time network intrusion detection platform that monitors and analyzes network traffic for malicious activities.",
    features: ["Real-time packet capture", "Threat detection & alerting", "Dashboard visualization", "Log management"],
    tech: ["Python", "FastAPI", "React", "WebSockets"],
    concepts: ["Network Security", "Intrusion Detection", "Packet Analysis"],
  },
  {
    title: "Web Penetration Testing Website",
    icon: Globe,
    description: "A security scanning platform that analyzes websites for vulnerabilities and provides security level reports such as Low, Medium, or High.",
    features: ["Website URL scanner", "Vulnerability detection", "Security risk scoring", "Basic penetration testing automation"],
    tech: ["Python", "Flask", "Nmap", "OWASP ZAP"],
    concepts: ["OWASP Top 10", "CVE Analysis", "Risk Assessment"],
  },
  {
    title: "AI Powered Web Penetration Testing",
    icon: Brain,
    description: "An advanced penetration testing platform enhanced with AI that automatically detects security weaknesses and suggests remediation steps.",
    features: ["AI vulnerability analysis", "Automated web scanning", "Security recommendations", "Threat intelligence integration"],
    tech: ["Python", "TensorFlow", "React", "REST API"],
    concepts: ["Machine Learning", "Threat Modeling", "Automated Security"],
  },
  {
    title: "Password Cracking + Defense Lab",
    icon: KeyRound,
    description: "A cybersecurity training lab demonstrating password attack techniques and defensive mechanisms.",
    features: ["Dictionary attack simulation", "Brute force attack simulation", "Password strength analyzer", "Security recommendations"],
    tech: ["Python", "Hashcat", "John the Ripper", "React"],
    concepts: ["Hashing Algorithms", "Salt & Pepper", "Auth Security"],
  },
  {
    title: "URL & Email Phishing Detection",
    icon: MailWarning,
    description: "An AI-powered system that detects phishing URLs and malicious email content to protect users from cyber attacks.",
    features: ["URL risk analysis", "Email content phishing detection", "Machine learning classification", "Real-time threat warnings"],
    tech: ["Python", "Scikit-learn", "NLP", "React"],
    concepts: ["Phishing Patterns", "Social Engineering", "ML Classification"],
  },
];

const Projects = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative">
      <div className="section-container" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className="section-title">
            <span className="font-mono text-muted-foreground text-sm block mb-1">// 04</span>
            Projects
          </h2>
          <p className="section-subtitle">Security tools & research projects</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              onClick={() => setSelected(p)}
              className="glass-card neon-border p-5 cursor-pointer group hover:border-primary/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <p.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-sm text-foreground group-hover:neon-text transition-all">{p.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{p.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.tech.slice(0, 3).map((t) => (
                  <span key={t} className="text-xs font-mono bg-secondary/10 text-secondary border border-secondary/20 px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card neon-border p-6 sm:p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto relative"
            >
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <selected.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg neon-text">{selected.title}</h3>
              </div>

              <p className="text-muted-foreground mb-6">{selected.description}</p>

              <div className="mb-5">
                <h4 className="font-display text-xs tracking-widest text-secondary uppercase mb-2">Features</h4>
                <ul className="space-y-1.5">
                  {selected.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Lock className="w-3 h-3 text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-5">
                <h4 className="font-display text-xs tracking-widest text-secondary uppercase mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {selected.tech.map((t) => (
                    <span key={t} className="text-xs font-mono bg-primary/10 text-primary border border-primary/20 px-2 py-1 rounded">{t}</span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-display text-xs tracking-widest text-secondary uppercase mb-2">Security Concepts</h4>
                <div className="flex flex-wrap gap-2">
                  {selected.concepts.map((c) => (
                    <span key={c} className="text-xs font-mono bg-secondary/10 text-secondary border border-secondary/20 px-2 py-1 rounded">{c}</span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button className="neon-glow-btn bg-primary text-primary-foreground px-5 py-2 rounded-lg font-display text-xs tracking-wider uppercase flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5" /> Demo
                </button>
                <button className="neon-glow-btn-purple bg-secondary/20 text-secondary border border-secondary/40 px-5 py-2 rounded-lg font-display text-xs tracking-wider uppercase flex items-center gap-2">
                  <Github className="w-3.5 h-3.5" /> GitHub
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
