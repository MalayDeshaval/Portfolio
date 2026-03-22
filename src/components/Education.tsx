import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award, BookOpen } from "lucide-react";

const Education = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const timeline = [
    {
      icon: GraduationCap,
      title: "Diploma in CE engineering",
      sub: "Diploma in Computer Engineering",
      color: "secondary" as const,
    },
    {
      icon: GraduationCap,
      title: "B.Tech in Computer Science Engineering",
      sub: "Focused on cybersecurity and network systems",
      color: "primary" as const,
    },
    {
      icon: Award,
      title: "Cisco Networking Certification",
      sub: "Cybersecurity training & networking fundamentals",
      color: "secondary" as const,
    },
    {
      icon: BookOpen,
      title: "Relevant Coursework",
      sub: "Network Security • Ethical Hacking • Cryptography • Secure Software Development",
      color: "primary" as const,
    },
  ];

  return (
    <section id="education" className="relative">
      <div className="section-container" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className="section-title">
            <span className="font-mono text-muted-foreground text-sm block mb-1">// 02</span>
            Education
          </h2>
          <p className="section-subtitle">Academic background & certifications</p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />

          {timeline.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.2, duration: 0.5 }}
              className={`relative flex items-start gap-6 mb-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              <div className="hidden md:block md:w-1/2" />
              <div className={`absolute left-4 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 mt-5 ${item.color === "primary" ? "bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)]" : "bg-secondary shadow-[0_0_10px_hsl(var(--secondary)/0.5)]"}`} />
              <div className={`ml-10 md:ml-0 md:w-1/2 glass-card p-5 ${item.color === "primary" ? "neon-border" : "neon-border-purple"}`}>
                <div className="flex items-center gap-2 mb-2">
                  <item.icon className={`w-5 h-5 ${item.color === "primary" ? "text-primary" : "text-secondary"}`} />
                  <h3 className="font-display text-sm text-foreground">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
