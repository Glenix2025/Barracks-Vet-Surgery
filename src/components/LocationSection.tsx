import { MapPin, Phone, Mail, Clock, ParkingSquare, Compass, ShieldAlert } from 'lucide-react';

export default function LocationSection() {
  return (
    <section id="location" className="py-20 bg-[#F2F4F2]/30 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-green/5 rounded-full -translate-y-1/2 -ml-40" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Location details and unique setting */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-[#4A5D4E]/10 text-brand-green px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              <Compass className="w-3.5 h-3.5 text-brand-orange shrink-0" />
              Unique Parkland Location
            </div>

            <h2 className="text-4xl font-display font-bold text-gray-900 tracking-tight leading-tight">
              Our Location in <span className="text-brand-green italic font-serif">Georges Heights</span>
            </h2>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              We are located in the historic former army barracks site at Georges Heights, right next to the beautiful <span className="font-semibold text-brand-green">Headland Park precinct</span> on Middle Head. This tranquil, open location is surrounded by quiet greenery and popular dog walking trails, making your visit to the vet feel like a relaxing walk in the park.
            </p>

            {/* Practical details card */}
            <div className="bg-white p-6 rounded-3xl border border-brand-green/10 shadow-sm space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-brand-green/10 text-brand-green shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-brand-green">Surgery Address</h4>
                  <p className="text-sm text-gray-600 mt-0.5 font-sans">
                    2A Best Avenue, Mosman, NSW 2088
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Adjacent to Georges Heights Oval & Headland Park Precinct.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-brand-green/10 text-brand-green shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-brand-green">Opening Hours</h4>
                  <div className="text-xs text-gray-600 mt-1 grid grid-cols-2 gap-x-4 gap-y-1 font-sans">
                    <span className="font-medium text-gray-700">Mon - Fri:</span>
                    <span>8:30am – 5:30pm</span>
                    <span className="font-medium text-gray-700">Saturday:</span>
                    <span>8:00am – 12:30pm</span>
                    <span className="font-medium text-gray-700">Sunday:</span>
                    <span className="text-red-500 font-bold">Closed</span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1.5 italic">
                    Consultations are strictly by appointment.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-brand-green/10 text-brand-green shrink-0 mt-0.5">
                  <ParkingSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-brand-green">At-Door Parking</h4>
                  <p className="text-sm text-gray-600 mt-0.5 font-sans">
                    Enjoy simple, flat, free parking spots right in front of our entrance. No steep stairs or difficult ramps for anxious pets.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Stunning Interactive Graphic representing Georges Heights Map & trails */}
          <div className="lg:col-span-7 relative">
            <div className="bg-brand-green/90 text-white rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
              {/* Absract grid backgrounds to represent layout */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative space-y-6">
                <span className="bg-white/20 text-white font-sans text-xs font-bold uppercase tracking-widest py-1.5 px-3.5 rounded-full">
                  🗺️ Mosman Local Service Area
                </span>

                <h3 className="text-3xl font-display font-bold leading-tight">
                  Servicing the Lower North Shore
                </h3>
                
                <p className="text-sm opacity-90 leading-relaxed font-sans font-light">
                  While nestled in Georges Heights, Dr James and the team proudly look after companion animals from all surrounding Lower North Shore suburbs, including:
                </p>

                {/* Suburbs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-sans font-bold">
                  <div className="bg-white/10 px-4 py-3 rounded-xl border border-white/5 text-center hover:bg-white/15 transition-all">📍 Mosman</div>
                  <div className="bg-white/10 px-4 py-3 rounded-xl border border-white/5 text-center hover:bg-white/15 transition-all">📍 Cremorne</div>
                  <div className="bg-white/10 px-4 py-3 rounded-xl border border-white/5 text-center hover:bg-white/15 transition-all">📍 Neutral Bay</div>
                  <div className="bg-white/10 px-4 py-3 rounded-xl border border-white/5 text-center hover:bg-white/15 transition-all">📍 Clifton Gardens</div>
                  <div className="bg-white/10 px-4 py-3 rounded-xl border border-white/5 text-center hover:bg-white/15 transition-all">📍 Beauty Point</div>
                  <div className="bg-white/10 px-4 py-3 rounded-xl border border-white/5 text-center hover:bg-white/15 transition-all">📍 Balmoral</div>
                </div>

                {/* Route guidance representation block */}
                <div className="bg-white/95 backdrop-blur-sm p-4 rounded-3xl text-gray-800 space-y-3 shadow-md">
                  <h4 className="font-display font-bold text-sm text-brand-green">Directions & Arrival Guide</h4>
                  <ul className="text-xs space-y-2 text-gray-600 list-disc list-inside">
                    <li>Drive up Middle Head Road, turn left into Best Avenue.</li>
                    <li>The clinic is easily visible on the former army site.</li>
                    <li>Walk dogs along the walking trails before or after appointments to settle their nerves!</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
