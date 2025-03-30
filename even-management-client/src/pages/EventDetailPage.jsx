import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Calendar, MapPin, DollarSign, Users, Tag, ArrowLeft } from "lucide-react";

function EventDetailPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`/api/events/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) return <p className="text-center text-gray-600 mt-5">Loading event details...</p>;
  if (!event) return <p className="text-center text-red-500 mt-5">Event not found!</p>;

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200 mt-10">
      
      {/* Back Button */}
      <div className="mb-5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-700 bg-gray-100 px-4 py-2 rounded-md shadow-md hover:bg-gray-200 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back
        </button>
      </div>

      {/* Event Image Section */}
      <div className="relative w-full h-[450px] rounded-lg overflow-hidden shadow-md">
        <img
          src={event.image || "https://via.placeholder.com/800"}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent flex flex-col justify-end p-8">
          <h1 className="text-5xl font-extrabold text-white uppercase">{event.name}</h1>
          <p className="text-lg text-gray-200 mt-2">{event.category}</p>
        </div>
      </div>

      {/* Event Description (Placed Just Below the Image) */}
      <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-[#4A403A] mb-4">Event Overview</h2>
        <p className="text-gray-700 text-lg leading-relaxed">{event.description  || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus dolor a tortor vehicula, a posuere risus scelerisque. Cras dictum rutrum arcu et eleifend. Etiam mollis velit eu egestas ornare. Etiam in risus sed arcu sagittis blandit eget pulvinar enim. Etiam vestibulum ut magna vitae laoreet. Aliquam sit amet tincidunt arcu. Suspendisse congue porta ante, ac dictum felis. Fusce vel suscipit neque. Praesent scelerisque quam non eros commodo, at mollis metus placerat. Etiam sed pretium eros."}</p>
      </div>

      {/* Event Details & Register Button (Grid Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        
        {/* Section 2.1 - Event Details (Left) */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3 bg-gray-50 p-5 rounded-lg shadow-md">
            <Calendar className="text-[#A08963] w-7 h-7" />
            <p className="text-lg font-medium text-gray-700">
              <span className="font-semibold">Date:</span> {event.date}
            </p>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 p-5 rounded-lg shadow-md">
            <MapPin className="text-[#A08963] w-7 h-7" />
            <p className="text-lg font-medium text-gray-700">
              <span className="font-semibold">Venue:</span> {event.venue}
            </p>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 p-5 rounded-lg shadow-md">
            <DollarSign className="text-[#A08963] w-7 h-7" />
            <p className="text-lg font-medium text-gray-700">
              <span className="font-semibold">Entry Fee:</span> {event.entryFee ? `$${event.entryFee}` : "Free"}
            </p>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 p-5 rounded-lg shadow-md">
            <Users className="text-[#A08963] w-7 h-7" />
            <p className="text-lg font-medium text-gray-700">
              <span className="font-semibold">Slots Available:</span> {event.slots}
            </p>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 p-5 rounded-lg shadow-md">
            <Tag className="text-[#A08963] w-7 h-7" />
            <p className="text-lg font-medium text-gray-700">
              <span className="font-semibold">Category:</span> {event.category}
            </p>
          </div>
        </div>

        {/* Section 2.2 - Register Button (Right) */}
        <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">Join the Event!</h2>
          <button className="px-6 py-3 bg-[#A08963] text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-[#8C735B] transition">
            Register Now
          </button>
        </div>
      </div>

    </div>
  );
}

export default EventDetailPage;
