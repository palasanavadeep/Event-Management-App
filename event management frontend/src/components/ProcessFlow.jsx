import React from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, CheckCircle } from 'lucide-react';

const ProcessFlow = () => {
  const steps = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Discover",
      description: "Find events that match your interests"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Register",
      description: "Secure your spot at the event"
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Participate",
      description: "Enjoy and make valuable connections"
    }
  ];

  return (
    <div className="py-12 px-4">
      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute top-24 left-0 w-full h-1 bg-accent"></div>
        
        {/* Moving Dot */}
        <motion.div 
          className="absolute top-24 w-3 h-3 bg-primary rounded-full z-10"
          animate={{ 
            left: ["0%", "50%", "100%", "50%", "0%"],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />

        {/* Steps */}
        <div className="flex flex-col md:flex-row justify-between relative z-10">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center mb-8 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="p-6 bg-secondary rounded-full mb-4">
                <div className="p-3 bg-white rounded-full text-primary">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-center max-w-[200px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessFlow;
