import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu } from "lucide-react";

const skills = [
  { name: "Web Penetration Testing", level: 90 },
  { name: "Network Security", level: 85 },
  { name: "Ethical Hacking", level: 88 },
  { name: "Vulnerability Assessment", level: 85 },
  { name: "AI Security", level: 75 },
  { name: "Threat Analysis", level: 80 },
];

const tools = ["Nmap", "Burp Suite", "Wireshark", "Metasploit", "Nikto", "OWASP ZAP"];

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative">
      <div className="section-container" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className="section-title">
            <span className="font-mono text-muted-foreground text-sm block mb-1">// 05</span>
            Skills & Tools
          </h2>
          <p className="section-subtitle">Technical expertise & arsenal</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Skills */}
          <div className="space-y-4">
            <h3 className="font-display text-xs tracking-widest text-primary uppercase mb-4">Skills</h3>
            {skills.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
              >
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-foreground font-body">{s.name}</span>
                  <span className="text-xs font-mono text-muted-foreground">{s.level}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${s.level}%` } : {}}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.8, ease: "easeOut" }}
                    style={{ boxShadow: "0 0 10px hsl(var(--primary) / 0.4)" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-display text-xs tracking-widest text-secondary uppercase mb-4">Tools</h3>
            <div className="grid grid-cols-2 gap-3">
              {tools.map((t, i) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                  className="glass-card neon-border-purple p-4 flex items-center gap-3 hover:border-secondary/60 transition-all duration-300"
                >
                  <Cpu className="w-5 h-5 text-secondary shrink-0" />
                  <span className="font-mono text-sm text-foreground">{t}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
