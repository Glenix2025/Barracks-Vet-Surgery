import { Phone, Calendar } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
}

export default function Header({ onOpenBooking }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-green/10 shadow-sm">
      {/* Top utility contact rail */}
      <div className="bg-brand-green text-white py-2 px-6 sm:px-8 text-xs font-sans flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
          <span className="flex items-center gap-1.5 font-medium">
            📍 2A Best Avenue, Mosman, NSW 2088
          </span>
          <span className="flex items-center gap-1.5 font-bold">
            📞 (02) 9969 1100
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="opacity-85 font-medium italic text-center sm:text-right">
            Emergency After Hours (SASH): <a href="tel:0298890289" className="underline hover:text-brand-orange font-bold font-mono transition-colors">(02) 9889 0289</a>
          </span>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-brand-green rounded-2xl flex items-center justify-center text-white font-display font-bold text-2xl group-hover:scale-105 transition-transform shadow-md shadow-brand-green/10">
            B
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-display font-bold tracking-tight text-brand-green leading-none">The Barracks</span>
            <span className="text-[11px] uppercase tracking-widest text-brand-orange font-bold font-sans mt-0.5">Vet Surgery</span>
          </div>
        </a>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-brand-green/80 uppercase tracking-wider">
          <a href="#services" className="hover:text-brand-green transition-colors py-2 relative group">
            Services
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-orange group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#happy-patients" className="hover:text-brand-green transition-colors py-2 relative group">
            Happy Patients
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-orange group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#about-dr-james" className="hover:text-brand-green transition-colors py-2 relative group">
            Dr James
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-orange group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#location" className="hover:text-brand-green transition-colors py-2 relative group">
            Location
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-orange group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#faq" className="hover:text-brand-green transition-colors py-2 relative group">
            FAQs
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-orange group-hover:w-full transition-all duration-300" />
          </a>
        </nav>

        {/* CTA buttons */}
        <div className="flex items-center gap-3">
          <a
            href="tel:0299691100"
            className="p-2.5 rounded-full border border-brand-green/15 text-brand-green hover:bg-bg-warm transition-colors md:hidden"
            title="Call Clinic"
          >
            <Phone className="w-5 h-5" />
          </a>
          <button
            onClick={onOpenBooking}
            className="bg-brand-orange hover:bg-brand-orange-hover text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md shadow-brand-orange/20 transition-all hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </button>
        </div>
      </div>
    </header>
  );
}
