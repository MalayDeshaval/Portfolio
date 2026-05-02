import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, User, Bot, Loader2 } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

const QA_KNOWLEDGE: Record<string, string> = {
  "education": "Malay has a strong academic background: a Diploma in Computer Engineering, a B.Tech in Computer Science Engineering (focused on Cybersecurity), and a Cisco Networking Certification.",
  "b.tech": "He completed his B.Tech in Computer Science Engineering with a focus on cybersecurity and network systems.",
  "diploma": "He holds a Diploma in Computer Engineering (CE engineering).",
  "cisco": "He is certified in Cisco Networking, covering cybersecurity training and networking fundamentals.",
  "project": "Malay has developed several security projects, including a Real-Time NIDS, AI-powered Web Penetration Testing platforms, Password Cracking labs, and Phishing Detection systems. Which one would you like to know more about?",
  "nids": "The 'Real-Time-Network-Intrusion-Detection-System' monitors network traffic for malicious activities using Python, FastAPI, React, and WebSockets. It features real-time packet capture and threat alerting.",
  "web penetration": "He built two web penetration testing platforms: one using Python, Flask, and Nmap for vulnerability scanning, and an advanced AI-powered version using TensorFlow for automated security analysis.",
  "ai penetration": "The AI Powered Web Penetration Testing project uses TensorFlow and Python to automatically detect security weaknesses and suggest remediation steps.",
  "password": "His Password Cracking + Defense Lab demonstrates hashing algorithms, salt & pepper techniques, and simulations of dictionary and brute force attacks using Hashcat and John the Ripper.",
  "phishing": "The URL & Email Phishing Detection system uses Machine Learning (Scikit-learn and NLP) to classify and detect malicious links and email content in real-time.",
  "contact": "You can reach out to Malay through the Contact section, email him at contact@malaydeshaval.com, or connect on LinkedIn. Check the links on the left side of the contact form!",
  "linkedin": "You can find Malay on LinkedIn at: https://www.linkedin.com/in/malay-deshaval-2b674835b/",
  "github": "His GitHub profile is: https://github.com/MalayDeshaval. It contains all his cybersecurity research and tools.",
  "about": "Malay Deshaval is a Cybersecurity Researcher and Software Developer specializing in penetration testing, AI security, and network defense.",
  "experience": "He has extensive experience as a Cyber Security Researcher, building tools for vulnerability detection, phishing detection, and password security analysis.",
  "skills": "Malay's skills include Python, React, FastAPI, TensorFlow, Scikit-learn, Nmap, OWASP ZAP, Metasploit, Wireshark, and Burp Suite. He's also proficient in Network Security and Ethical Hacking.",
  "python": "Malay uses Python extensively for building security tools, machine learning models, and backend APIs (FastAPI/Flask).",
  "react": "This entire portfolio is built with React! He also uses React for the dashboards of his security platforms.",
  "who are you": "I am Malay Deshaval's AI assistant. I'm here to answer any questions about his skills, projects, or background!",
  "hi": "Hello! I am Malay's AI assistant. Feel free to ask about his projects, skills, or how to contact him!",
  "hello": "Hi there! How can I help you explore Malay's portfolio today?",
  "cert": "Besides his degree, he holds a Cisco Networking Certification and has completed coursework in Ethical Hacking and Cryptography.",
  "owner": "Malay Deshaval is the owner and developer of this portfolio.",
  "creator": "This portfolio was created by Malay Deshaval.",
  "developer": "Malay Deshaval built this entire cybersecurity portfolio and all the projects featured here.",
  "default": "I'm not sure about that specifically. Try asking about his projects (like NIDS or Phishing Detection), skills, education, or how to contact him!"
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "bot", text: "Hi there! I'm Malay Deshaval's AI assistant. Ask me anything about his portfolio!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth"
        });
      }
    };
    
    // Use a small timeout to ensure DOM has updated
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      const lowerInput = userMsg.text.toLowerCase();
      let responseText = QA_KNOWLEDGE["default"];
      
      for (const [key, value] of Object.entries(QA_KNOWLEDGE)) {
        if (key !== "default" && lowerInput.includes(key)) {
          responseText = value;
          break;
        }
      }

      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), sender: "bot", text: responseText }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg hover:shadow-[0_0_30px_hsl(var(--primary)/0.8)] hover:scale-110 transition-all duration-300 relative group overflow-hidden"
            >
              <div className="relative w-10 h-10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full opacity-100">
                  <path d="M12 8V4H8" />
                  <rect width="16" height="12" x="4" y="8" rx="2" />
                  <path d="M2 14h2" />
                  <path d="M20 14h2" />
                </svg>
                {/* Left Eye */}
                <motion.div 
                  className="absolute bg-primary-foreground rounded-full shadow-[0_0_5px_white]"
                  style={{ 
                    width: '5px', 
                    height: '6px',
                    top: '52%',
                    left: '32%',
                  }}
                  animate={{ 
                    scaleY: [1, 0, 1, 1, 1],
                    x: [0, 0, 0, -3, 3, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    times: [0, 0.1, 0.2, 0.5, 1],
                    ease: "easeInOut"
                  }}
                />
                {/* Right Eye */}
                <motion.div 
                  className="absolute bg-primary-foreground rounded-full shadow-[0_0_5px_white]"
                  style={{ 
                    width: '5px', 
                    height: '6px',
                    top: '52%',
                    left: '53%',
                  }}
                  animate={{ 
                    scaleY: [1, 0, 1, 1, 1],
                    x: [0, 0, 0, -3, 3, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    times: [0, 0.1, 0.2, 0.5, 1],
                    ease: "easeInOut"
                  }}
                />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 glass-card neon-border rounded-xl flex flex-col overflow-hidden shadow-2xl max-h-[min(600px,calc(100vh-100px))]"
          >
            {/* Header */}
            <div className="bg-secondary/10 border-b border-secondary/20 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold neon-text">Malay Deshaval</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    AI Assistant Active
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div 
              className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 scrollbar-thin scroll-smooth overscroll-contain touch-pan-y" 
              ref={scrollRef}
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} gap-2`}
                >
                  {msg.sender === "bot" && (
                    <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-3 h-3 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-xl p-3 text-sm flex flex-col gap-1 ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-secondary/10 border border-secondary/20 text-foreground rounded-tl-sm"
                    }`}
                  >
                    <span>{msg.text}</span>
                  </div>
                  {msg.sender === "user" && (
                    <div className="w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center shrink-0 mt-1">
                      <User className="w-3 h-3 text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-3 h-3 text-primary" />
                  </div>
                  <div className="bg-secondary/10 border border-secondary/20 rounded-xl rounded-tl-sm p-3 flex items-center gap-1.5 max-w-[80%] text-sm text-muted-foreground">
                    <Loader2 className="w-3 h-3 animate-spin text-primary" />
                    Typing...
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-secondary/20 bg-background/50 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask me something..."
                className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
