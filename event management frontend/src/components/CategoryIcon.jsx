import React from 'react';
import { cn } from "@/lib/utils";
import { 
  Calendar, 
  Mic2, 
  GraduationCap, 
  Users, 
  Music, 
  Trophy
} from 'lucide-react';

const CategoryIcon = ({ 
  category, 
  isSelected, 
  onClick,
  className 
}) => {
  const getIcon = () => {
    switch (category) {
      case 'All':
        return <Calendar className="w-6 h-6" />;
      case 'CONFERENCE':
        return <Mic2 className="w-6 h-6" />;
      case 'WORKSHOP':
        return <GraduationCap className="w-6 h-6" />;
      case 'SEMINAR':
        return <Users className="w-6 h-6" />;
      case 'CONCERT':
        return <Music className="w-6 h-6" />;
      case 'SPORTS':
        return <Trophy className="w-6 h-6" />;
      default:
        return <Calendar className="w-6 h-6" />;
    }
  };

  return (
    <div 
      className={cn(
        "category-icon flex flex-col items-center gap-2 cursor-pointer transition-all",
        className
      )}
      onClick={onClick}
    >
      <div 
        className={cn(
          "p-4 rounded-full transition-all duration-300",
          isSelected 
            ? "bg-primary text-white shadow-lg shadow-primary/30" 
            : "bg-secondary hover:bg-secondary/80"
        )}
      >
        {getIcon()}
      </div>
      <span className={cn(
        "text-sm font-medium",
        isSelected ? "text-primary font-semibold" : "text-muted-foreground"
      )}>
        {category}
      </span>
    </div>
  );
};

export default CategoryIcon;
