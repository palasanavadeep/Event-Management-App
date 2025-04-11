import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { useState } from "react";
import { useEffect } from "react";

const EventCard = ({ event }) => {

  const navigate = useNavigate();

  return (
    <div
      className="bg-[#F5F5F5] border border-[#A08963] rounded-xl shadow-lg p-5 w-full max-w-sm relative cursor-pointer hover:shadow-2xl transition duration-300"
      onClick={() => navigate(`/event/${event.id}`)}
      
    >
      <img
        src={event.image || "view.jpg"}
        alt={event.name}
        className="w-full h-40 object-cover rounded-lg"
      />
      <div className="mt-4">
        <h2 className="text-xl font-bold text-[#4A403A]">{event.name}</h2>
        <p className="text-sm text-[#706D54] mt-1 font-medium">📅 {event.date}</p>
        <p className="text-sm font-medium mt-1 text-[#706D54]">🏷 Category: {event.category}</p>
        <p className="mt-2 font-semibold text-[#8C735B]">💰 Registration Cost: ${event.registrationFee}</p>
        <button
          className="mt-4 w-full bg-[#A08963] text-white px-4 py-2 rounded-lg hover:bg-[#8C735B] transition font-semibold"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default EventCard;