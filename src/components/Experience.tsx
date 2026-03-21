import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Search, Wrench, ShieldAlert } from "lucide-react";

const Experience = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const items = [
    { icon: Search, text: "Practiced penetration testing on test environments" },
    { icon: Wrench, text: "Built cybersecurity tools for vulnerability detection" },
    { icon: ShieldAlert, text: "Developed phishing detection systems" },
    { icon: Briefcase, text: "Implemented password security analysis tools" },
  ];

  return (
    <section id="experience" className="relative">
      <div className="section-container" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className="section-title">
            <span className="font-mono text-muted-foreground text-sm block mb-1">// 03</span>
            Experience
          </h2>
          <p className="section-subtitle">Hands-on cybersecurity work</p>
        </motion.div>

        <div className="glass-card neon-border p-6 sm:p-8 max-w-2xl">
          <div className="flex items-center gap-3 mb-1">
            <Briefcase className="w-5 h-5 text-primary" />
            <h3 className="font-display text-lg text-foreground">Cyber Security Researcher</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-6 ml-8">Self Projects & Research</p>

          <div className="space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                className="flex items-start gap-3 ml-2"
              >
                <item.icon className="w-4 h-4 text-secondary mt-1 shrink-0" />
                <p className="text-muted-foreground">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
