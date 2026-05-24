import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Clock, ThumbsUp, MessageSquare, X } from 'lucide-react';
import { BlogPost } from '../types';

export default function Blog() {
  const [selectedPost, setSelectedPost] = React.useState<BlogPost | null>(null);
  const [likes, setLikes] = React.useState<Record<string, number>>({
    "post-1": 420,
    "post-2": 215,
    "post-3": 185
  });

  const blogPosts: BlogPost[] = [
    {
      id: "post-1",
      title: "The Ultimate Guide to Chasing Bromo's Magical Sunrise",
      excerpt: "Gazing at the stellar sea of fog from Mount Penanjakan is an ancient ritual for travelers. Here is our breakdown of where exactly to stand, when to leave your lodge, and how to avoid the heavy morning crowds.",
      date: "May 18, 2026",
      readTime: "6 min read",
      category: "Sunrise Scouting",
      image: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&fit=crop&q=80",
      author: {
        name: "Yasmine Satriyo",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&fit=crop&q=80"
      }
    },
    {
      id: "post-2",
      title: "Preparation Breakdown: Surviving Bromo's Sandsea Jeep Runs",
      excerpt: "Riding a retro 4x4 Toyota Land Cruiser across the Whispering Sands is highly thrilling, but can get bumpy and extremely dusty. Read our essential equipment recommendations including protective face masks and goggles.",
      date: "May 02, 2026",
      readTime: "4 min read",
      category: "Off-Road Guide",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&fit=crop&q=80",
      author: {
        name: "Aditya Pratama",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&fit=crop&q=80"
      }
    },
    {
      id: "post-3",
      title: "Understanding Yadnya Kasada: Bromo's Ancient Sacred Festival",
      excerpt: "Every year, the native Tenggerese people scale Bromo’s active crater base to cast fruits, crops, and live livestock into volcanic vents as a sign of thankfulness. Here is a guide to exploring this ritual respectfully.",
      date: "April 24, 2026",
      readTime: "8 min read",
      category: "Cultural Heritage",
      image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&fit=crop&q=80",
      author: {
        name: "Kadek Gede",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&fit=crop&q=80"
      }
    }
  ];

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes(prev => ({
      ...prev,
      [id]: prev[id] + 1
    }));
  };

  return (
    <section className="relative bg-stone-50 py-24 px-6 md:px-12 select-none border-b border-stone-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16" id="blog-header">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-stone-500">Wanderlush Chronicles</span>
            <h2 className="font-sans font-bold text-3xl md:text-5xl text-stone-900 tracking-tight leading-normal mt-2">
              Travel Blog <br />
              Around Bromo
            </h2>
          </div>
          <p className="font-sans text-stone-500 text-sm max-w-sm">
            Read high-quality articles authored directly by our local scouts sharing photography hot spots, cultural behaviors, packing guides, and safety warnings.
          </p>
        </div>

        {/* Blogs Display Cards Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="blog-posts-grid">
          {blogPosts.map((post) => (
            <motion.div
              layout
              key={post.id}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-200/50 hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer group"
              id={`blog-card-${post.id}`}
            >
              {/* Card Image Thumbnail */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-200">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-750"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 text-[9px] uppercase tracking-widest font-bold bg-white/90 backdrop-blur-md text-stone-900 px-3 py-1 rounded-full border border-stone-200/40">
                  {post.category}
                </span>
              </div>

              {/* Card details */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Meta details */}
                <div className="flex items-center space-x-3 text-[10px] font-mono text-stone-400 mb-3">
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>

                <h3 className="font-sans font-bold text-base md:text-lg text-stone-900 line-clamp-2 tracking-tight mb-2 group-hover:text-amber-600 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-stone-500 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-6">
                  {post.excerpt}
                </p>

                {/* Card Footer author / metrics */}
                <div className="flex items-center justify-between border-t border-stone-100 pt-5 mt-auto">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name} 
                      className="w-8 h-8 rounded-full object-cover border border-stone-200"
                      referrerPolicy="no-referrer"
                    />
                    <span className="font-sans font-semibold text-xs text-stone-800">{post.author.name}</span>
                  </div>

                  <div className="flex items-center space-x-3 text-[11px] font-mono font-bold text-stone-500">
                    <button 
                      onClick={(e) => handleLike(post.id, e)}
                      className="p-1 px-2.5 rounded-lg bg-stone-50 border border-stone-200 hover:bg-stone-100 text-stone-700 transition flex items-center space-x-1.5 cursor-pointer"
                    >
                      <ThumbsUp className="h-3 w-3 text-stone-500" />
                      <span>{likes[post.id]}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Full Article Reader Modal Backdrop */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md"
            id="blog-modal-backdrop"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="bg-white max-w-2xl w-full rounded-3xl overflow-hidden border border-stone-200 shadow-2xl max-h-[85vh] flex flex-col"
              id="blog-modal-container"
            >
              {/* Image banner */}
              <div className="relative aspect-[16/9] w-full overflow-hidden shrink-0">
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 p-2 bg-stone-950/80 hover:bg-stone-950 text-white rounded-full transition cursor-pointer z-50"
                  id="btn-close-blog-modal"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 rounded-full font-mono text-[9px] uppercase tracking-widest font-bold text-stone-900 border border-stone-200">
                  {selectedPost.category}
                </div>
              </div>

              {/* Scrollable content */}
              <div className="p-8 overflow-y-auto flex-grow font-sans text-stone-800">
                <div className="flex items-center space-x-3 text-[10px] font-mono text-stone-400 mb-2">
                  <span>{selectedPost.date}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>

                <h3 className="font-sans font-bold text-xl md:text-2xl text-stone-900 tracking-tight mb-4">
                  {selectedPost.title}
                </h3>

                <div className="flex items-center space-x-3 mb-6 bg-stone-50 p-3 rounded-2xl border border-stone-200/50">
                  <img 
                    src={selectedPost.author.avatar} 
                    alt={selectedPost.author.name} 
                    className="w-8 h-8 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="font-semibold text-xs text-stone-800">{selectedPost.author.name}</p>
                    <p className="text-[10px] text-stone-400 font-mono">AUTHORIZED BROMO TOUR GUIDE</p>
                  </div>
                </div>

                {/* Mock long form body */}
                <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans border-t border-stone-100 pt-6">
                  <p>
                    Mount Bromo is one of the most active volcanoes in Indonesia, sitting at 2,329 meters in East Java. It is famous for its surreal landscape, which includes a vast, barren plain called the Sea of Sand (Pasir Berbisik). Visiting this location requires careful timing to experience the ideal sights.
                  </p>
                  <p className="font-semibold text-stone-950 text-xs sm:text-sm uppercase tracking-wider font-sans mt-4">
                    Why Sunrise is the Golden hour:
                  </p>
                  <p>
                    Starting at 3:00 AM, our retro 4x4 jeeps embark from local lodges to Penanjakan Peak. When the sun pierces the horizon, it shines directly down upon the thick, white fog blankets trapped inside the caldera floor. This causes a majestic "island in a sea of fog" landscape reflecting spectacular shades of magenta, gold, and sapphire.
                  </p>
                  <p className="font-semibold text-stone-950 text-xs sm:text-sm uppercase tracking-wider font-sans mt-4">
                    A Traveler's Checklist:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li><b>Thermal Wear:</b> Early mornings before sunrise dip down to 4°C with substantial windchill. Bring heavy duty puffer coats and gloves.</li>
                    <li><b>Volcanic Dust Masks:</b> The Sea of Sand and caldera crater rim are covered in powdery volcanic ash. A PM2.5 or N95 mask is crucial.</li>
                    <li><b>Climbing Gear:</b> Decent trekking shoes with deep traction grids make climbing up the shifting sandbanks much safer.</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
