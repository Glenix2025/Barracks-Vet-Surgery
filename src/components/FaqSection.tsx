import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';
import { FAQItem } from '../types';

const FAQS: FAQItem[] = [
  {
    question: 'What are your opening hours?',
    answer: 'We are open Monday to Friday from 8:30am to 5:30pm, and Saturday from 8:00am to 12:30pm. We are closed on Sundays. Consultations are always conducted strictly by appointment to ensure every pet gets dedicated, undisturbed time with Dr James.'
  },
  {
    question: 'Where are you located and is there parking?',
    answer: 'We are located at 2A Best Avenue, Mosman, NSW 2088 within the quiet former army site at Georges Heights, right next to the Headland Park precinct. Best of all, we have free, flat, easy-to-use parking right at our front door for a completely stress-free arrival.'
  },
  {
    question: 'Do you treat both dogs and cats?',
    answer: 'Yes! We treat dogs, cats, and small animals such as guinea pigs, fancy rats, and rabbits. To keep visits stress-free, dogs are weighed at reception scales upon entry, and cats are taken immediately into a separate, quiet cat consultation room infused with soothing Feliway pheromones.'
  },
  {
    question: 'How do I book an appointment?',
    answer: 'You can call our practice directly on (02) 9969 1100. Alternatively, you can fill out our New Patient Registration Form on this website, which automatically establishes a patient file, or schedule a consultation online using our Calendly system.'
  },
  {
    question: "What should I bring to my pet's first visit?",
    answer: 'Please bring any prior medical records, treatment summaries, or adoption papers you have, especially vaccination history cards showing booster due dates. This helps Dr James Ross build a comprehensive medical profile for your pet.'
  },
  {
    question: 'Do you see new patients?',
    answer: 'Absolutely! We love welcoming new family members to our practice. New clients can pre-register online to save time on arrival, or simply call us on (02) 9969 1100 to set up a patient file over the phone.'
  },
  {
    question: 'What happens if my pet has an emergency outside your opening hours?',
    answer: 'For after-hours emergency or specialist care, please contact SASH (Sydney Animal Specialists Hospital) directly on (02) 9889 0289. They are an external, fully equipped emergency hospital. During regular hours, please call us immediately on (02) 9969 1100 so we can prepare for your arrival.'
  },
  {
    question: 'Do you offer vaccinations for puppies and kittens?',
    answer: 'Yes, we provide full customized vaccination schedules for puppies, kittens, adult pets, and senior booster cycles. Dr James will check your pet over thoroughly during their vaccine appointment to ensure they are in perfect health before receiving their dose.'
  },
  {
    question: 'How often does my pet need a check up?',
    answer: 'We highly recommend a comprehensive wellness exam at least once a year. For senior pets (dogs and cats over 7-8 years old), we suggest twice-yearly geriatric check-ups to monitor joint health, blood chemistry, and organ function proactively.'
  },
  {
    question: 'Do you offer dental care for pets?',
    answer: 'Yes! We perform professional dental examinations, ultrasonic scaling and polishing, and tooth extractions. Dr James can also advise on home-care dental plans, including enzyme toothpastes, special dental kibble, and therapeutic dental chews.'
  },
  {
    question: 'What surgical procedures do you perform?',
    answer: 'We perform routine de-sexing surgeries, soft tissue procedures (including tumor removals, lump biopsies, wound sutures, and abdominal surgeries), and basic orthopaedic procedures in our sterile surgical suite.'
  },
  {
    question: 'Do you have digital x-ray or imaging on site?',
    answer: 'Yes, we have state-of-the-art digital radiography equipment on site. This provides exceptionally high-quality digital images in seconds, reducing procedure time and enabling Dr James to obtain fast, free radiographic advice from specialists when needed.'
  },
  {
    question: 'How much does a standard consultation cost?',
    answer: 'Standard consultation costs vary depending on your pet species, symptoms, and diagnostic requirements. Rather than quoting a fixed dollar figure, we encourage you to call our friendly reception team on (02) 9969 1100 for an accurate quote tailored to your visit.'
  },
  {
    question: 'Can I get a referral to a specialist if needed?',
    answer: 'Yes. Being an independent clinic, we have close relationships with Sydney’s finest veterinary specialists, including SASH and local cardiologists, dermatologists, or oncologists, and will coordinate immediate referrals if your pet requires advanced care.'
  },
  {
    question: 'What suburbs do you service?',
    answer: 'We proudly look after pets and owners across Mosman, Cremorne, Neutral Bay, Clifton Gardens, Beauty Point, Balmoral, and the surrounding Lower North Shore suburbs of Sydney.'
  }
];

export default function FaqSection() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]); // first open by default
  const [searchQuery, setSearchQuery] = useState('');

  const toggleIndex = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  const filteredFaqs = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-20 bg-white relative">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#4A5D4E]/10 text-brand-green px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            <HelpCircle className="w-3.5 h-3.5 text-brand-orange shrink-0" />
            Clear Answers
          </div>
          <h2 className="text-4xl font-display font-bold text-gray-900 tracking-tight">
            Frequently Asked <span className="text-brand-green italic font-serif">Questions</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            Browse our complete general knowledge base. If you can't find what you need, Pawsy, our AI assistant, is online 24/7 in the bottom corner to help!
          </p>
        </div>

        {/* FAQ Search Bar */}
        <div className="relative max-w-md mx-auto mb-10">
          <input
            type="text"
            className="w-full pl-11 pr-4 py-3 bg-bg-warm border border-brand-green/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green placeholder-gray-400 font-sans"
            placeholder="Search our 15 veterinary FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const originalIndex = FAQS.indexOf(faq);
              const isOpen = openIndexes.includes(originalIndex);
              return (
                <div
                  key={originalIndex}
                  className="bg-bg-warm rounded-2xl border border-brand-green/10 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleIndex(originalIndex)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left font-display font-bold text-sm sm:text-base text-brand-green hover:bg-brand-green/5 transition-colors cursor-pointer"
                  >
                    <span className="pr-4">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-brand-orange shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-brand-green shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed font-sans border-t border-brand-green/5 pt-4 bg-white/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-gray-400 text-sm font-sans italic">
              No matching questions found. Try typing a simpler keyword (e.g., "parking", "hours", "cats").
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
