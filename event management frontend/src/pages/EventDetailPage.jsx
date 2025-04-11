import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Calendar, MapPin, DollarSign, Users, Tag } from "lucide-react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useContext } from "react";
import { convertToDate } from "../utils/dateFormatter.js";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { Snackbar, Alert } from "@mui/material"; // Import Snackbar and Alert from MUI

// function EventDetailPage() {
//   const { eventId } = useParams();
//   const navigate = useNavigate();
//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { auth } = useContext(AuthContext);

//   useEffect(() => {
//     if(eventId === undefined || eventId === null || eventId <= 0) {
//       return <p className="text-center text-red-500 mt-5">Invalid Event ID!</p>;
//     }
//     if(!auth.token || auth.token === "") {
//       return <p className="text-center text-red-500 mt-5">Unauthorized!</p>;
//     }
//     const fetchEvent = async () => {
//       try {
//         const response = await
//         axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/events/event/${eventId}`, {
//           headers: { Authorization: `Bearer ${auth.token}` },
//           withCredentials: true ,
//           crossDomain: true,
//          });
//         setEvent(response.data);
//       } catch (error) {
//         console.error("Error fetching event:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvent();
//   }, [eventId]);

//   if (loading) return <p className="text-center text-gray-600 mt-5">Loading event details...</p>;
//   if (!event) return <p className="text-center text-red-500 mt-5">Event not found!</p>;

//   return (
//     <div className="max-w-6xl mx-auto bg-stone-100 p-6 rounded-2xl shadow-xl border border-gray-200 m-1">

//       {/* Back Button */}
//       <div className="mb-5">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-gray-700 bg-gray-100 px-4 py-2 rounded-md shadow-md hover:bg-gray-200 transition"
//         >
//           <ArrowLeft className="w-5 h-5 mr-2" /> Back
//         </button>
//       </div>

//       {/* Event Image Section */}
//       <div className="relative w-full h-[450px] rounded-lg overflow-hidden shadow-2xl ">
//         <img
//           src={event.image || "https://via.placeholder.com/800"}
//           alt={event.name}
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 flex flex-col justify-end p-8">
//           <h1 className="text-5xl font-extrabold text-white captilize ">{event.name}</h1>
//           <p className="text-lg text-gray-200 mt-2 capitalize">{event.category}</p>
//         </div>
//       </div>

//       {/* Event Description (Placed Just Below the Image) */}
//       <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-md">
//         <h2 className="text-3xl font-bold text-[#4A403A] mb-4">Event Overview</h2>
//         <p className="text-gray-700 text-lg leading-relaxed">{event.description  || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus dolor a tortor vehicula, a posuere risus scelerisque. Cras dictum rutrum arcu et eleifend. Etiam mollis velit eu egestas ornare. Etiam in risus sed arcu sagittis blandit eget pulvinar enim. Etiam vestibulum ut magna vitae laoreet. Aliquam sit amet tincidunt arcu. Suspendisse congue porta ante, ac dictum felis. Fusce vel suscipit neque. Praesent scelerisque quam non eros commodo, at mollis metus placerat. Etiam sed pretium eros."}</p>
//       </div>

//       {/* Event Details & Register Button (Grid Layout) */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

//         {/* Section 2.1 - Event Details (Left) */}
//         <div className="md:col-span-2 space-y-4">
//           <div className="flex items-center gap-3 bg-gray-50 p-5 rounded-lg shadow-md">
//             <Calendar className="text-[#A08963] w-7 h-7" />
//             <p className="text-lg font-medium text-gray-700">
//               <span className="font-semibold">Date:</span> {convertToDate(event.date)}
//             </p>
//           </div>
//           <div className="flex items-center gap-3 bg-gray-50 p-5 rounded-lg shadow-md">
//             <MapPin className="text-[#A08963] w-7 h-7" />
//             <p className="text-lg font-medium text-gray-700">
//               <span className="font-semibold">Venue:</span> {event.venue}
//             </p>
//           </div>
//           <div className="flex items-center gap-3 bg-gray-50 p-5 rounded-lg shadow-md">
//             <DollarSign className="text-[#A08963] w-7 h-7" />
//             <p className="text-lg font-medium text-gray-700">
//               <span className="font-semibold">Entry Fee:</span> {event.registrationFee ? `${event.registrationFee}` : "Free"}
//             </p>
//           </div>
//           <div className="flex items-center gap-3 bg-gray-50 p-5 rounded-lg shadow-md">
//             <Users className="text-[#A08963] w-7 h-7" />
//             <p className="text-lg font-medium text-gray-700">
//               <span className="font-semibold">Slots Available:</span> {event.slots}
//             </p>
//           </div>
//           <div className="flex items-center gap-3 bg-gray-50 p-5 rounded-lg shadow-md">
//             <Tag className="text-[#A08963] w-7 h-7" />
//             <p className="text-lg font-medium text-gray-700">
//               <span className="font-semibold">Category:</span> {event.category}
//             </p>
//           </div>
//         </div>

//         {/* Section 2.2 - Register Button (Right) */}
//         <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-md">
//           <h2 className="text-2xl font-semibold text-gray-700 mb-3">Join the Event!</h2>
//           <button className="px-6 py-3 bg-[#A08963] text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-[#8C735B] transition">
//             Register Now
//           </button>
//         </div>
//       </div>

