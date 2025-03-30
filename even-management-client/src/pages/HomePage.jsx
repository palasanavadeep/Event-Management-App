import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../event/EventCard.jsx";

const HomeScreen = () => {
    const [events, setEvents] = useState([
        {
            id: 1,
            name: "Tech Conference 2024",
            date: "2024-06-15",
            category: "Technology",
            entryFee: 50,
            image: "https://via.placeholder.com/300"
        },
        {
            id: 2,
            name: "Startup Meetup",
            date: "2024-07-10",
            category: "Business",
            entryFee: 30,
            image: "https://via.placeholder.com/300"
        },
        {
            id: 3,
            name: "AI & ML Workshop",
            date: "2024-08-05",
            category: "Education",
            entryFee: 20,
            image: "https://via.placeholder.com/300"
        }
    ]);

    // useEffect(() => {
    //     axios.get("/api/events")
    //         .then(response => setEvents(response.data))
    //         .catch(error => console.error("Error fetching events:", error));
    // }, []);

    return (
        <div className="min-h-screen bg-[#F5F5F5] p-6">
            <header className="text-center py-10 bg-[#A08963] text-white rounded-lg shadow-md">
                <h1 className="text-4xl font-bold">Discover Amazing Events</h1>
                <p className="mt-2 text-lg">Find and register for exciting events happening near you.</p>
            </header>
            <div className="max-w-6xl mx-auto mt-8">
                <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-[#4A403A]">Upcoming Events</h2>
                    <button className="px-6 py-2 bg-[#A08963] text-white rounded-lg shadow-md hover:bg-[#8C735B] transition">Create Event</button>
                </div>
                {events.length === 0 ? (
                    <p className="text-center text-[#706D54]">No events available</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                        {events.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                )}
            </div>
            <footer className="mt-12 text-center py-6 bg-[#DBDBDB] rounded-lg shadow-md">
                <p className="text-[#4A403A]">&copy; 2024 Event Management. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default HomeScreen;