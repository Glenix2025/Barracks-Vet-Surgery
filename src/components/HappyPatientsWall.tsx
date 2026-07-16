import { useState, useRef, MouseEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  Smile, 
  Instagram, 
  Grid, 
  LayoutList, 
  Sparkles,
  CheckCircle2,
  MoreHorizontal
} from 'lucide-react';

// Exact image paths from the generated assets and existing files
const clinicExterior = new URL('../assets/images/clinic_exterior_1784185640077.jpg', import.meta.url).href;
const charliePhoto = new URL('../assets/images/bella_maltese_dog_1784190259707.jpg', import.meta.url).href;
const peterPhoto = new URL('../assets/images/peter_dwarf_lop_1784192821696.jpg', import.meta.url).href;
const jackJillPhoto = new URL('../assets/images/jack_jill_cats_1784192837717.jpg', import.meta.url).href;
const fluffyPhoto = new URL('../assets/images/fluffy_poodle_1784192849603.jpg', import.meta.url).href;
const snoozyPhoto = new URL('../assets/images/snoozy_siberian_cat_1784192859823.jpg', import.meta.url).href;
const louiePhoto = new URL('../assets/images/louie_pekingese_1784192870969.jpg', import.meta.url).href;
const cavalierPhoto = new URL('../assets/images/cavalier_puppies_1784192881050.jpg', import.meta.url).href;
const bullmastiffPhoto = new URL('../assets/images/big_betty_bullmastiff_1784192892881.jpg', import.meta.url).href;

interface InstagramPost {
  id: string;
  name: string;
  breed: string;
  species: 'dog' | 'cat' | 'other';
  imageSrc: string;
  caption: string;
  likes: number;
  hasLiked: boolean;
  relativeTime: string;
  date: string;
  comments: {
    username: string;
    text: string;
    verified?: boolean;
  }[];
}

