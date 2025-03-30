import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Assuming you're using React Router
import axios from "axios";
import EventForm from "../event/EventForm.jsx";

function EditEventPage() {
  const { eventId } = useParams(); // Get event ID from URL params
  const [event, setEvent] = useState( {
    id: 1,
    name: "Tech Conference 2024",
    date: "2024-06-15",
    category: "Technology",
    entryFee: 590,
    image: "https://via.placeholder.com/300"
});

//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const response = await axios.get(`/api/events/${eventId}`);
//         setEvent(response.data);
//       } catch (error) {
//         console.error("Error fetching event:", error);
//       }
//     };

//     fetchEvent();
//   }, [eventId]);

  const editEvent = async (formData) => {
    try {
      const response = await axios.put(`/api/events/${eventId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Event Updated:", response.data);
      // You can redirect or show a success message here
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  if (!event) return <p>Loading...</p>;

  return <EventForm event={event} onSubmit={editEvent} />;
}

export default EditEventPage;
