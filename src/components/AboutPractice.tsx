import { Award, HeartHandshake, ShieldCheck, CheckSquare, Sparkles } from 'lucide-react';

const drJamesPhoto = new URL('../assets/images/dr_james_ross_1784180266212.jpg', import.meta.url).href;
const catConsultPhoto = new URL('../assets/images/cat_consult_room_1784185396156.jpg', import.meta.url).href;
const dogConsultingPhoto = new URL('../assets/images/dog_consulting_room_1784185415607.jpg', import.meta.url).href;
const radiographyPhoto = new URL('../assets/images/radiography_suite_1784185429815.jpg', import.meta.url).href;

export default function AboutPractice() {
  return (
    <section id="about-dr-james" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Visual Placeholders with gorgeous framing */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-[#E8EFE9] rounded-3xl overflow-hidden relative border border-brand-green/10 shadow-sm group">
              <img
                src={drJamesPhoto}
                alt="Dr James Ross - Principal Vet"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-6">
                <h4 className="font-display font-bold text-base text-white">Dr James Ross</h4>
                <p className="text-xs text-amber-300 font-bold font-sans mt-0.5">Founder & Vet Surgeon</p>
              </div>
              <div className="absolute top-4 right-4 bg-white/90 text-[9px] font-bold px-2.5 py-1 rounded-full text-brand-green uppercase shadow-md font-sans">
                USyd Trained
              </div>
            </div>
            
            <div className="aspect-[1/1] bg-amber-50 rounded-3xl overflow-hidden relative border border-brand-green/10 shadow-sm group">
              <img
                src={catConsultPhoto}
                alt="Separate Cat Consult Room"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-5">
                <span className="text-base mb-1">🐱</span>
                <h4 className="font-display font-bold text-xs text-white">Separate Cat Room</h4>
                <p className="text-[9px] text-amber-300 font-bold font-sans mt-0.5">With calming Feliway</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-8">
            <div className="aspect-[1/1] bg-orange-50 rounded-3xl overflow-hidden relative border border-brand-green/10 shadow-sm group">
              <img
                src={dogConsultingPhoto}
                alt="Spacious Dog Consulting Room"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-5">
                <span className="text-base mb-1">🐕</span>
                <h4 className="font-display font-bold text-xs text-white">Spacious Dog Consult</h4>
                <p className="text-[9px] text-amber-300 font-bold font-sans mt-0.5">Custom built-in scales</p>
              </div>
            </div>

            <div className="aspect-[4/5] bg-slate-50 rounded-3xl overflow-hidden relative border border-brand-green/10 shadow-sm group">
              <img
                src={radiographyPhoto}
                alt="Digital Radiography Suite"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-6">
                <span className="text-xl mb-1">⚡</span>
                <h4 className="font-display font-bold text-sm text-white">Digital Radiography</h4>
                <p className="text-[10px] text-amber-300 font-bold font-sans mt-0.5">High-speed on-site X-rays</p>
              </div>
              <div className="absolute top-4 right-4 bg-brand-green text-white text-[8px] font-bold px-2.5 py-1 rounded-full uppercase shadow-md font-sans">
                State-of-the-Art
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Text Information */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 bg-[#4A5D4E]/10 text-brand-green px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            <Award className="w-3.5 h-3.5 text-brand-orange shrink-0" />
            Our Heritage & Principal Vet
          </div>

          <h2 className="text-4xl font-display font-bold text-gray-900 tracking-tight leading-tight">
            Meet <span className="text-brand-green italic font-serif">Dr James Ross</span> & The Family Surgery
          </h2>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Established in 2009, <span className="font-semibold text-brand-green">The Barracks Vet Surgery</span> is a proudly independent, family-owned veterinary clinic. Unlike corporate-owned franchises, our clinical advice and treatment suggestions are guided solely by what is best for your family member.
          </p>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Our founder and principal veterinarian, <span className="font-semibold text-brand-green">Dr James Ross</span>, trained at the University of Sydney and brings over two decades of experience as a fully qualified veterinary surgeon. Having spent roughly 20 years practicing locally in Mosman, Dr James has earned an outstanding reputation for his calm, friendly, and deeply caring approach.
          </p>

          {/* New Patient Intake Details */}
          <div className="bg-bg-warm rounded-3xl p-6 border border-brand-green/10 space-y-4">
            <h3 className="font-display font-bold text-lg text-brand-green flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-orange shrink-0" />
              Stress-Free Patient Onboarding
            </h3>
            
            <p className="text-xs text-gray-500 leading-relaxed">
              We design every single detail of our practice to eliminate pet anxiety. From easy parking at the doorstep to separate consulting suites, we ensure your pets feel safe:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 text-xs font-sans text-gray-600">
              <div className="flex items-start gap-2.5">
                <CheckSquare className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-brand-green">Dogs Are Weighed Safely</span>
                  <p className="opacity-80 mt-0.5">Weighed directly on our spacious reception scales to keep check-ups quick.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckSquare className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-brand-green">Cats Settle with Feliway</span>
                  <p className="opacity-80 mt-0.5">Taken straight into our separate cat consult room with specialized calming pheromones.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckSquare className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-brand-green">Prior Medical Records</span>
                  <p className="opacity-80 mt-0.5">Simply bring prior vaccinations or history and we will build a complete digital file.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckSquare className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-brand-green">Digital Radiology Suite</span>
                  <p className="opacity-80 mt-0.5">Higher quality imaging, significantly reduced procedure times, and instant referrals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
