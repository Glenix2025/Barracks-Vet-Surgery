import { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Heart, Star, Sparkles } from 'lucide-react';
import { PetPatient } from '../types';

const barnabyPhoto = new URL('../assets/images/barnaby_fancy_rat_1784189895986.jpg', import.meta.url).href;
const teddyPhoto = new URL('../assets/images/teddy_pomeranian_mix_1784190242531.jpg', import.meta.url).href;
const bellaPhoto = new URL('../assets/images/bella_maltese_dog_1784190259707.jpg', import.meta.url).href;

const HAPPY_PATIENTS: PetPatient[] = [
  {
    id: '1',
    name: 'Teddy',
    species: 'dog',
    breed: 'Pomeranian Mix',
    description: 'Beautiful fluffball with striking heterochromia (one blue eye, one brown eye).',
    quote: "Always gets spoiled with extra belly rubs on Dr James' reception scales!",
    imageDesc: 'Fluffy white and tan Pomeranian mix lying cozy on a soft blue towel.',
    imageColor: 'bg-blue-100',
    imageSrc: teddyPhoto
  },
  {
    id: '2',
    name: 'Barnaby',
    species: 'rodent',
    breed: 'Fancy Rat',
    description: 'Gentle, curious soul who loves hiding in warm pockets.',
    quote: 'Wrapped snugly in his favorite blue fleece wrap for a quick dental checkup.',
    imageDesc: 'Cute dark brown rat with bright black eyes poking out from a soft blue towel wrap.',
    imageColor: 'bg-emerald-100',
    imageSrc: barnabyPhoto
  },
  {
    id: '3',
    name: 'Bella',
    species: 'dog',
    breed: 'Maltese',
    description: 'Dr James\' assistant-in-training, always checking the computer schedule.',
    quote: "Paws up on the desk, helping type out vaccine reminder cards with her tongue out!",
    imageDesc: 'Happy Maltese dog leaning up at the clinic computer monitor, panting cheerfully.',
    imageColor: 'bg-amber-100',
    imageSrc: bellaPhoto
  },
  {
    id: '4',
    name: 'Coco',
    species: 'dog',
    breed: 'Cavoodle',
    description: 'Apricot colored sweetheart with big, soulful puppy dog eyes.',
    quote: 'Came in for her booster vaccination and left with a pocketful of healthy liver treats.',
    imageDesc: 'Fluffy, curly apricot Cavoodle puppy looking straight into the camera with adorable eyes.',
    imageColor: 'bg-orange-100',
    imageSrc: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '5',
    name: 'Winston',
    species: 'dog',
    breed: 'Miniature Schnauzer',
    description: 'Extremely handsome gentleman with an impeccably groomed beard.',
    quote: 'Perfect posture on the exam table, resting comfortably on a warm red towel.',
    imageDesc: 'Salt-and-pepper Miniature Schnauzer lying down calmly on a bright red veterinary blanket.',
    imageColor: 'bg-red-100',
    imageSrc: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '6',
    name: 'Pip',
    species: 'rodent',
    breed: 'Abyssinian Guinea Pig',
    description: 'Quiet explorer who squeaks loudly when he smells fresh hay.',
    quote: "Snugly sitting inside a cardboard travel box, ready for his claw trim checkup.",
    imageDesc: 'Fluffy black, white, and grey guinea pig nestled safely inside a snug cardboard box.',
    imageColor: 'bg-purple-100',
    imageSrc: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '7',
    name: 'Buster',
    species: 'dog',
    breed: 'West Highland Terrier',
    description: 'Spunky local who loves walking along the Georges Heights trails.',
    quote: "Stands on his hind legs and 'begs' to show off how strong his knee joints are!",
    imageDesc: 'Cute white West Highland White Terrier standing upright on hind legs, waving paws playfully.',
    imageColor: 'bg-indigo-100',
    imageSrc: 'https://images.unsplash.com/photo-1444212477490-ca407925329e?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '8',
    name: 'Oreo',
    species: 'dog',
    breed: 'Panda-Dog Mix',
    description: 'Incredible smile and super soft fur. The ultimate cuddler.',
    quote: "Refuses to leave the waiting room until he gets to say hi to the cats.",
    imageDesc: 'A happy black and white mixed-breed dog showing off a massive, joyful grin.',
    imageColor: 'bg-teal-100',
    imageSrc: 'https://images.unsplash.com/photo-1537151608828-ea2b117b6281?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '9',
    name: 'Milo & Otis',
    species: 'cat',
    breed: 'Domestic Tabby Pair',
    description: 'Inseparable brothers who share everything, including their nap spots.',
    quote: 'Settling down with Feliway pheromones in the separate cat consult room.',
    imageDesc: 'Two identical brown tabby cats curled up tightly together in a warm pink round pet bed.',
    imageColor: 'bg-rose-100',
    imageSrc: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '10',
    name: 'Sunny',
    species: 'dog',
    breed: 'Toy Poodle',
    description: 'Energetic gymnast who can jump high but prefers being carried.',
    quote: 'Always smiling and stretching her front legs for Dr James to examine her joints.',
    imageDesc: 'Cute golden-apricot toy poodle standing up and stretching happily during a wellness visit.',
    imageColor: 'bg-yellow-100',
    imageSrc: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '11',
    name: 'Luna',
    species: 'cat',
    breed: 'Longhaired Tabby',
    description: 'Expressive princess who makes the absolute best silly faces.',
    quote: "Stuck her pink tongue out in a perfect 'mlem' during her routine ear cleaning.",
    imageDesc: 'A fluffy longhaired tabby cat with its tongue sticking out in a highly comical expression.',
    imageColor: 'bg-pink-100',
    imageSrc: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '12',
    name: 'Ziggy',
    species: 'dog',
    breed: 'Border Collie',
    description: 'Super intelligent athlete. Can read the clinic brochures.',
    quote: 'Showed off his happy smile, then immediately fell asleep on his soft red blanket.',
    imageDesc: 'A beautiful border collie with deep, happy expressions resting contentedly on a towel.',
    imageColor: 'bg-stone-100',
    imageSrc: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&q=80&w=400'
  }
];

