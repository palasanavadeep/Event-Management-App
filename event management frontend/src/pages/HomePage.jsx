import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Plus, CalendarSearch } from "lucide-react";
import CategoryIcon from "@/components/CategoryIcon";
import EventCard from "@/components/EventCard";
import HeroCarousel from "@/components/HeroCarousel";
import ProcessFlow from "@/components/ProcessFlow";
import FeaturedCategories from "@/components/FeaturedCategories";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { convertToDate } from "../utils/dateFormatter";

// Mock data for development - in a real app this would come from an API
// const mockEvents = [
//   {
//     id: "1",
//     name: "Tech Conference 2023",
//     date: "April 15, 2023",
//     location: "San Francisco, CA",
//     image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
//     entryFee: 299,
//     category: "CONFERENCE"
//   },
//   {
//     id: "2",
//     name: "Web Design Workshop",
//     date: "May 20, 2023",
//     location: "Online",
//     image: "https://images.unsplash.com/photo-1558403194-611308249627?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
//     entryFee: 99,
//     category: "WORKSHOP"
//   },
//   {
//     id: "3",
//     name: "Digital Marketing Seminar",
//     date: "June 10, 2023",
//     location: "New York, NY",
//     image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
//     entryFee: 0,
//     category: "SEMINAR"
//   },
//   {
//     id: "4",
//     name: "Summer Music Festival",
//     date: "July 15-17, 2023",
//     location: "Austin, TX",
//     image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
//     entryFee: 150,
//     category: "CONCERT"
//   },
//   {
//     id: "5",
//     name: "Annual Soccer Tournament",
//     date: "August 5-6, 2023",
//     location: "Chicago, IL",
//     image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
//     entryFee: 25,
//     category: "SPORTS"
//   },
//   {
//     id: "6",
//     name: "Business Leadership Summit",
//     date: "September 12, 2023",
//     location: "Boston, MA",
//     image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
//     entryFee: 499,
//     category: "CONFERENCE"
//   }
// ];

const HomePage = () => {
  const { auth} = useContext(AuthContext)
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const eventsSectionRef = useRef(null);
  // const [mockEvents, setMockEvents] = useState([]);
  const filteredEvents = events.filter(event => 
    (selectedCategory === "All" || event.category === selectedCategory) &&
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollToEventsSection = () => {
    eventsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavigate = (id) => {
    navigate(`/event/${id}`);
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/events`, {
         headers: { Authorization: `Bearer ${auth.token}` },
         withCredentials: true ,
         crossDomain: true,
        })
        .then(response => {
            const eventsData = response.data.map(event => ({
                ...event,
                date: convertToDate(event.date),
            }));
            setEvents(eventsData);
            // setMockEvents(eventsData);
            // console.log("Filtered events:", eventsData[0]);
            
        })
        .catch(error => console.error("Error fetching events:", error))
    console.log("Events fetched:", events);
    
}, []);

  return events.length != 0 && (
    <div className="min-h-screen bg-background">
      {/* Header/Hero Section */}
      <section className="hero-gradient text-white pt-16 pb-24 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16">
            <div>
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Discover & Join Amazing Events
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl opacity-90 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Find the perfect events for networking, learning, and entertainment in your area.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button 
                onClick={() => navigate("/create-event")} 
                className={`${auth.role === "ADMIN" ? "block" : "hidden"}
                  flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg shadow-lg hover:bg-opacity-90 transition-colors mt-6 md:mt-0`}
              >
                <Plus className="w-5 h-5" />
                <span>Create Event</span>
              </button>
            </motion.div>
          </div>

          <HeroCarousel events={events} viewEvent={handleNavigate} />
        </div>
      </section>

      {/* Process Flow Section */}
      <section className="container mx-auto max-w-7xl px-4 md:px-6 -mt-16 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <ProcessFlow />
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto max-w-7xl px-4 md:px-6">
        <FeaturedCategories 
          setCategory={setSelectedCategory} 
          scrollToEvents={scrollToEventsSection} 
        />
      </section>

      {/* Section Divider */}
      <div className="section-divider mx-auto max-w-xs"></div>

      {/* Browse Events Section */}
      <section ref={eventsSectionRef} className="container mx-auto max-w-7xl px-4 md:px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <motion.h2 
            className="text-3xl font-bold mb-6 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block mr-3"><CalendarSearch className="w-8 h-8" /></span>
            Browse Events
          </motion.h2>
          
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search events..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-10 pr-4 rounded-full border border-input bg-background shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-10 overflow-x-auto pb-4">
          <div className="flex gap-6 min-w-max">
            {["All", "CONFERENCE", "WORKSHOP", "SEMINAR", "CONCERT", "SPORTS"].map(category => (
              <CategoryIcon
                key={category}
                category={category}
                isSelected={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              />
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-medium text-muted-foreground mb-4">No events found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <EventCard 
                  {...event} 
                  onNavigate={handleNavigate} 
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
