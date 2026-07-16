import { Star, MapPin, Sparkles, Phone, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

const drJamesPhoto = new URL('../assets/images/dr_james_ross_1784180266212.jpg', import.meta.url).href;
const clinicExteriorPhoto = new URL('../assets/images/clinic_exterior_1784185640077.jpg', import.meta.url).href;

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-b from-white via-bg-warm to-bg-warm overflow-hidden py-16 lg:py-24">
      {/* Background design elements */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-brand-green/5 rounded-full filter blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-orange/5 rounded-full filter blur-3xl -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left column text & actions */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#4A5D4E]/10 text-brand-green px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
            <span className="flex items-center text-brand-orange">
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current animate-pulse" />
            </span>
            <span className="opacity-90 font-display">4.9/5 on Google Reviews • Independent Vet Since 2009</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1] tracking-tight text-gray-900">
            Caring for <span className="text-brand-green italic font-serif">Mosman’s Pets</span> in the quiet heart of Headland Park.
          </h1>

          {/* Paragraph */}
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl font-sans font-light">
            Family-owned and independent general veterinary practice. Nestled within the tranquil, open setting of Georges Heights on Middle Head, we offer high-quality medical care in a spacious environment with easy parking right at our door.
          </p>

          {/* Highlights */}
          <div className="grid sm:grid-cols-2 gap-4 py-2 text-sm text-brand-green/95 font-medium font-sans">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 bg-[#4A5D4E]/10 rounded-full flex items-center justify-center text-xs shrink-0 text-brand-green font-bold">✓</div>
              <span>Easy, free parking at our door</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 bg-[#4A5D4E]/10 rounded-full flex items-center justify-center text-xs shrink-0 text-brand-green font-bold">✓</div>
              <span>Separate dog & cat consult spaces</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 bg-[#4A5D4E]/10 rounded-full flex items-center justify-center text-xs shrink-0 text-brand-green font-bold">✓</div>
              <span>State-of-the-art digital X-rays</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 bg-[#4A5D4E]/10 rounded-full flex items-center justify-center text-xs shrink-0 text-brand-green font-bold">✓</div>
              <span>Independent & GP family practice</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <button
              onClick={onOpenBooking}
              className="bg-brand-orange hover:bg-brand-orange-hover text-white px-8 py-4 rounded-2xl font-bold text-base shadow-lg shadow-brand-orange/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 shrink-0" />
              <span>New Patient Registration</span>
            </button>
            
            <a
              href="tel:0299691100"
              className="bg-white hover:bg-bg-warm text-brand-green border border-brand-green/15 px-8 py-4 rounded-2xl font-bold text-base transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Phone className="w-4 h-4 text-brand-orange shrink-0" />
              <span>Call (02) 9969 1100</span>
            </a>
          </div>

          {/* Mini doctor info */}
          <div className="pt-6 flex items-center gap-3.5 border-t border-brand-green/10 max-w-md">
            <div className="w-14 h-14 rounded-full border-2 border-white overflow-hidden shadow-md shrink-0 bg-gray-100">
              <img
                src={drJamesPhoto}
                alt="Dr James Ross"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <p className="font-bold text-gray-900 leading-none">Dr James Ross</p>
              <p className="text-xs text-brand-orange font-bold font-sans mt-1">Founder & Principal Veterinarian</p>
              <p className="text-[11px] text-gray-500 font-sans mt-0.5 italic">Over 20 years of local Mosman vet care experience</p>
            </div>
          </div>
        </div>

        {/* Right column: Beautiful graphic of Clinic Setting */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Elegant outer border framing */}
            <div className="absolute inset-0 bg-brand-green rounded-[40px] transform rotate-3 scale-95 opacity-10" />
            <div className="bg-white p-4 rounded-[40px] shadow-2xl border border-brand-green/10 relative overflow-hidden group">
              <div className="aspect-[4/5] rounded-[32px] overflow-hidden relative flex flex-col justify-end p-8 text-left border-2 border-brand-green/5">
                <img
                  src={clinicExteriorPhoto}
                  alt="The Barracks Vet Surgery Exterior"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/5" />
                
                <div className="relative z-10 space-y-2">
                  <span className="inline-flex items-center gap-1.5 bg-amber-400 text-brand-green text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-sans shadow-sm">
                    <MapPin className="w-3 h-3 text-brand-green fill-current animate-bounce" />
                    Georges Heights, Mosman
                  </span>
                  
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight">
                    The Barracks Vet Surgery
                  </h3>
                  
                  <p className="text-xs text-amber-300 uppercase tracking-widest font-bold font-sans">
                    Historic Parkland Setting
                  </p>
                  
                  <p className="text-xs text-gray-200 leading-relaxed font-sans font-light pt-1">
                    Nestled in the tranquil, open parkland of Middle Head, next to peaceful walking tracks. Experience a completely stress-free arrival with free parking at our door.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