export default function HappyPatientsWall() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="happy-patients" className="py-16 bg-white relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-bg-warm rounded-full -mr-48 -mt-24 -z-10 opacity-60" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#4A5D4E]/10 text-brand-green px-3 py-1 rounded-full text-xs font-bold uppercase mb-3">
              <Sparkles className="w-3 h-3 text-brand-orange" />
              Community Spotlight
            </div>
            <h2 className="text-4xl font-display font-bold text-gray-900 tracking-tight">
              Our Happy <span className="text-brand-green italic font-serif">Patients</span> Wall
            </h2>
            <p className="text-gray-500 mt-2 max-w-xl text-sm">
              Real locals who trust Dr James Ross and the team. From energetic trail-runners to cozy cuddlers, we welcome pets of all shapes and sizes!
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-gray-200 hover:border-brand-green hover:bg-bg-warm text-gray-600 hover:text-brand-green transition-colors cursor-pointer shadow-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-gray-200 hover:border-brand-green hover:bg-bg-warm text-gray-600 hover:text-brand-green transition-colors cursor-pointer shadow-sm"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide no-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          {HAPPY_PATIENTS.map((patient) => (
            <div
              key={patient.id}
              className="min-w-[300px] md:min-w-[320px] max-w-[320px] bg-bg-warm rounded-3xl overflow-hidden border border-gray-100 shadow-sm snap-start hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              {/* Pet Image Frame with subtle hover scale */}
              <div className="h-64 relative overflow-hidden bg-gray-200 shrink-0">
                <img
                  src={patient.imageSrc}
                  alt={patient.imageDesc}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Species badge */}
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-brand-green shadow-sm flex items-center gap-1.5 uppercase">
                  {patient.species === 'dog' && '🐶 Dog'}
                  {patient.species === 'cat' && '🐱 Cat'}
                  {patient.species === 'rodent' && '🐹 Small Pet'}
                  {patient.species === 'other' && '🦜 Exotic'}
                </span>

                {/* Aesthetic bottom overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4 flex items-end justify-between text-white">
                  <div>
                    <h3 className="font-display font-bold text-lg leading-tight">{patient.name}</h3>
                    <p className="text-[11px] opacity-90 font-medium">{patient.breed}</p>
                  </div>
                  <div className="bg-brand-orange p-1.5 rounded-full text-white">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>
              </div>

              {/* Patient Bio Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <p className="text-xs text-gray-600 leading-relaxed font-sans">
                    {patient.description}
                  </p>
                  <div className="border-t border-brand-green/10 my-3" />
                  <p className="text-xs text-brand-green font-medium italic relative pl-4">
                    <span className="absolute left-0 top-0 text-brand-orange font-bold text-base leading-none">“</span>
                    {patient.quote}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                  <span>📍 Mosman local</span>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Helper drag indicator */}
        <p className="text-center text-xs text-gray-400 mt-4 italic">
          ← Drag or swipe horizontally to see all 12 happy patients →
        </p>
      </div>
    </section>
  );
}
