import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HappyPatientsWall from './components/HappyPatientsWall';
import ServicesGrid from './components/ServicesGrid';
import AboutPractice from './components/AboutPractice';
import LocationSection from './components/LocationSection';
import Testimonials from './components/Testimonials';
import FaqSection from './components/FaqSection';
import BookingModal from './components/BookingModal';
import PawsyChatWidget from './components/PawsyChatWidget';
import { Calendar, Phone, Sparkles, AlertCircle, Heart, CheckCircle } from 'lucide-react';
import { BookingData } from './types';

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [registrations, setRegistrations] = useState<any[]>([]);

  // Function to pull registered patients from the Express memory to show a functional live demonstration feed
  const fetchRegistrations = async () => {
    try {
      const response = await fetch('/api/registrations');
      if (response.ok) {
        const data = await response.json();
        const serverRegs = data.registrations || [];
        
        // Sync with local storage
        const local = localStorage.getItem('barracks_registrations');
        const localRegs = local ? JSON.parse(local) : [];
        
        // Merge and deduplicate
        const combined = [...serverRegs];
        localRegs.forEach((lr: any) => {
          if (!combined.some(sr => sr.id === lr.id)) {
            combined.push(lr);
          }
        });
        
        setRegistrations(combined);
      } else {
        fallbackToLocal();
      }
    } catch (err) {
      // Quietly fall back to localStorage on static/offline hosts (like GitHub Pages) to avoid disruptive errors
      fallbackToLocal();
    }
  };

  const fallbackToLocal = () => {
    try {
      const local = localStorage.getItem('barracks_registrations');
      if (local) {
        setRegistrations(JSON.parse(local));
      } else {
        setRegistrations([]);
      }
    } catch (e) {
      setRegistrations([]);
    }
  };

  useEffect(() => {
    fetchRegistrations();
    // Poll registration updates every 5 seconds for live feedback
    const interval = setInterval(fetchRegistrations, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleRegistrationSuccess = (newPatient: BookingData) => {
    fetchRegistrations();
  };

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-gray-800 bg-bg-warm select-none">
      {/* Dynamic Clinic Status banner */}
      <div className="bg-brand-orange text-white py-1.5 px-4 text-center text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
        <span>Welcoming New Patients • Free Parking Available at the Door 🐕</span>
      </div>

      {/* Header with sticky layout */}
      <Header onOpenBooking={() => setBookingOpen(true)} />

      {/* Core Sections */}
      <main className="flex-1">
        {/* Hero Banner Section */}
        <Hero onOpenBooking={() => setBookingOpen(true)} />

        {/* Happy Patients community wall (The user's special request!) */}
        <HappyPatientsWall />

        {/* Categories Services Grid */}
        <ServicesGrid />

        {/* About Dr James Ross & Practice details */}
        <AboutPractice />

        {/* Google Reviews Testimonial Section */}
        <Testimonials />

        {/* Setting, Hours, Maps and Location */}
        <LocationSection />

        {/* Live Patient Intake Demonstration Feed (Functional demonstration of back-to-front saving) */}
        {registrations.length > 0 && (
          <section className="py-12 bg-emerald-50/50 border-t border-b border-brand-green/10">
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-6 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-xl shrink-0">✨</div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-brand-green">Live Clinic Reception Intake</h3>
                      <p className="text-xs text-gray-400 font-medium">Functional demonstration of backend Patient File registration</p>
                    </div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 font-sans text-[10px] font-bold px-3 py-1 rounded-full uppercase shrink-0 self-start sm:self-auto">
                    ● {registrations.length} Active Intake{registrations.length > 1 ? 's' : ''} in Session
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {registrations.map((patient, index) => (
                    <div
                      key={patient.id || index}
                      className="bg-bg-warm p-4 rounded-2xl border border-emerald-100/50 flex flex-col justify-between space-y-3 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-brand-orange/5 rounded-full -mr-8 -mt-8" />
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          <span className="font-display font-bold text-sm text-gray-900">{patient.petName}</span>
                          <span className="text-[10px] text-gray-400 capitalize bg-white px-2 py-0.5 rounded-full border border-gray-100">
                            {patient.petType === 'dog' ? '🐕 Dog' : patient.petType === 'cat' ? '🐈 Cat' : '🐹 Small Mammal'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 font-sans mt-1">
                          Owner: <span className="font-semibold text-brand-green">{patient.ownerName}</span>
                        </p>
                        <p className="text-xs text-gray-600 font-sans italic line-clamp-2 mt-2 bg-white/65 p-2 rounded-xl">
                          "{patient.reason}"
                        </p>
                      </div>

                      <div className="pt-2 border-t border-brand-green/5 flex items-center justify-between text-[10px] text-gray-400 font-sans">
                        <span>Pref Date: {patient.preferredDate}</span>
                        <span className="text-emerald-700 font-semibold">Ready to Confirm</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Scannable FAQ Accordion near the bottom */}
        <FaqSection />
      </main>

      {/* Structured Footer */}
      <footer className="bg-brand-green text-white pt-16 pb-8 border-t border-white/5 text-left relative z-10 font-sans">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Practice Branding Column */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center font-display font-bold text-xl text-white">
                B
              </div>
              <div className="flex flex-col">
                <span className="text-base font-display font-bold tracking-tight text-white leading-none">The Barracks</span>
                <span className="text-[10px] uppercase tracking-widest text-brand-orange font-bold font-sans mt-0.5">Vet Surgery</span>
              </div>
            </div>
            
            <p className="text-xs text-white/70 leading-relaxed max-w-sm">
              Family-owned, independent veterinary clinic in Georges Heights, Mosman NSW. Providing calm, premium, and stress-free pet care since 2009 under founder Dr James Ross.
            </p>

            <div className="pt-2 text-xs text-white/50">
              <p>© {new Date().getFullYear()} The Barracks Vet Surgery. All rights reserved.</p>
              <p className="mt-1">ABN 87 132 110 900</p>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-display font-bold text-sm tracking-wide uppercase text-brand-orange">Navigation</h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li><a href="#services" className="hover:text-white hover:underline transition-all">Clinic Services</a></li>
              <li><a href="#happy-patients" className="hover:text-white hover:underline transition-all">Happy Patients</a></li>
              <li><a href="#about-dr-james" className="hover:text-white hover:underline transition-all">Dr James Ross</a></li>
              <li><a href="#location" className="hover:text-white hover:underline transition-all">Surgery Location</a></li>
              <li><a href="#faq" className="hover:text-white hover:underline transition-all">FAQs</a></li>
            </ul>
          </div>

          {/* Core Services Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-sm tracking-wide uppercase text-brand-orange">Opening Hours</h4>
            <div className="text-xs text-white/80 space-y-1.5 font-sans">
              <p><span className="font-semibold">Monday – Friday:</span> 8:30am – 5:30pm</p>
              <p><span className="font-semibold">Saturday:</span> 8:00am – 12:30pm</p>
              <p><span className="font-semibold">Sunday:</span> Closed</p>
              <p className="text-[10px] text-white/50 italic pt-1">Consultations are strictly by appointment.</p>
            </div>
          </div>

          {/* Contact Details Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-sm tracking-wide uppercase text-brand-orange">Emergency & Contact</h4>
            <div className="space-y-3 text-xs text-white/90">
              <div>
                <p className="font-bold text-white uppercase tracking-wider text-[10px] opacity-80">General Bookings & Inquiries</p>
                <p className="text-sm font-bold font-mono mt-0.5">📞 (02) 9969 1100</p>
              </div>

              <div className="p-3 bg-red-950/40 rounded-2xl border border-red-800/50 space-y-1">
                <p className="font-bold text-red-400 uppercase tracking-wider text-[9px]">After Hours Urgent Emergency</p>
                <p className="text-xs font-bold font-mono text-red-200">📞 (02) 9889 0289</p>
                <p className="text-[9px] text-red-300/80">External specialists: SASH Hospital</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Credit */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-12 pt-6 border-t border-white/5 text-center text-[10px] text-white/40 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <p>
            Designed with absolute precision and local Mosman focus. High-contrast colors, verified client stories, and warm parkland aesthetic.
          </p>
          <div className="flex gap-4 justify-center">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>

      {/* Modals & Chat Elements */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        onSuccess={handleRegistrationSuccess}
      />

      {/* Floating collapsible AI Assistant Pawsy */}
      <PawsyChatWidget />
    </div>
  );
}
