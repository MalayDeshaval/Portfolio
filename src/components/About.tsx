import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { User, Shield, Bug, Brain } from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            <span className="font-mono text-muted-foreground text-sm block mb-1">// 01</span>
            About Me
          </h2>
          <p className="section-subtitle">Who I am & what drives me</p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 glass-card neon-border p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <User className="w-5 h-5 text-primary" />
                <h3 className="font-display text-lg text-foreground">Malay Deshaval</h3>
              </div>
              <p className="text-muted-foreground font-body text-lg leading-relaxed">
                I am a cybersecurity enthusiast passionate about identifying vulnerabilities
                and building secure systems. I focus on web penetration testing, AI-powered
                security tools, and phishing detection systems. My goal is to contribute to
                a safer digital world by researching emerging threats and developing innovative
                defense mechanisms.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: Shield, label: "Ethical Hacking", desc: "Responsible vulnerability disclosure" },
                { icon: Bug, label: "Vuln Assessment", desc: "Finding & fixing security flaws" },
                { icon: Brain, label: "AI Security", desc: "ML-powered threat detection" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                  className="glass-card neon-border-purple p-4 flex items-start gap-3"
                >
                  <item.icon className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-display text-sm text-foreground">{item.label}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
