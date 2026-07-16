import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Phone, HelpCircle, CornerDownLeft, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage } from '../types';

const getLocalRuleBasedResponse = (message: string): { text: string; isUrgentDirect?: boolean } => {
  const msg = message.toLowerCase();
  
  // Emergency check
  if (
    msg.includes('vomit') || 
    msg.includes('bleed') || 
    msg.includes('blood') || 
    msg.includes('unresponsive') || 
    msg.includes('seizure') || 
    msg.includes('breath') || 
    msg.includes('limp') || 
    msg.includes('hit') || 
    msg.includes('poison') || 
    msg.includes('chocolate') || 
    msg.includes('chok') ||
    msg.includes('accident') ||
    msg.includes('urgent') ||
    msg.includes('dying')
  ) {
    return {
      text: "This sounds urgent, please call The Barracks Vet Surgery now on (02) 9969 1100 during business hours, or SASH Emergency on (02) 9889 0289 for after hours and emergency care. We recommend getting in touch immediately rather than booking online.",
      isUrgentDirect: true
    };
  }

  // Opening hours
  if (msg.includes('hour') || msg.includes('open') || msg.includes('close') || msg.includes('time') || msg.includes('sunday') || msg.includes('saturday')) {
    return {
      text: "No worries! We are open Monday to Friday from 8:30am to 5:30pm, and Saturdays from 8:00am to 12:30pm. We are closed on Sundays, with consultations conducted by appointment."
    };
  }

  // Location / Parking
  if (msg.includes('located') || msg.includes('where') || msg.includes('address') || msg.includes('parking') || msg.includes('park') || msg.includes('map')) {
    return {
      text: "We are located at 2A Best Avenue, Mosman, in the beautiful former army site at Georges Heights (next to Headland Park). We have free, easy parking spots right at our front door, so you won't need to stress about finding a spot!"
    };
  }

  // Dog & Cat support
  if (msg.includes('dog') || msg.includes('cat') || msg.includes('treat') || msg.includes('species') || msg.includes('rat') || msg.includes('guinea') || msg.includes('rabbit')) {
    return {
      text: "We absolutely treat dogs, cats, and small mammals like guinea pigs and fancy rats! Dogs are weighed at reception on arrival, and we have a separate cat consultation room infused with calming Feliway pheromones so your cat can settle down peacefully."
    };
  }

  // Book appointment / Calendly
  if (msg.includes('book') || msg.includes('appointment') || msg.includes('schedule') || msg.includes('intake') || msg.includes('calendly') || msg.includes('register')) {
    return {
      text: "G'day! You can book an appointment instantly via our Calendly scheduling link (https://calendly.com/pawsy1432/brunswick-veterinary-clinic) or complete our New Patient Registration Form on this page. You can also give us a ring on (02) 9969 1100 to lock in a spot!"
    };
  }

  // Emergency query
  if (msg.includes('emergency') || msg.includes('after hour') || msg.includes('sash') || msg.includes('outside')) {
    return {
      text: "For any after-hours emergencies, please contact SASH (Sydney Animal Specialists Hospital) directly on (02) 9889 0289. During opening hours, please call us immediately on (02) 9969 1100.",
      isUrgentDirect: true
    };
  }

  // Vaccinations
  if (msg.includes('vaccin') || msg.includes('shot') || msg.includes('booster') || msg.includes('puppy') || msg.includes('kitten')) {
    return {
      text: "Yes, we offer full vaccination programs for puppies, kittens, adult booster cycles, and senior cats and dogs. Dr James Ross conducts a full checkup during every vaccination check to make sure your pet is in top shape."
    };
  }

  // First visit Checklist
  if (msg.includes('bring') || msg.includes('first visit') || msg.includes('checklist')) {
    return {
      text: "For your pet's first visit, please bring any previous vaccination cards or medical history you have. On arrival, dogs will be weighed at reception, and cats will head straight into our dedicated cat consult room."
    };
  }

  // Dental Care
  if (msg.includes('dental') || msg.includes('teeth') || msg.includes('tooth') || msg.includes('dentist') || msg.includes('scaling')) {
    return {
      text: "We offer comprehensive dental care, including professional ultrasonic scaling, teeth polishing, and surgical extractions on site. Dr James can also advise on premium diet options and dental home care routines."
    };
  }

  // Surgical procedures
  if (msg.includes('surg') || msg.includes('operat') || msg.includes('de-sex') || msg.includes('desex') || msg.includes('tumor') || msg.includes('orthopaed')) {
    return {
      text: "Dr James Ross performs soft tissue surgeries (such as de-sexing, tumor removals, abdominal surgeries) and basic orthopaedic procedures in our sterile surgical suite. All surgical cases receive tailored pain relief and dedicated nursing care."
    };
  }

  // Digital x-ray
  if (msg.includes('x-ray') || msg.includes('radiograph') || msg.includes('imaging') || msg.includes('scan')) {
    return {
      text: "Yes, we have state-of-the-art digital radiography (x-ray) on site. It provides instant high-resolution diagnostics with reduced waiting times, and we consult with external radiologists free of charge for complex cases."
    };
  }

  // Price / Cost
  if (msg.includes('cost') || msg.includes('price') || msg.includes('fee') || msg.includes('dollar') || msg.includes('expensive')) {
    return {
      text: "The cost of a consultation varies depending on your pet and the reason for your visit. Rather than a flat figure, please call our friendly team on (02) 9969 1100 to discuss what your pet needs so we can give you a clear, honest quote."
    };
  }

  // General default friendly response
  return {
    text: "G'day! I'm Pawsy, the assistant here at The Barracks Vet Surgery. For bookings, feel free to use our Calendly link (https://calendly.com/pawsy1432/brunswick-veterinary-clinic). For anything medical or urgent, please ring our clinic directly on (02) 9969 1100, or let me know what else I can help with!"
  };
};

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
      // Gracefully fall back to the smart local rule-based engine in static/offline environments (like GitHub Pages)
      const localResponse = getLocalRuleBasedResponse(textToSend);
      const pawsyMsg: ChatMessage = {
        id: `pawsy_local_${Date.now()}`,
        sender: 'pawsy',
        text: localResponse.text,
        timestamp: new Date(),
        isUrgentDirect: localResponse.isUrgentDirect,
      };
      setMessages((prev) => [...prev, pawsyMsg]);
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