//     </div>
//   );
// }

// export default EventDetailPage;

// ...imports remain the same

function EventDetailPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { auth } = useContext(AuthContext);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info", // success or error
  });
  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    if (!eventId || eventId <= 0) return;

    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/events/event/${eventId}`,
          {
            headers: { Authorization: `Bearer ${auth.token}` },
            withCredentials: true,
            crossDomain: true,
          }
        );
        setEvent(response.data);
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Failed to fetch event details. " + error.message,
          severity: "error",
        });
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleDelete = async () => {
    const adminId = auth.id; // Get the user ID from the auth context
    if (!confirm("Are you sure you want to delete this event?")) return;
    if(!eventId || eventId <= 0) console.log("Event ID is required");
    if(!auth.token || auth.token === "") console.log("Auth token is required");
    if(!adminId || adminId === "") console.log("Admin ID is required");
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/events/delete/${eventId}/admin/${adminId}`,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
          withCredentials: true,
          crossDomain: true,
        }
      );
      setTimeout(()=> navigate("/"),1000); // Or redirect to your events list
      setSnackbar({
        open: true,
        message: "Event deleted successfully!",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Failed to delete the event.",
        severity: "error",
      });
      console.error("Error deleting event:", err);
      alert("Failed to delete the event.");
    }
  };

  const handleRegister = async()=>{
    if(!auth.token || auth.token === "") {
      console.log("Auth token is required");      
      return;
    }
    if(!eventId  || eventId === "") {
      console.log("Event ID is required");
      return;
    }
    const userId = auth.id; // Get the user ID from the auth context
    if(!userId || userId === "") {
      console.log("User ID is required");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/registrations/${userId}/event/${eventId}`,
        {},
        {
          headers: { Authorization: `Bearer ${auth.token}` },
          withCredentials: true,
          crossDomain: true,
        }
      );
      setSnackbar({
        open: true,
        message: "Successfully registered for the event!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response.data.message,
        severity: "error",
      });
      console.error("Error registering for event:", error);
    }
  }

  if (loading)
    return (
      <p className="text-center text-gray-600 mt-5">Loading event details...</p>
    );
  if (!event)
    return <p className="text-center text-red-500 mt-5">Event not found!</p>;

  const isOwner = auth?.id === event?.createdBy;
  console.log(auth);
  console.log(event);

  return (
    <div className="max-w-6xl mx-auto bg-stone-100 p-6 rounded-2xl shadow-xl border border-gray-200 m-1">
      {/* Top Action Buttons: Back, Edit, Delete */}
      <div className="flex justify-between items-center mb-5 flex-wrap gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-700 bg-gray-100 px-4 py-2 rounded-md shadow-md hover:bg-gray-200 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back
        </button>

        {isOwner && (
          <div className="flex gap-3">
            <button
              onClick={() => navigate(`edit`)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
            >
              <Pencil className="w-5 h-5 mr-2" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Event Image Section */}
      <div className="relative w-full h-[450px] rounded-lg overflow-hidden shadow-2xl ">
        <img
          src={event.image || "https://via.placeholder.com/800"}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 flex flex-col justify-end p-8">
          <h1 className="text-5xl font-extrabold text-white captilize ">
            {event.name}
          </h1>
          <p className="text-lg text-gray-200 mt-2 capitalize">
            {event.category}
          </p>
        </div>
      </div>

      {/* Event Description (Placed Just Below the Image) */}
      <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-[#4A403A] mb-4">
          Event Overview
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          {event.description ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus dolor a tortor vehicula, a posuere risus scelerisque. Cras dictum rutrum arcu et eleifend. Etiam mollis velit eu egestas ornare. Etiam in risus sed arcu sagittis blandit eget pulvinar enim. Etiam vestibulum ut magna vitae laoreet. Aliquam sit amet tincidunt arcu. Suspendisse congue porta ante, ac dictum felis. Fusce vel suscipit neque. Praesent scelerisque quam non eros commodo, at mollis metus placerat. Etiam sed pretium eros."}
        </p>
      </div>

      {/* Event Details & Register Button (Grid Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {/* Section 2.1 - Event Details (Left) */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3 bg-gray-50 p-5 rounded-lg shadow-md">
            <Calendar className="text-[#A08963] w-7 h-7" />
            <p className="text-lg font-medium text-gray-700">
              <span className="font-semibold">Date:</span>{" "}
              {convertToDate(event.date)}
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
              <span className="font-semibold">Entry Fee:</span>{" "}
              {event.registrationFee ? `${event.registrationFee}` : "Free"}
            </p>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 p-5 rounded-lg shadow-md">
            <Users className="text-[#A08963] w-7 h-7" />
            <p className="text-lg font-medium text-gray-700">
              <span className="font-semibold">Slots Available:</span>{" "}
              {event.slots}
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
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            Join the Event!
          </h2>
          <button 
          onClick={handleRegister}
          className="px-6 py-3 bg-[#A08963] text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-[#8C735B] transition">
            Register Now
          </button>
        </div>
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={handleSnackbarClose}
          sx={{ width: "400px", fontSize: "1.2rem", p: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
export default EventDetailPage;
