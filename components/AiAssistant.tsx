import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Cpu, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: "System Ready. How can I assist you?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMsg.text);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="mb-4 w-80 md:w-96 h-[450px] glass-panel rounded-lg shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-zinc-300">NOVA // AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-zinc-300 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/40">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 text-sm font-light leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-white/10 text-white rounded-lg rounded-tr-none'
                        : 'bg-zinc-900/80 text-zinc-300 border border-white/5 rounded-lg rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900/50 p-2 rounded-lg rounded-tl-none border border-white/5">
                    <Loader2 className="w-4 h-4 text-zinc-300 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/5 bg-black/40 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask NOVA..."
                className="flex-1 bg-transparent text-white text-sm px-3 py-2 focus:outline-none placeholder-zinc-500 font-light"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="text-zinc-200 hover:text-white disabled:opacity-30 transition-colors p-2"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 flex items-center justify-center rounded-full shadow-lg border backdrop-blur-md transition-all duration-300 ${
          isOpen 
            ? 'bg-white text-black border-white' 
            : 'bg-black/80 text-white border-white/20 hover:border-white'
        }`}
      >
        <MessageSquare className="w-5 h-5" />
      </motion.button>
    </div>
  );
};

export default AiAssistant;