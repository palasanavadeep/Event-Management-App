import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroCarousel = ({ events, viewEvent }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };

  // Auto advance the carousel every 5 seconds
  React.useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!events.length) return null;

  const currentEvent = events[currentIndex];

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-xl">
      {/* Background Image with Overlay */}
      <motion.div 
        className="absolute inset-0 bg-black/20"
        key={currentEvent.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src={currentEvent.image} 
          alt={currentEvent.name} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
      </motion.div>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
        <motion.div
          key={currentEvent.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 bg-primary/80 rounded-full text-sm font-medium mb-4">
            {currentEvent.category}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-2">{currentEvent.name}</h2>
          <p className="text-lg opacity-90 mb-6">{currentEvent.date}</p>
          <button 
            onClick={() => viewEvent(currentEvent.id)} 
            className="px-6 py-3 bg-white text-primary font-medium rounded-lg hover:bg-opacity-90 transition-colors"
          >
            View Event
          </button>
        </motion.div>
      </div>
      
      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-4 flex items-center">
        <button 
          onClick={goToPrev}
          className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-4 flex items-center">
        <button 
          onClick={goToNext}
          className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      
      {/* Indicator Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {events.slice(0, 5).map((_, index) => (
          <button 
            key={index} 
            className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white/40'}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
