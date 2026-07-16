import { Star, Quote, ShieldCheck } from 'lucide-react';
import { Testimonial } from '../types';

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author: 'John Purcell',
    badge: 'Local Guide • 57 reviews',
    rating: 5,
    timeText: '11 months ago',
    content: 'Friendly, caring, knowledgeable staff. Highly recommended.'
  },
  {
    id: '2',
    author: 'Jeremy Collins Tennis Coaching',
    badge: 'Local Guide • 114 reviews • Cheers Jeremy',
    rating: 5,
    timeText: 'a year ago',
    content: 'Friendly staff and very professional veterinary services, highly recommended.'
  },
  {
    id: '3',
    author: 'Jacob Jonker',
    badge: 'Verified Client • 11 reviews',
    rating: 5,
    timeText: 'a year ago',
    content: 'Always helpful and good with our dog. He is always happy to go.'
  },
  {
    id: '4',
    author: 'BRETT PASCOE',
    badge: 'Local Guide • 401 reviews',
    rating: 5,
    timeText: '2 years ago',
    content: 'Great Vet.'
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl px-6 sm:px-8 -z-10">
        <div className="absolute top-10 right-10 w-48 h-48 bg-brand-orange/5 rounded-full filter blur-xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#4A5D4E]/10 text-brand-green px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            <Quote className="w-3.5 h-3.5 text-brand-orange shrink-0 fill-current" />
            What Our Community Says
          </div>
          <h2 className="text-4xl font-display font-bold text-gray-900 tracking-tight">
            Loved by <span className="text-brand-green italic font-serif">Mosman Locals</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            We are proud to serve our local community and provide stress-free veterinary services. Check out our real, verified Google Maps reviews left by our lovely clients.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-bg-warm p-6 rounded-3xl border border-brand-green/10 flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div className="space-y-4">
                {/* Stars and date */}
                <div className="flex items-center justify-between text-xs font-sans text-gray-400">
                  <div className="flex text-amber-500">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current shrink-0" />
                    ))}
                  </div>
                  <span>{review.timeText}</span>
                </div>

                {/* Quote content */}
                <p className="text-sm text-gray-700 font-sans italic leading-relaxed">
                  "{review.content}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-6 mt-6 border-t border-brand-green/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-green/10 text-brand-green font-display font-bold flex items-center justify-center shrink-0">
                  {review.author.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm text-gray-900 truncate leading-none">{review.author}</p>
                  <p className="text-[10px] text-brand-orange font-bold font-sans mt-1 truncate">{review.badge}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregate Badge summary */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-brand-green text-white px-6 py-3 rounded-full text-xs font-bold shadow-md shadow-brand-green/10">
            <span className="text-amber-400 font-bold text-sm">★★★★★</span>
            <span>4.9 Star Rating on Google based on client reviews</span>
            <span className="opacity-60">|</span>
            <span className="text-brand-orange">Mosman's Trusted Vet</span>
          </div>
        </div>
      </div>
    </section>
  );
}
