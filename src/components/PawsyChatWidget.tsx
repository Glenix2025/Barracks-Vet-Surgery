import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Phone, HelpCircle, CornerDownLeft, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage } from '../types';

export default function PawsyChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'pawsy',
      text: "G'day! I'm Pawsy, your virtual clinic assistant. 🐾 Welcome to The Barracks Vet Surgery. How can I help you and your pet today?",
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Hide notification badge after chat is opened first time
  useEffect(() => {
    if (isOpen) {
      setShowNotification(false);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((msg) => ({
            sender: msg.sender,
            text: msg.text,
          })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const pawsyMsg: ChatMessage = {
          id: `pawsy_${Date.now()}`,
          sender: 'pawsy',
          text: data.text,
          timestamp: new Date(),
          isUrgentDirect: data.isUrgentDirect,
        };
        setMessages((prev) => [...prev, pawsyMsg]);
      } else {
        throw new Error('Chat API returned error');
      }
    } catch (error) {
      console.error('Chat error:', error);
      // Fallback message in case of failure
      const errorMsg: ChatMessage = {
        id: `pawsy_err_${Date.now()}`,
        sender: 'pawsy',
        text: "No worries, but my connection skipped a beat! Please call Dr James Ross directly on (02) 9969 1100 to get instant advice or book an appointment.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Dynamic unread prompt bubble */}
      <AnimatePresence>
        {showNotification && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="mb-3 bg-white p-4 rounded-3xl rounded-br-none shadow-xl border border-brand-green/10 max-w-[260px] text-left cursor-pointer hover:bg-bg-warm transition-colors relative group"
          >
            <span className="absolute -top-1.5 -left-1.5 bg-brand-orange text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">
              Live Ask
            </span>
            <p className="text-xs text-gray-700 font-sans leading-relaxed">
              🐾 G'day! I'm <strong className="text-brand-green font-bold">Pawsy</strong>. Ask me anything about opening hours, parking, or vaccinations!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className="w-[340px] sm:w-[380px] h-[520px] bg-white rounded-[32px] overflow-hidden shadow-2xl border border-brand-green/15 flex flex-col mb-4"
          >
            {/* Header bar */}
            <div className="bg-brand-green p-4 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/10 rounded-2xl flex items-center justify-center text-xl shadow-inner">
                  🐾
                </div>
                <div className="text-left">
                  <p className="font-display font-bold text-sm tracking-tight leading-none">Pawsy Assistant</p>
                  <p className="text-[10px] text-amber-300 font-medium font-sans mt-0.5">Online & Ready • Australian English</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 overflow-y-auto p-4 bg-bg-warm/50 space-y-4">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-4 rounded-[24px] text-xs leading-relaxed font-sans shadow-sm ${
                        isUser
                          ? 'bg-brand-green text-white rounded-tr-none'
                          : msg.isUrgentDirect
                          ? 'bg-red-50 text-red-900 border border-red-150 rounded-tl-none font-bold'
                          : 'bg-white text-gray-700 border border-brand-green/5 rounded-tl-none'
                      }`}
                    >
                      <p>{msg.text}</p>
                      
                      {/* Urgent CTA helper inside text if urgent */}
                      {!isUser && msg.isUrgentDirect && (
                        <div className="mt-2 pt-2 border-t border-red-100 flex gap-2">
                          <a
                            href="tel:0299691100"
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-xl font-bold font-sans text-[10px] text-center flex-1 transition-colors"
                          >
                            📞 Clinic: (02) 9969 1100
                          </a>
                          <a
                            href="tel:0298890289"
                            className="bg-red-700 hover:bg-red-800 text-white px-3 py-1.5 rounded-xl font-bold font-sans text-[10px] text-center flex-1 transition-colors"
                          >
                            🚨 SASH: (02) 9889 0289
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Loader */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-400 p-3.5 rounded-[20px] rounded-tl-none border border-brand-green/5 text-xs flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              
              <div ref={chatBottomRef} />
            </div>

            {/* Quick Helper Chips (scrolling list) */}
            <div className="px-3 py-2 bg-white border-t border-brand-green/5 overflow-x-auto flex gap-2 shrink-0 scrollbar-hide no-scrollbar">
              <button
                onClick={() => handleQuickQuestion('How do I book an appointment?')}
                className="bg-bg-warm hover:bg-brand-green/5 text-brand-green border border-brand-green/10 px-3 py-1.5 rounded-full text-[10px] font-bold shrink-0 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Calendar className="w-3 h-3 text-brand-orange" />
                <span>📅 Book Appointment</span>
              </button>
              
              <button
                onClick={() => handleQuickQuestion('Where are you located and is there parking?')}
                className="bg-bg-warm hover:bg-brand-green/5 text-brand-green border border-brand-green/10 px-3 py-1.5 rounded-full text-[10px] font-bold shrink-0 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>📍 Hours & Parking</span>
              </button>

              <button
                onClick={() => handleQuickQuestion('What should I bring to my first visit?')}
                className="bg-bg-warm hover:bg-brand-green/5 text-brand-green border border-brand-green/10 px-3 py-1.5 rounded-full text-[10px] font-bold shrink-0 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>🎒 First Visit Guide</span>
              </button>

              <button
                onClick={() => handleQuickQuestion('My dog has chocolate poisoning!')}
                className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-100 px-3 py-1.5 rounded-full text-[10px] font-bold shrink-0 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>🆘 Emergency Help</span>
              </button>
            </div>

            {/* User Input bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="p-3 bg-white border-t border-brand-green/10 flex gap-2 items-center shrink-0"
            >
              <input
                type="text"
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 bg-bg-warm rounded-2xl text-xs border border-transparent focus:border-brand-green focus:outline-none placeholder-gray-400 font-sans"
                placeholder="Ask Pawsy a question about the surgery..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="p-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-2xl transition-colors disabled:opacity-40 shrink-0 flex items-center justify-center cursor-pointer"
                aria-label="Send Message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brand-green hover:bg-brand-green-hover text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl relative cursor-pointer group"
        aria-label="Toggle Pawsy AI chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 transition-transform duration-300 rotate-90" />
        ) : (
          <MessageSquare className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6" />
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 bg-brand-orange w-3.5 h-3.5 rounded-full border-2 border-white animate-pulse" />
        )}
      </motion.button>
    </div>
  );
}
