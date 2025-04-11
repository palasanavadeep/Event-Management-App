import React, { useEffect, useState ,useContext} from "react";
import { useParams } from "react-router-dom"; // Assuming you're using React Router
import axios from "axios";
import EventForm from "../event/EventForm.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import { convertToDate } from "../utils/dateFormatter.js";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material"; // Import Snackbar and Alert from MUI

function EditEventPage() {
  const { eventId } = useParams(); // Get event ID from URL params
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext); // Access auth context
  const adminId = auth.id; // Get the user ID from the auth context
  
  const [event, setEvent] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info", // success or error
  });
  // Handle Snackbar close
  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    if(!eventId || eventId === "") {
      console.error("Event ID is required");
      return;
    }
    const fetchEvent = async () => {
      if(!auth.token) {
        console.error("No auth token");
        return;
      }
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/events/event/${eventId}`,{
          headers: { Authorization: `Bearer ${auth.token}` },
          withCredentials: true ,
          crossDomain: true,
         })
         response.data.date = convertToDate(response.data.date);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  const editEvent = async (formData) => {
    if(!auth.token) {
      console.error("No auth token");
      return;
    }
    if(!eventId || eventId === "") {
      console.error("Event ID is required");
      return;
    }
    if(!adminId || adminId === "") {
      console.error("Admin ID is required");
      return;
    }
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/events/update/${eventId}/${adminId}`, formData, {
        headers: { Authorization: `Bearer ${auth.token}` },
        withCredentials: true ,
        crossDomain: true,
      });
      console.log("Event Updated:", response.data);
      // Redirect to the event page after successful update
      setTimeout(() => navigate(`/event/${response.data.id}`), 1200); // Redirect after delay
      setSnackbar({
        open: true,
        message: "Event updated successfully!",
        severity: "success",
      });
     
      // You can redirect or show a success message here
    } catch (error) {
      console.error("Error updating event:", error);
      setTimeout(() => navigate(`/event/${response.data.id}`), 1000);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Event update failed",
        severity: "error",
      });
    }
  };

  if (!event) return <p>Loading...</p>;



  return <>
    <EventForm event={event} onSubmit={editEvent} isEdit/>

    {/* Snackbar for success or error messages */}
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
  </>;
}

export default EditEventPage;
