import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Linkedin, Github, Mail, Loader2 } from "lucide-react";
import emailjs from "emailjs-com";
import { toast } from "sonner";

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);


    const SERVICE_ID = "service_kfoqwwb";
    const TEMPLATE_ID = "template_z61i5qh";
    const PUBLIC_KEY = "1sN7f_DiEA30qNmMF";

    try {

      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          user_name: form.name,     // Fallback for different templates
          from_email: form.email,
          user_email: form.email,   // Fallback for different templates
          reply_to: form.email,
          message: form.message,
          to_name: "Malay Deshaval",
        },
        PUBLIC_KEY
      );

      if (result.status === 200) {
        toast.success("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative">
      <div className="section-container" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className="section-title">
            <span className="font-mono text-muted-foreground text-sm block mb-1">// 06</span>
            Contact
          </h2>
          <p className="section-subtitle">Get in touch</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="glass-card neon-border p-6 space-y-4"
          >
            <div>
              <label className="block font-display text-xs tracking-widest text-primary uppercase mb-1.5">Name</label>
              <input
                name="from_name"
                type="text"
                required
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-foreground font-body focus:outline-none focus:border-primary/60 focus:shadow-[0_0_10px_hsl(var(--primary)/0.15)] transition-all"
              />
            </div>
            <div>
              <label className="block font-display text-xs tracking-widest text-primary uppercase mb-1.5">Email</label>
              <input
                name="from_email"
                type="email"
                required
                maxLength={255}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-foreground font-body focus:outline-none focus:border-primary/60 focus:shadow-[0_0_10px_hsl(var(--primary)/0.15)] transition-all"
              />
            </div>
            <div>
              <label className="block font-display text-xs tracking-widest text-primary uppercase mb-1.5">Message</label>
              <textarea
                name="message"
                required
                maxLength={1000}
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-foreground font-body focus:outline-none focus:border-primary/60 focus:shadow-[0_0_10px_hsl(var(--primary)/0.15)] transition-all resize-none"
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="neon-glow-btn bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-display text-xs tracking-wider uppercase flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Send Message
                </>
              )}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            {[
              { icon: Linkedin, label: "LinkedIn", href: "#", color: "primary" as const },
              { icon: Github, label: "GitHub", href: "https://github.com/MalayDeshaval", color: "secondary" as const },
              { icon: Mail, label: "Email", href: "mailto:contact@malaydeshaval.com", color: "primary" as const },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`glass-card p-4 flex items-center gap-4 hover:-translate-y-1 transition-all duration-300 ${link.color === "primary" ? "neon-border hover:border-primary/60" : "neon-border-purple hover:border-secondary/60"}`}
              >
                <link.icon className={`w-5 h-5 ${link.color === "primary" ? "text-primary" : "text-secondary"}`} />
                <span className="font-display text-sm text-foreground">{link.label}</span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border/30 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Malay Deshaval. All systems secured.
          </p>
          <p className="font-mono text-xs text-muted-foreground flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse-neon" />
            System Status: Online
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