const INITIAL_POSTS: InstagramPost[] = [
  {
    id: 'charlie',
    name: 'Charlie',
    breed: 'Maltese',
    species: 'dog',
    imageSrc: charliePhoto,
    caption: 'Little Charlie helping us out at reception today before his dental 🐶 #dental #dogsofinstagram #maltese #cutie',
    likes: 48,
    hasLiked: false,
    relativeTime: '363w',
    date: 'AUGUST 30, 2019',
    comments: [
      { username: 'mosmandaily', text: 'So cute', verified: true }
    ]
  },
  {
    id: 'peter',
    name: 'Peter',
    breed: 'Dwarf Lop Bunny',
    species: 'other',
    imageSrc: peterPhoto,
    caption: 'Adorable little Peter the Dwarf Lop bunny in for his desex surgery today. So tiny! 😍😍 #peterrabbit #bunniesofinstagram #surgery #dwarflop',
    likes: 34,
    hasLiked: false,
    relativeTime: '375w',
    date: 'JUNE 6, 2019',
    comments: [
      { username: 'mrslancken', text: '❤️❤️ bunnies' }
    ]
  },
  {
    id: 'jack_jill',
    name: 'Jack & Jill',
    breed: 'Domestic Tabby Siblings',
    species: 'cat',
    imageSrc: jackJillPhoto,
    caption: 'Jack & Jill are hoping to find a new home. 10 year old bonded siblings that are incredibly affectionate and love nothing more than cuddles and food! Please call 9969 1100 if you are interested. 😻😻',
    likes: 52,
    hasLiked: false,
    relativeTime: '388w',
    date: 'MARCH 8, 2019',
    comments: [
      { username: 'ko626880', text: 'They are just gorgeous' },
      { username: 'luce.wat', text: '🥺' }
    ]
  },
  {
    id: 'fluffy',
    name: 'Fluffy',
    breed: 'Poodle Mix',
    species: 'dog',
    imageSrc: fluffyPhoto,
    caption: 'Fluffy! Such a happy girl! #bichonfrise #poodlemix #dental #sweetiepie #happy #vet #teeth #pearlywhites #veryfluffy #treatment #clean',
    likes: 41,
    hasLiked: false,
    relativeTime: '398w',
    date: 'JANUARY 11, 2019',
    comments: [
      { username: 'shopglowsupplyco', text: "hey send us a DM, let's collaborate 🔥" },
      { username: 'shopglowsupplyco', text: "hey send us a message, let's collab! 🔥" },
      { username: 'explorewithpup', text: 'Love this post! Please message me so we can talk about sharing it on our page!' }
    ]
  },
  {
    id: 'snoozy',
    name: 'Snoozy',
    breed: 'Siberian Forest Cat',
    species: 'cat',
    imageSrc: snoozyPhoto,
    caption: 'Hmmmm.... anaesthetics 😴💤 #barracksvet #sleepy #yum #siberianforestcat #siberiancat #dental #lionclip #matted #cat #snooze #anaesthesia #anaesthetic',
    likes: 59,
    hasLiked: false,
    relativeTime: '403w',
    date: 'DECEMBER 7, 2018',
    comments: [
      { username: 'chels.randall', text: 'The caption 😂😂' }
    ]
  },
  {
    id: 'louie',
    name: 'Louie',
    breed: 'Pekingese',
    species: 'dog',
    imageSrc: louiePhoto,
    caption: "Louie just simply can't help looking cute! Just got to get that breath just as cute! 😂 #barracksvet #teddybear #pekingese #dental #stinkybreath #notforlong #stay healthy #dentaldisease #gnashers #sparklyteeth",
    likes: 63,
    hasLiked: false,
    relativeTime: '409w',
    date: 'OCTOBER 26, 2018',
    comments: [
      { username: 'lov_the_mud', text: 'So cute' }
    ]
  },
  {
    id: 'gabrielle_louis',
    name: 'Gabrielle & Louis',
    breed: 'Cavalier Puppies',
    species: 'dog',
    imageSrc: cavalierPhoto,
    caption: 'Then this happened!! 💙🐶🐶💖 8 wk old siblings, Gabrielle & Louis popped in to meet us. #barracksvet #cavalierkingcharlesspaniel #cavalierpuppy #puppies #puppy #brother #sister #siblings',
    likes: 71,
    hasLiked: false,
    relativeTime: '413w',
    date: 'SEPTEMBER 28, 2018',
    comments: [
      { username: 'anncbrockbank', text: 'Oh my goodness, they are simply perfect! 😍' }
    ]
  },
  {
    id: 'big_betty',
    name: 'Big Betty',
    breed: 'Bullmastiff',
    species: 'dog',
    imageSrc: bullmastiffPhoto,
    caption: 'Big Betty found herself a 🛋️ #barracksvet #bullmastiff #loveslaps #thinksshesalapdog',
    likes: 84,
    hasLiked: false,
    relativeTime: '439w',
    date: 'MARCH 30, 2018',
    comments: [
      { username: 'bettybullmastiff', text: 'Oh Betty!' }
    ]
  }
];

