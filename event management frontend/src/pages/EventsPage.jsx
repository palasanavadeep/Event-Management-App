import { useEffect, useState , useContext } from "react";
import axios from "axios";
import EventCard from "../event/EventCard.jsx";
import { Calendar, MapPin, Tag, DollarSign, Filter } from "lucide-react";
import { AuthContext } from "../context/AuthContext.jsx";
import { convertToDate , convertToISO } from "../utils/dateFormatter.js";


const EventsPage = () => {

    
    const { auth } = useContext(AuthContext); // Access auth context
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredEvents, setFilteredEvents] = useState(events);
    const [filters, setFilters] = useState({
        category: "",
        registrationFee: "",
        date: "",
        location: ""
    });

    const applyFilters = () => {
        let filtered = events.filter(event =>
            (filters.category === "" || event.category.includes(filters.category)) &&
            (filters.registrationFee === "" || event.registrationFee <= parseInt(filters.registrationFee)) &&
            (filters.date === "" || convertToDate(event.date) === filters.date) &&
            (filters.location === "" || event.location.includes(filters.location))
        );
        
        setFilteredEvents(filtered);
    };

    useEffect(() => {
        setLoading(true);
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/events`, {
             headers: { Authorization: `Bearer ${auth.token}` },
             withCredentials: true ,
             contentType: "application/json",
             crossDomain: true,
            })
            .then(response => {
                const eventsData = response.data.map(event => ({
                    ...event,
                    date: convertToDate(event.date),
                }));
                setEvents(eventsData);
                setFilteredEvents(eventsData); 
                console.log("Filtered events:", eventsData[0]);
                
            })
            .catch(error => console.error("Error fetching events:", error))
            .finally(() => setLoading(false));
        console.log("Events fetched:", events);
        
    }, []);
    
    
    
    return loading ? null : (<div className="min-h-screen bg-[#F5F5F5] p-6">
        <h1 className="text-5xl font-bold text-center text-[#4A403A] mb-12">Discover Amazing Events</h1>
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-wrap gap-6 justify-center items-center mb-12 border border-[#A08963]">
            <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow-md">
                <Tag className="text-[#A08963] w-6 h-6 mr-3" />
                <select
                    className="bg-transparent focus:outline-none text-lg "
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                >
                    <option value="">Select any Category</option>
                    <option value="WORKSHOP">WORKSHOP</option>
                    <option value="SEMINAR">SEMINAR</option>
                    <option value="CONCERT">CONCERT</option>
                    <option value="SPORTS">SPORTS</option>
                </select>
            </div>
            <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow-md">
                <DollarSign className="text-[#A08963] w-6 h-6 mr-3" />
                <input
                    type="number"
                    placeholder="Max Fee"
                    className="bg-transparent focus:outline-none text-lg"
                    value={filters.registrationFee}
                    onChange={(e) => setFilters({ ...filters, registrationFee: e.target.value })}
                />
            </div>
            <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow-md">
                <Calendar className="text-[#A08963] w-6 h-6 mr-3" />
                <input
                    type="date"
                    className="bg-transparent focus:outline-none text-lg"
                    value={filters.date}
                    onChange={(e) => {
                        setFilters({ ...filters, date: e.target.value })
                        console.log("Selected date:", e.target.value);
                    }}
                />
            </div>
           
            <button
                className="p-3 bg-[#A08963] text-white font-semibold rounded-lg shadow-md hover:bg-[#8C735B] flex items-center"
                onClick={applyFilters}
            >
                <Filter className="w-5 h-5 mr-2" /> Apply Filters
            </button>
        </div>
        {filteredEvents.length === 0 ? (
            <p className="text-center text-[#706D54] text-xl font-semibold">No events available</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                {filteredEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        )}
    </div>)
};

export default EventsPage;