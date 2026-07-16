import { ReactNode } from 'react';
import { Heart, Stethoscope, Scissors, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';

interface ServiceDetails {
  title: string;
  description: string;
}

interface ServiceCategory {
  title: string;
  subtitle: string;
  icon: ReactNode;
  themeColor: string; // for border/highlights
  services: ServiceDetails[];
}

const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    title: 'Wellness & Preventative',
    subtitle: 'Keeping pets thriving at every life stage',
    icon: <Stethoscope className="w-5 h-5" />,
    themeColor: 'border-emerald-100 bg-emerald-50/30 text-emerald-700',
    services: [
      {
        title: 'Wellness Exams & Check-ups',
        description: 'Thorough head-to-tail veterinary physical health reviews.'
      },
      {
        title: 'Puppy & Kitten Vaccinations',
        description: 'Full initial schedules, adult boosters, and proactive health planning.'
      },
      {
        title: 'Worming, Flea & Tick Prevention',
        description: 'Mosman-local prevention advice targeting Sydney coastal tick environments.'
      },
      {
        title: 'Dermatology & Skin Care',
        description: 'Managing ear infections, seasonal allergies, and complex hair loss issues.'
      },
      {
        title: 'Weight Management & Nutrition',
        description: 'Custom diet programs to prolong pet lifespans and support active joint wellness.'
      },
      {
        title: 'Geriatric & Senior Care',
        description: 'Compassionate care schedules for senior companions experiencing arthritis or decline.'
      }
    ]
  },
  {
    title: 'Diagnostics & Therapy',
    subtitle: 'State-of-the-art medical examinations',
    icon: <BookOpen className="w-5 h-5" />,
    themeColor: 'border-amber-100 bg-amber-50/30 text-amber-700',
    services: [
      {
        title: 'Digital Radiography (X-Ray)',
        description: 'State-of-the-art on-site imaging with fast referrals and free specialist reviews.'
      },
      {
        title: 'Accident, Injury & Illness Care',
        description: 'Prompt diagnosis, medication dispensing, and immediate support for sick pets.'
      },
      {
        title: 'Pet Behavioural Advice',
        description: 'Consultations on separation anxiety, barking, phobias, and happy training habits.'
      },
      {
        title: 'Premium Pet Accessories',
        description: 'Sourcing of clinical prescription feeds, tick collars, and veterinarian-approved aids.'
      }
    ]
  },
  {
    title: 'Surgery & Specialized Care',
    subtitle: 'Sterile surgical theater and expert treatment',
    icon: <Scissors className="w-5 h-5" />,
    themeColor: 'border-orange-100 bg-orange-50/30 text-orange-700',
    services: [
      {
        title: 'Dentistry & Dental Surgery',
        description: 'Ultrasonic scaling, polishing, surgical extractions, and home-care protocols.'
      },
      {
        title: 'De-sexing Procedures',
        description: 'Safe, stress-free routine day surgeries for cats, dogs, and small mammals.'
      },
      {
        title: 'General Soft Tissue Surgery',
        description: 'Tumor removals, lump biopsies, wound sutures, and abdominal surgeries.'
      },
      {
        title: 'Basic Orthopaedic Care',
        description: 'Diagnosis and surgical alignment for joint, ligament, or bone disorders.'
      }
    ]
  }
];

export default function ServicesGrid() {
  return (
    <section id="services" className="py-20 bg-[#F2F4F2]/30 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#4A5D4E]/10 text-brand-green px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            <Heart className="w-3.5 h-3.5 text-brand-orange shrink-0 fill-current" />
            General Practice Vet Services
          </div>
          <h2 className="text-4xl font-display font-bold text-gray-900 tracking-tight">
            Our Veterinary <span className="text-brand-green italic font-serif">Services</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            As a family-owned general practice, we offer comprehensive medical, diagnostic, and surgical services under one roof. We structure our treatments around calm, stress-free patient handling.
          </p>
        </div>

        {/* Organized Category Grids */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {SERVICE_CATEGORIES.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 border border-brand-green/10 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full space-y-6"
            >
              {/* Category Header */}
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl shrink-0 ${category.themeColor}`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-brand-green">{category.title}</h3>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">{category.subtitle}</p>
                </div>
              </div>

              {/* Services List inside Category */}
              <div className="space-y-4 flex-1">
                {category.services.map((service, sIndex) => (
                  <div
                    key={sIndex}
                    className="p-4 rounded-2xl hover:bg-bg-warm border border-transparent hover:border-brand-green/5 transition-all group"
                  >
                    <h4 className="font-bold text-sm text-gray-800 group-hover:text-brand-green transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Info banner below grid */}
        <div className="mt-12 p-6 rounded-[32px] bg-red-50 border border-red-100 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-xl shrink-0">
              <ShieldAlert className="w-6 h-6 text-red-600 animate-pulse" />
            </div>
            <div>
              <p className="font-display font-bold text-base text-red-900 uppercase tracking-wide">
                Have an urgent concern or after-hours emergency?
              </p>
              <p className="text-xs text-red-700/80 mt-0.5">
                Our team takes consultations by appointment. If your pet has a critical emergency outside opening hours, direct them immediately to SASH Emergency hospital.
              </p>
            </div>
          </div>
          <div className="flex gap-3 shrink-0 w-full md:w-auto">
            <a
              href="tel:0298890289"
              className="flex-1 md:flex-initial bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl text-xs font-bold transition-colors text-center cursor-pointer shadow-md"
            >
              Emergency Hospital SASH: (02) 9889 0289
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
