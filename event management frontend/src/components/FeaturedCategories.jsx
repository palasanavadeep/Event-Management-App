import React from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, GraduationCap, Monitor, 
  ArrowRight
} from 'lucide-react';

const FeaturedCategories = ({ setCategory, scrollToEvents }) => {
  const featuredCategories = [
    {
      name: "Business",
      description: "Network with professionals and grow your business skills",
      icon: <Briefcase className="h-8 w-8" />,
      image: "https://images.unsplash.com/photo-1573164574001-518958d9baa2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-blue-500 to-cyan-400"
    },
    {
      name: "Education",
      description: "Expand your knowledge with workshops and seminars",
      icon: <GraduationCap className="h-8 w-8" />,
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-green-500 to-emerald-400"
    },
    {
      name: "Technology",
      description: "Stay updated with the latest tech trends and innovations",
      icon: <Monitor className="h-8 w-8" />,
      image: "https://images.unsplash.com/photo-1550305080-4e029753abcf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-purple-500 to-violet-400"
    }
  ];

  const handleCategoryClick = (category) => {
    setCategory(category);
    scrollToEvents();
  };

  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredCategories.map((category, index) => (
          <motion.div
            key={index}
            className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-70`}></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full w-min">
                  {category.icon}
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="mb-4 text-white/90">{category.description}</p>
                  
                  <button
                    onClick={() => handleCategoryClick(category.name)}
                    className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors group"
                  >
                    <span>Explore Events</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
