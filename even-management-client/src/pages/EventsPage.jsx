import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../event/EventCard.jsx";
import { Calendar, MapPin, Tag, DollarSign, Filter } from "lucide-react";

const EventsPage = () => {
    const [events, setEvents] = useState([
        {
            id: 1,
            name: "Tech Conference 2024",
            date: "2024-06-15",
            category: "Technology",
            entryFee: 50,
            location: "New York",
            image: "https://via.placeholder.com/300"
        },
        {
            id: 2,
            name: "Startup Meetup",
            date: "2024-07-10",
            category: "Business",
            entryFee: 30,
            location: "San Francisco",
            image: "https://via.placeholder.com/300"
        },
        {
            id: 3,
            name: "AI & ML Workshop",
            date: "2024-08-05",
            category: "Education",
            entryFee: 20,
            location: "Los Angeles",
            image: "https://via.placeholder.com/300"
        }
    ]);
    const [filteredEvents, setFilteredEvents] = useState(events);
    const [filters, setFilters] = useState({
        category: "",
        entryFee: "",
        date: "",
        location: ""
    });

    const applyFilters = () => {
        let filtered = events.filter(event =>
            (filters.category === "" || event.category.includes(filters.category)) &&
            (filters.entryFee === "" || event.entryFee <= parseInt(filters.entryFee)) &&
            (filters.date === "" || event.date === filters.date) &&
            (filters.location === "" || event.location.includes(filters.location))
        );
        setFilteredEvents(filtered);
    };

    // useEffect(() => {
    //     axios.get("/api/events")
    //         .then(response => setEvents(response.data))
    //         .catch(error => console.error("Error fetching events:", error));
    // }, []);

    return (
        <div className="min-h-screen bg-[#F5F5F5] p-6">
            <h1 className="text-5xl font-bold text-center text-[#4A403A] mb-12">Discover Amazing Events</h1>
            <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-wrap gap-6 justify-center items-center mb-12 border border-[#A08963]">
                <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow-md">
                    <Tag className="text-[#A08963] w-6 h-6 mr-3" />
                    <select
                        className="bg-transparent focus:outline-none text-lg "
                        value={filters.category}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    >
                        <option value="">All Categories</option>
                        <option value="Technology">Technology</option>
                        <option value="Business">Business</option>
                        <option value="Education">Education</option>
                    </select>
                </div>
                <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow-md">
                    <DollarSign className="text-[#A08963] w-6 h-6 mr-3" />
                    <input
                        type="number"
                        placeholder="Max Fee"
                        className="bg-transparent focus:outline-none text-lg"
                        value={filters.entryFee}
                        onChange={(e) => setFilters({ ...filters, entryFee: e.target.value })}
                    />
                </div>
                <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow-md">
                    <Calendar className="text-[#A08963] w-6 h-6 mr-3" />
                    <input
                        type="date"
                        className="bg-transparent focus:outline-none text-lg"
                        value={filters.date}
                        onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                    />
                </div>
                {/*<div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md">*/}
                {/*    <MapPin className="text-[#A08963] w-6 h-6 mr-3" />*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        placeholder="Location"*/}
                {/*        className="bg-transparent focus:outline-none text-lg"*/}
                {/*        value={filters.location}*/}
                {/*        onChange={(e) => setFilters({ ...filters, location: e.target.value })}*/}
                {/*    />*/}
                {/*</div>*/}
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
        </div>
    );
};

export default EventsPage;