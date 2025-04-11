import React from 'react';
import { Calendar, MapPin, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

const EventCard = ({ 
  id, 
  name, 
  date, 
  venue, 
  image, 
  registrationFee,
  category,
  onNavigate
}) => {
  // Get category color
  const getCategoryColor = (category) => {
    switch(category) {
      case 'CONFERENCE':
        return 'bg-blue-500';
      case 'WORKSHOP':
        return 'bg-purple-500';
      case 'SEMINAR':
        return 'bg-green-500';
      case 'CONCERT':
        return 'bg-pink-500';
      case 'SPORTS':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div 
      className="event-card bg-white rounded-xl shadow-md overflow-hidden"
      onClick={() => onNavigate(id)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" 
        />
        <div 
          className={cn(
            "absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium text-white",
            getCategoryColor(category)
          )}
        >
          {category}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold line-clamp-2 mb-2 text-gray-800">{name}</h3>
        
        <div className="flex items-center text-muted-foreground mb-2">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">{date}</span>
        </div>
        
        {venue && (
          <div className="flex items-center text-muted-foreground mb-3">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm line-clamp-1">{venue}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center justify-center text-primary font-medium">
            <DollarSign className="w-4 h-4 mr-1" />
            <span className='mr-1'>{registrationFee > 0 ? `${registrationFee}` : 'Free'}</span>
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(id);
            }}
            className="text-sm bg-primary/10 text-primary px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
