import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, Map, Sun, Wind, CloudSnow, HelpCircle, Eye } from 'lucide-react';

interface MapPoint {
  id: string;
  name: string;
  elevation: string;
  temp: string;
  bestTime: string;
  tip: string;
  x: number; // Percent x
  y: number; // Percent y
  color: string;
}

export default function TopographyMap() {
  const [selectedPoint, setSelectedPoint] = React.useState<MapPoint | null>(null);

  const points: MapPoint[] = [
    {
      id: "pt-1",
      name: "Mount Penanjakan 1",
      elevation: "2,770m",
      temp: "4°C - 12°C",
      bestTime: "03:30 AM (Sunrise view)",
      tip: "The absolute highest and premier viewpoint to witness the entire caldera sunrise. Dress in heavy layers as morning winds are extremely chilly.",
      x: 18,
      y: 32,
      color: "#f59e0b" // Amber
    },
    {
      id: "pt-2",
      name: "Mount Bromo Active Crater Rim",
      elevation: "2,329m",
      temp: "10°C - 18°C",
      bestTime: "08:00 AM (Sulfur safety)",
      tip: "You can climb the 250 structural concrete steps to gaze directly into peak volcanic vents. Bring mask/goggles for strong sulfur gases.",
      x: 48,
      y: 52,
      color: "#ef4444" // Red
    },
    {
      id: "pt-3",
      name: "Pura Luhur Poten Temple",
      elevation: "2,200m",
      temp: "12°C - 20°C",
      bestTime: "09:00 AM (Cultural entry)",
      tip: "A mystical Hindu temple sitting right in the center of the Sand Sea. Used by indigenous Tenggerese tribes for Yadnya Kasada offerings.",
      x: 38,
      y: 62,
      color: "#06b6d4" // Cyan
    },
    {
      id: "pt-4",
      name: "Whispering Sands (Pasir Berbisik)",
      elevation: "2,150m",
      temp: "15°C - 22°C",
      bestTime: "11:00 AM (Epic photo shoot)",
      tip: "A vast black volcanic sand desert where high winds create whispering sounds. Ideal for classic off-road jeep speed runs.",
      x: 74,
      y: 42,
      color: "#10b981" // Emerald
    },
    {
      id: "pt-5",
      name: "King Kong Hill (Viewpoint 2)",
      elevation: "2,650m",
      temp: "5°C - 14°C",
      bestTime: "04:00 AM (Alternative viewpoint)",
      tip: "An incredibly beautiful, slightly less populated alternative look-out point for sunrise, featuring dramatic rocky cliff foregrounds.",
      x: 28,
      y: 22,
      color: "#8b5cf6" // Purple
    }
  ];

  // Auto select Point 1 first
  React.useEffect(() => {
    setSelectedPoint(points[0]);
  }, []);

  return (
    <section id="about" className="relative bg-stone-900 py-24 px-6 md:px-12 select-none border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Split Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-6">
            <span className="text-[10px] font-bold tracking-widest uppercase text-amber-400">Interactive Scouting Map</span>
            <h2 className="font-sans font-bold text-3xl md:text-5xl text-white tracking-tight leading-tight mt-2">
              Enjoy Your Travel <br />
              With Live Terrain Coordinates
            </h2>
          </div>
          <div className="lg:col-span-6 lg:pl-10">
            <p className="font-sans text-stone-400 text-sm md:text-base leading-relaxed">
              Explore Mount Bromo's geographic masterpoints. Click on the glowing coordinate coordinates below to study peak elevation details, micro-climates, and local traveling recommendations.
            </p>
          </div>
        </div>

        {/* Map UI Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch" id="terrain-section-grid">
          
          {/* Column A: Interactive SVG Map Canvas */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative bg-stone-950 aspect-[16/10] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex-grow">
              
              {/* Background Topographic Contour Grid Vector Art */}
              <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                {/* Simulated elevation curves using beautiful paths */}
                <path d="M-50,150 Q100,50 300,120 T700,200 T1100,100" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3,3" />
                <path d="M-50,220 Q150,100 400,180 T900,260 T1200,160" fill="none" stroke="#ffffff" strokeWidth="1" />
                <path d="M-20,310 Q200,180 500,280 T950,340" fill="none" stroke="#ffffff" strokeWidth="1.5" />
                <path d="M100,430 Q350,280 650,380 T1100,480" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="4,4" />
                <path d="M200,510 Q450,380 750,470" fill="none" stroke="#ffffff" strokeWidth="1" />
                
                {/* Elevation grid markers */}
                <text x="5%" y="10%" fill="#44403c" className="font-mono text-[9px]">ELE: 2100m</text>
                <text x="40%" y="15%" fill="#44403c" className="font-mono text-[9px]">ELE: 2329m</text>
                <text x="80%" y="85%" fill="#44403c" className="font-mono text-[9px]">LAT: -7.9424° S</text>
                <text x="5%" y="85%" fill="#44403c" className="font-mono text-[9px]">LNG: 112.9530° E</text>
              </svg>

              {/* Bromo landscape silhouette overlay inside map to match "Enjoy Your Travel" */}
              <div className="absolute inset-0 opacity-40 mix-blend-color-dodge">
                <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-stone-900 to-transparent flex items-end">
                  {/* Subtle vector-like volcanic mountain profiles */}
                  <svg className="w-full h-24 text-stone-700" viewBox="0 0 800 100" preserveAspectRatio="none">
                    <path d="M0,100 L150,40 L300,100 L420,60 L500,100 L620,30 L800,100 Z" fill="currentColor" />
                  </svg>
                </div>
              </div>

              {/* Interactive Glowing Markers */}
              {points.map((pt) => {
                const isSelected = selectedPoint?.id === pt.id;
                return (
                  <button
                    key={pt.id}
                    onClick={() => setSelectedPoint(pt)}
                    className="absolute z-20 group focus:outline-none cursor-pointer"
                    style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                    id={`map-marker-${pt.id}`}
                  >
                    {/* Ring Pulse */}
                    <span 
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full opacity-60 animate-ping"
                      style={{ backgroundColor: pt.color }}
                    />
                    
                    {/* Inner Core Bullet */}
                    <span 
                      className={`relative block w-4 h-4 rounded-full border-2 border-white shadow-xl transition-transform duration-300 ${
                        isSelected ? 'scale-125 ring-4 ring-white/20' : 'group-hover:scale-110'
                      }`}
                      style={{ backgroundColor: pt.color }}
                    />

                    {/* Compact tag on marker */}
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 bg-stone-950/90 whitespace-nowrap text-[9px] font-bold text-white px-2 py-1 rounded-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {pt.name}
                    </span>
                  </button>
                );
              })}

              {/* Map Scale indicator on bottom margin */}
              <div className="absolute bottom-4 left-6 flex items-center space-x-3 bg-stone-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <Map className="h-3.5 w-3.5 text-stone-400" />
                <span className="font-mono text-[9px] text-stone-300 leading-normal">COMPASS SCALE: 1:24,000 m</span>
              </div>
            </div>
          </div>

          {/* Column B: Dynamic Point Context Card */}
          <div className="lg:col-span-5 flex" id="point-details-column">
            <AnimatePresence mode="wait">
              {selectedPoint ? (
                <motion.div
                  key={selectedPoint.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-stone-950 p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col justify-between w-full h-full"
                  id={`details-card-${selectedPoint.id}`}
                >
                  <div>
                    {/* Color code dot & Category Tag */}
                    <div className="flex justify-between items-center mb-6">
                      <span className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-[#f59e0b]">
                        <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: selectedPoint.color }} />
                        <span>Active Landmark Post</span>
                      </span>
                      <span className="text-[10px] uppercase font-mono text-stone-500">
                        {selectedPoint.id.toUpperCase()}
                      </span>
                    </div>

                    <h3 className="font-sans font-bold text-2xl text-white tracking-tight leading-snug mb-6">
                      {selectedPoint.name}
                    </h3>

                    {/* Coordinates parameters list */}
                    <div className="space-y-4 border-t border-b border-white/5 py-6 mb-6">
                      <div className="flex items-center justify-between text-xs font-sans">
                        <span className="text-stone-400 flex items-center space-x-2">
                          <Eye className="h-4 w-4 text-stone-500" />
                          <span>Elevation Altitude</span>
                        </span>
                        <span className="font-mono font-bold text-white text-sm">{selectedPoint.elevation}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs font-sans">
                        <span className="text-stone-400 flex items-center space-x-2">
                          <Wind className="h-4 w-4 text-stone-500" />
                          <span>Avg temperature</span>
                        </span>
                        <span className="font-mono font-bold text-sky-400 text-sm">{selectedPoint.temp}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs font-sans">
                        <span className="text-stone-400 flex items-center space-x-2">
                          <Sun className="h-4 w-4 text-stone-500" />
                          <span>Optimal time to explore</span>
                        </span>
                        <span className="font-sans font-semibold text-amber-300 text-sm">{selectedPoint.bestTime}</span>
                      </div>
                    </div>

                    {/* Traveling Guide Tips Block */}
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <h4 className="flex items-center space-x-2 text-xs font-bold text-white mb-2 uppercase tracking-wide">
                        <Info className="h-3.5 w-3.5 text-amber-400" />
                        <span>Local Traveling Tips</span>
                      </h4>
                      <p className="text-stone-300 text-xs leading-relaxed font-sans">
                        {selectedPoint.tip}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 flex items-center justify-between text-stone-500 text-[10px] font-mono border-t border-white/5">
                    <span className="flex items-center space-x-1">
                      <CloudSnow className="h-3.5 w-3.5" />
                      <span>Live Weather Monitored</span>
                    </span>
                    <span>Updated 3 mins ago</span>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-stone-950 p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center justify-center text-center w-full min-h-[350px]">
                  <HelpCircle className="h-10 w-10 text-stone-600 animate-bounce mb-3" />
                  <p className="text-stone-400 text-xs">Click a scenic terrain marker to review coordinates guide.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