export default function HappyPatientsWall() {
  const [posts, setPosts] = useState<InstagramPost[]>(INITIAL_POSTS);
  const [viewMode, setViewMode] = useState<'feed' | 'grid'>('feed');
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [activeCommentTexts, setActiveCommentTexts] = useState<{ [postId: string]: string }>({});
  const [doubleTapActive, setDoubleTapActive] = useState<{ [postId: string]: boolean }>({});
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleLike = (id: string, e?: MouseEvent) => {
    if (e) e.stopPropagation();
    setPosts(prev => prev.map(post => {
      if (post.id === id) {
        return {
          ...post,
          hasLiked: !post.hasLiked,
          likes: post.hasLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleDoubleTap = (id: string) => {
    setDoubleTapActive(prev => ({ ...prev, [id]: true }));
    setPosts(prev => prev.map(post => {
      if (post.id === id && !post.hasLiked) {
        return {
          ...post,
          hasLiked: true,
          likes: post.likes + 1
        };
      }
      return post;
    }));
    setTimeout(() => {
      setDoubleTapActive(prev => ({ ...prev, [id]: false }));
    }, 1000);
  };

  const handleCommentSubmit = (postId: string, e: FormEvent) => {
    e.preventDefault();
    const text = activeCommentTexts[postId]?.trim();
    if (!text) return;

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, { username: 'you', text }]
        };
      }
      return post;
    }));

    setActiveCommentTexts(prev => ({ ...prev, [postId]: '' }));

    // If modal is open, sync the selected post state as well
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(prev => prev ? {
        ...prev,
        comments: [...prev.comments, { username: 'you', text }]
      } : null);
    }
  };

  // Helper to parse hashtags and color them blue
  const renderCaption = (text: string) => {
    const words = text.split(' ');
    return words.map((word, index) => {
      if (word.startsWith('#')) {
        return <span key={index} className="text-[#00376b] font-medium hover:underline cursor-pointer">{word} </span>;
      }
      return word + ' ';
    });
  };

  return (
    <section id="happy-patients" className="py-16 bg-white relative overflow-hidden">
      {/* Visual background decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-bg-warm rounded-full -mr-48 -mt-24 -z-10 opacity-50" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green/5 rounded-full -ml-48 -mb-24 -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-gray-100 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#4A5D4E]/10 text-brand-green px-3 py-1 rounded-full text-xs font-bold uppercase mb-3">
              <Instagram className="w-3.5 h-3.5 text-brand-orange" />
              Community Spotlight
            </div>
            <h2 className="text-4xl font-display font-bold text-gray-900 tracking-tight">
              Happy Patients <span className="text-brand-green italic font-serif">Instagram Wall</span>
            </h2>
            <p className="text-gray-500 mt-2 max-w-xl text-sm leading-relaxed">
              Straight from our official <a href="https://glenix2025.github.io/Barracks-Vet-Surgery/" target="_blank" rel="noreferrer" className="text-brand-green underline font-medium hover:text-brand-orange">@barracksvet</a> feed! Follow us for cute daily checkups, dental updates, and clinic high-fives.
            </p>
          </div>

          {/* Controls: View Switcher and Navigation Arrows */}
          <div className="flex items-center gap-4">
            <div className="flex bg-gray-100 p-1 rounded-xl shadow-inner border border-gray-200">
              <button
                onClick={() => setViewMode('feed')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${viewMode === 'feed' ? 'bg-white text-brand-green shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
              >
                <LayoutList className="w-3.5 h-3.5" />
                Stories Feed
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${viewMode === 'grid' ? 'bg-white text-brand-green shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
              >
                <Grid className="w-3.5 h-3.5" />
                Profile Grid
              </button>
            </div>

            {viewMode === 'feed' && (
              <div className="flex gap-1.5">
                <button
                  onClick={() => scroll('left')}
                  className="p-2.5 rounded-full border border-gray-200 hover:border-brand-green hover:bg-bg-warm text-gray-600 hover:text-brand-green transition-colors cursor-pointer shadow-sm"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="p-2.5 rounded-full border border-gray-200 hover:border-brand-green hover:bg-bg-warm text-gray-600 hover:text-brand-green transition-colors cursor-pointer shadow-sm"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* --- VIEW MODE 1: HORIZONTAL INSTAGRAM FEED CAROUSEL --- */}
        {viewMode === 'feed' && (
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide no-scrollbar snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none' }}
            >
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="min-w-[340px] md:min-w-[360px] max-w-[360px] bg-white rounded-2xl border border-gray-200 shadow-sm snap-start flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  {/* IG Post Header */}
                  <div className="flex items-center justify-between p-3 border-b border-gray-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-brand-green/20 bg-gray-100 shrink-0">
                        <img
                          src={clinicExterior}
                          alt="barracksvet profile"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-xs text-gray-900 leading-tight">barracksvet</span>
                          <span className="text-[10px] text-gray-400">•</span>
                          <span className="text-[10px] text-gray-400 font-semibold">{post.relativeTime}</span>
                        </div>
                        <span className="text-[10px] text-gray-500 leading-tight">The Barracks Vet Surgery</span>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-700">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  {/* IG Post Image + Double tap to like mechanism */}
                  <div 
                    className="h-[350px] relative overflow-hidden bg-gray-50 select-none cursor-pointer"
                    onDoubleClick={() => handleDoubleTap(post.id)}
                  >
                    <img
                      src={post.imageSrc}
                      alt={post.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />

                    {/* Double-tap animated heart overlay */}
                    <AnimatePresence>
                      {doubleTapActive[post.id] && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1.2, opacity: 0.9 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                          <Heart className="w-20 h-20 text-white fill-white drop-shadow-lg" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* IG Post Action Bar */}
                  <div className="p-3 pb-2 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={(e) => handleLike(post.id, e)}
                        className="text-gray-700 hover:text-red-500 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                      >
                        <Heart
                          className={`w-5 h-5 ${post.hasLiked ? 'text-red-500 fill-red-500' : ''}`}
                        />
                      </button>
                      <button className="text-gray-700 hover:text-gray-900 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                      </button>
                      <button className="text-gray-700 hover:text-gray-900 transition-colors">
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                    <button className="text-gray-700 hover:text-gray-900 transition-colors">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>

                  {/* IG Likes Count */}
                  <div className="px-3 pb-1">
                    <p className="text-xs font-bold text-gray-900">
                      {post.likes} likes
                    </p>
                  </div>

                  {/* IG Caption */}
                  <div className="px-3 pb-2 flex-1 overflow-y-auto no-scrollbar text-xs">
                    <p className="leading-relaxed">
                      <span className="font-bold text-gray-900 mr-1.5">barracksvet</span>
                      {renderCaption(post.caption)}
                    </p>

                    {/* Render existing comments */}
                    <div className="mt-2 space-y-1 bg-gray-50/50 p-2 rounded-lg border border-gray-50">
                      {post.comments.map((comm, idx) => (
                        <div key={idx} className="flex items-start gap-1 leading-normal">
                          <span className="font-bold text-gray-900 shrink-0 flex items-center gap-1">
                            {comm.username}
                            {comm.verified && (
                              <span className="inline-block w-3 h-3 bg-blue-500 text-white rounded-full p-0.5 flex items-center justify-center shrink-0">
                                <span className="text-[6px] font-bold">✓</span>
                              </span>
                            )}
                          </span>
                          <span className="text-gray-700">{comm.text}</span>
                        </div>
                      ))}
                    </div>

                    <p className="text-[9px] text-gray-400 font-semibold tracking-wider mt-2.5 uppercase">
                      {post.date}
                    </p>
                  </div>

                  {/* Live Comment Form */}
                  <form
                    onSubmit={(e) => handleCommentSubmit(post.id, e)}
                    className="border-t border-gray-100 px-3 py-2.5 flex items-center justify-between gap-2 shrink-0 bg-gray-50/30"
                  >
                    <Smile className="w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={activeCommentTexts[post.id] || ''}
                      onChange={(e) => setActiveCommentTexts(prev => ({ ...prev, [post.id]: e.target.value }))}
                      className="text-xs flex-1 border-none focus:outline-none bg-transparent placeholder-gray-400 text-gray-800"
                    />
                    <button
                      type="submit"
                      disabled={!activeCommentTexts[post.id]?.trim()}
                      className={`text-xs font-bold select-none cursor-pointer ${activeCommentTexts[post.id]?.trim() ? 'text-[#0095f6]' : 'text-[#0095f6]/40'}`}
                    >
                      Post
                    </button>
                  </form>
                </div>
              ))}
            </div>
            
            {/* Scroll helper */}
            <p className="text-center text-xs text-gray-400 mt-2 italic flex items-center justify-center gap-1 select-none">
              <span>← Swipe left or right, or double-click to ❤️ a patient →</span>
            </p>
          </div>
        )}

        {/* --- VIEW MODE 2: PROFILE GRID VIEW --- */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group aspect-square relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200 cursor-pointer shadow-sm hover:shadow transition-all duration-300"
              >
                <img
                  src={post.imageSrc}
                  alt={post.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover stats overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white text-sm font-bold">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-5 h-5 fill-current" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>{post.comments.length}</span>
                  </div>
                </div>

                {/* Quick species badge */}
                <span className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded-full text-[9px] font-bold text-brand-green shadow-sm flex items-center gap-1 uppercase">
                  {post.species === 'dog' && '🐶'}
                  {post.species === 'cat' && '🐱'}
                  {post.species === 'other' && '🐰'}
                  <span>{post.name}</span>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- LIGHTBOX MODAL FOR GRID SELECTION --- */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl overflow-hidden w-full max-w-4xl shadow-2xl flex flex-col md:flex-row h-auto md:h-[550px]"
            >
              {/* Photo Area */}
              <div 
                className="w-full md:w-3/5 bg-black relative flex items-center justify-center"
                onDoubleClick={() => handleDoubleTap(selectedPost.id)}
              >
                <img
                  src={selectedPost.imageSrc}
                  alt={selectedPost.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full max-h-[350px] md:max-h-full object-contain"
                />

                {/* Double-tap animated heart overlay */}
                <AnimatePresence>
                  {doubleTapActive[selectedPost.id] && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 0.9 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <Heart className="w-20 h-20 text-white fill-white drop-shadow-lg" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sidebar Info & Comments */}
              <div className="w-full md:w-2/5 flex flex-col bg-white h-full justify-between">
                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-brand-green/20">
                        <img
                          src={clinicExterior}
                          alt="barracksvet profile"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-xs text-gray-900 leading-tight">barracksvet</span>
                        <span className="text-[10px] text-gray-500 leading-tight">The Barracks Vet Surgery</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="text-gray-400 hover:text-gray-700 text-lg font-bold p-1 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Body Content (Caption + Comments list) */}
                  <div className="p-4 overflow-y-auto no-scrollbar md:max-h-[340px] text-xs space-y-4">
                    {/* Caption */}
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden border border-brand-green/20 shrink-0">
                        <img src={clinicExterior} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="" />
                      </div>
                      <div>
                        <p className="leading-relaxed">
                          <span className="font-bold text-gray-900 mr-1.5">barracksvet</span>
                          {renderCaption(selectedPost.caption)}
                        </p>
                        <span className="text-[10px] text-gray-400 font-semibold block mt-1">{selectedPost.relativeTime}</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-50 pt-3" />

                    {/* Comments List */}
                    <div className="space-y-3">
                      {selectedPost.comments.map((comm, idx) => (
                        <div key={idx} className="flex items-start gap-2 leading-normal">
                          <div className="w-6 h-6 bg-[#4A5D4E]/10 rounded-full flex items-center justify-center shrink-0 font-bold text-[10px] text-brand-green uppercase">
                            {comm.username.slice(0, 2)}
                          </div>
                          <div>
                            <p>
                              <span className="font-bold text-gray-900 mr-1.5 flex inline-items items-center gap-1">
                                {comm.username}
                                {comm.verified && (
                                  <span className="inline-block w-3 h-3 bg-blue-500 text-white rounded-full p-0.5 flex items-center justify-center shrink-0">
                                    <span className="text-[6px] font-bold">✓</span>
                                  </span>
                                )}
                              </span>
                              <span className="text-gray-700">{comm.text}</span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Likes and Comment box */}
                <div className="border-t border-gray-100 bg-gray-50/30">
                  {/* Action icons & Like count */}
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleLike(selectedPost.id)}
                          className="text-gray-700 hover:text-red-500 cursor-pointer transition-all"
                        >
                          <Heart className={`w-5 h-5 ${selectedPost.hasLiked ? 'text-red-500 fill-red-500' : ''}`} />
                        </button>
                        <button className="text-gray-700 hover:text-gray-900">
                          <MessageCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs font-bold text-gray-900">{selectedPost.likes} likes</p>
                    <p className="text-[9px] text-gray-400 tracking-wider uppercase mt-1">{selectedPost.date}</p>
                  </div>

                  {/* Comment Input */}
                  <form
                    onSubmit={(e) => handleCommentSubmit(selectedPost.id, e)}
                    className="border-t border-gray-100 p-3 flex items-center gap-2"
                  >
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={activeCommentTexts[selectedPost.id] || ''}
                      onChange={(e) => setActiveCommentTexts(prev => ({ ...prev, [selectedPost.id]: e.target.value }))}
                      className="text-xs flex-1 border-none focus:outline-none bg-transparent placeholder-gray-400 text-gray-800"
                    />
                    <button
                      type="submit"
                      disabled={!activeCommentTexts[selectedPost.id]?.trim()}
                      className={`text-xs font-bold cursor-pointer ${activeCommentTexts[selectedPost.id]?.trim() ? 'text-[#0095f6]' : 'text-[#0095f6]/40'}`}
                    >
                      Post
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
