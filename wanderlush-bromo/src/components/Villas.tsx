import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calendar, DollarSign, Users, Star, ArrowUpRight, Check } from 'lucide-react';
import { Property } from '../types';

interface VillasProps {
  villaImage: string;
  hotelImage: string;
  cabinImage: string;
}

export default function Villas({ villaImage, hotelImage, cabinImage }: VillasProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
  const [searchDate, setSearchDate] = React.useState<string>('');
  const [searchBudget, setSearchBudget] = React.useState<number>(500);
  const [searchGuests, setSearchGuests] = React.useState<number>(2);
  const [searchResults, setSearchResults] = React.useState<Property[]>([]);
  const [isSearched, setIsSearched] = React.useState(false);
  const [bookedProperty, setBookedProperty] = React.useState<string | null>(null);

  // Core Property Inventory
  const properties: Property[] = [
    {
      id: "prop-1",
      name: "Bromo Valley Sanctuary",
      type: "villa",
      price: 290,
      rating: 4.9,
      image: villaImage,
      location: "Tosari, Bromo",
      reviews: 142,
      beds: 3,
      baths: 3
    },
    {
      id: "prop-2",
      name: "Plataran Bromo Mountain Lodge",
      type: "resort",
      price: 385,
      rating: 4.95,
      image: hotelImage,
      location: "Ngapel, Sukapura",
      reviews: 218,
      beds: 2,
      baths: 2
    },
    {
      id: "prop-3",
      name: "Jiwa Jawa Cozy Glass Cabin",
      type: "glamping",
      price: 210,
      rating: 4.8,
      image: cabinImage,
      location: "Wonotoro, Sukapura",
      reviews: 95,
      beds: 1,
      baths: 1
    },
    {
      id: "prop-4",
      name: "Tengger Caldera Eco Lodge",
      type: "eco_lodge",
      price: 165,
      rating: 4.75,
      image: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=800&fit=crop&q=80",
      location: "Cemoro Lawang",
      reviews: 64,
      beds: 2,
      baths: 1
    },
    {
      id: "prop-5",
      name: "Cemoro Lawang Alpine Cottage",
      type: "cottage",
      price: 180,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&fit=crop&q=80",
      location: "Caldera Edge Rim",
      reviews: 81,
      beds: 2,
      baths: 2
    },
    {
      id: "prop-6",
      name: "Local Tengger Heritage Homestay",
      type: "homestay",
      price: 95,
      rating: 4.65,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&fit=crop&q=80",
      location: "Ngadisari Village",
      reviews: 47,
      beds: 1,
      baths: 1
    }
  ];

  const categories = [
    { label: 'All', value: 'All' },
    { label: 'Resort', value: 'resort' },
    { label: 'Villa', value: 'villa' },
    { label: 'Cottage', value: 'cottage' },
    { label: 'Homestay', value: 'homestay' },
    { label: 'Glamping', value: 'glamping' },
    { label: 'Eco Lodge', value: 'eco_lodge' }
  ];

  // Initialize
  React.useEffect(() => {
    setSearchResults(properties);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearched(true);
    const filtered = properties.filter(prop => {
      // Filter by category
      if (selectedCategory !== 'All' && prop.type !== selectedCategory) {
        return false;
      }
      // Filter by budget
      if (prop.price > searchBudget) {
        return false;
      }
      // Guest filter logical match (e.g. at least 1 guest capacity rules)
      if (searchGuests > prop.beds * 2) {
        return false;
      }
      return true;
    });
    setSearchResults(filtered);
  };

  const selectCategory = (categoryValue: string) => {
    setSelectedCategory(categoryValue);
    const filtered = properties.filter(prop => {
      if (categoryValue === 'All') return true;
      return prop.type === categoryValue;
    });
    setSearchResults(filtered);
  };

  const handleBook = (name: string) => {
    setBookedProperty(name);
    setTimeout(() => {
      setBookedProperty(null);
    }, 4000);
  };

  return (
    <section id="tour" className="relative bg-stone-100 py-24 px-6 md:px-12 select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Block */}
        <div className="text-center md:text-left mb-12">
          <h2 className="font-sans font-bold text-3xl md:text-5xl text-stone-900 tracking-tight leading-normal" id="villas-title">
            A Selection Of Exceptional <br className="hidden md:block" />
            Villas And Hotels
          </h2>
          <p className="font-sans text-stone-500 text-sm md:text-base mt-3 max-w-xl">
            Locate premier stays around the mountain foot customized for peak panoramic viewpoints, soothing fireplace nights, and stargazing.
          </p>
        </div>

        {/* Floating Interactive Sticky Search Form Container */}
        <form 
          onSubmit={handleSearch}
          className="bg-white p-6 rounded-3xl shadow-xl border border-stone-200/60 grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-10 max-w-5xl mx-auto"
          id="search-filter-form"
        >
          {/* Column 1: Date */}
          <div className="md:col-span-3 flex flex-col space-y-1.5 px-2 md:border-r border-stone-200" id="filter-date">
            <span className="text-[10px] font-bold tracking-widest uppercase text-stone-500 flex items-center space-x-1.5">
              <Calendar className="h-3 w-3 text-amber-500" />
              <span>Travel Date</span>
            </span>
            <input 
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              min="2026-05-24"
              className="w-full text-stone-800 text-sm font-semibold py-1 bg-transparent border-0 outline-none focus:ring-0 cursor-pointer"
            />
          </div>

          {/* Column 2: Budget */}
          <div className="md:col-span-4 flex flex-col space-y-1.5 px-2 md:border-r border-stone-200" id="filter-budget">
            <div className="flex justify-between items-center pr-4">
              <span className="text-[10px] font-bold tracking-widest uppercase text-stone-500 flex items-center space-x-1.5">
                <DollarSign className="h-3 w-3 text-amber-500" />
                <span>Max Budget / Night</span>
              </span>
              <span className="text-xs font-bold text-stone-800">${searchBudget} USD</span>
            </div>
            <div className="flex items-center space-x-3">
              <input 
                type="range"
                min="80"
                max="500"
                step="10"
                value={searchBudget}
                onChange={(e) => setSearchBudget(Number(e.target.value))}
                className="w-full h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
              />
            </div>
          </div>

          {/* Column 3: Guests */}
          <div className="md:col-span-3 flex flex-col space-y-1.5 px-2" id="filter-guests">
            <span className="text-[10px] font-bold tracking-widest uppercase text-stone-500 flex items-center space-x-1.5">
              <Users className="h-3 w-3 text-amber-500" />
              <span>Travelers Count</span>
            </span>
            <select 
              value={searchGuests}
              onChange={(e) => setSearchGuests(Number(e.target.value))}
              className="w-full text-stone-800 text-sm font-semibold py-1 bg-transparent border-0 outline-none focus:ring-0 cursor-pointer"
            >
              <option value={1}>1 Guest / Adventurer</option>
              <option value={2}>2 Guests / Couple</option>
              <option value={4}>4 Guests / Family</option>
              <option value={6}>6+ Guests / Group</option>
            </select>
          </div>

          {/* Column 4: Submit Button */}
          <div className="md:col-span-2 flex justify-center md:justify-end px-2" id="filter-submit">
            <button
              type="submit"
              className="w-full md:w-auto p-4 rounded-2xl bg-stone-950 text-white hover:bg-stone-800 transition-all duration-300 shadow-md flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Search className="h-4 w-4" />
              <span className="md:hidden font-semibold text-xs tracking-wider uppercase">Search Stays</span>
            </button>
          </div>
        </form>

        {/* Categories Bar Pills Block */}
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 mb-12" id="categories-bar">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => selectCategory(cat.value)}
              className={`px-5 py-2.5 rounded-full font-sans text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                (selectedCategory === cat.value)
                  ? 'bg-stone-950 text-white shadow-lg'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50 hover:text-stone-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Booking Notification toast */}
        <AnimatePresence>
          {bookedProperty && (
            <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-12 z-50 p-4 bg-teal-50 border border-teal-200 rounded-2xl text-teal-900 shadow-2xl flex items-center space-x-3 max-w-md animate-bounce" id="booking-notif">
              <div className="p-2 bg-teal-600 text-white rounded-full">
                <Check className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-xs sm:text-sm">Reservation Initiated!</p>
                <p className="text-[10px] text-teal-700 mt-0.5">We have locked in rates for <b>{bookedProperty}</b>. Please complete checkout with our travel agents.</p>
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* Stays Grid Displays */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" id="stays-display-grid">
          <AnimatePresence mode="popLayout">
            {searchResults.length > 0 ? (
              searchResults.map((property, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={property.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-md border border-stone-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Image container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-200">
                    <img 
                      src={property.image} 
                      alt={property.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {/* Price tag */}
                    <div className="absolute bottom-4 right-4 bg-stone-950/80 backdrop-blur-md text-white font-mono px-3 py-1.5 rounded-lg text-xs font-bold leading-normal">
                      ${property.price} / night
                    </div>
                  </div>

                  {/* Content details */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[9px] uppercase tracking-widest font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-300/30">
                        {property.type.replace('_', ' ')}
                      </span>
                      <div className="flex items-center space-x-1 text-amber-500">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <span className="font-mono text-xs font-bold text-stone-800">{property.rating}</span>
                        <span className="text-[10px] text-stone-400">({property.reviews})</span>
                      </div>
                    </div>

                    <h3 className="font-sans font-bold text-lg text-stone-900 mb-1 tracking-tight">
                      {property.name}
                    </h3>
                    <p className="text-stone-500 text-xs mb-4 flex items-center">
                      <span className="inline-block w-1.5 h-1.5 bg-stone-400 rounded-full mr-2" />
                      {property.location}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-[11px] font-sans text-stone-600 bg-stone-50 p-2.5 rounded-xl mb-4 mt-auto">
                      <div>⚙ Beds: <b>{property.beds} Double</b></div>
                      <div>🛁 Baths: <b>{property.baths} Bath</b></div>
                    </div>

                    <button
                      onClick={() => handleBook(property.name)}
                      className="w-full py-3 rounded-xl bg-stone-950 hover:bg-stone-800 text-white font-sans text-xs font-semibold tracking-wider hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <span>Secure Booking</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-stone-200 shadow-inner flex flex-col items-center justify-center p-6">
                <p className="text-stone-400 text-sm font-semibold">No luxury stays found matching your budget limits or configuration.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchBudget(500);
                    setSearchResults(properties);
                    setIsSearched(false);
                  }}
                  className="mt-4 px-5 py-2.5 rounded-full bg-stone-950 text-white hover:bg-stone-800 text-xs font-semibold transition"
                >
                  Reset Filtering Criteria
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
