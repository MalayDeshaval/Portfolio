import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, User, Bot, Loader2 } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

const QA_KNOWLEDGE: Record<string, string> = {
  "education": "I completed my Diploma in Computer Engineering and my B.Tech in Computer Science Engineering. I also have a Cisco Networking Certification.",
  "project": "I've worked on the Real-Time Network Intrusion Detection System, an AI Web Penetration Testing platform, Password Cracking labs, and Phishing Detection systems.",
  "nids": "The Real-Time-Network-Intrusion-Detection-System is an AI-powered platform I built using Python, FastAPI, React, and WebSockets to monitor and analyze network traffic for malicious activities.",
  "contact": "You can reach out to me via the Contact section at the bottom, or send me an email directly. I'm always open to discussing cybersecurity and software development!",
  "about": "I'm Malay Deshaval, a cybersecurity enthusiast and software developer focusing on network security, penetration testing, and AI applications.",
  "who are you": "I am Malay Deshaval's AI assistant. I can help you navigate his portfolio and answer questions about his experience and projects!",
  "hi": "Hello! I am Malay Deshaval's AI assistant. How can I help you today?",
  "hello": "Hello! I am Malay Deshaval's AI assistant. How can I help you today?",
  "skills": "My technical skills include Python, React, penetration testing tools, and network analysis tools. Check out the Skills section for more details!",
  "cert": "I hold a Cisco Networking Certification and have extensive coursework in ethical hacking, cryptography, and secure development.",
  "experience": "I have hands-on experience in building cybersecurity platforms like my Real-Time NIDS and Web Penetration Testing platforms.",
  "default": "I'm still learning! Could you please ask specifically about my education, projects, skills, or contact info?"
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
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
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
              className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg hover:shadow-[0_0_20px_hsl(var(--primary)/0.6)] hover:scale-105 transition-all duration-300"
            >
              <MessageSquare className="w-6 h-6" />
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
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 glass-card neon-border rounded-xl flex flex-col overflow-hidden shadow-2xl"
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
            <div className="flex-1 h-80 p-4 overflow-y-auto flex flex-col gap-4 scrollbar-thin" ref={scrollRef}>
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
