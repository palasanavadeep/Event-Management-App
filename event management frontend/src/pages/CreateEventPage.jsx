import React, { useState, useContext } from "react";
import EventForm from "../event/EventForm.jsx";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material"; // Import Snackbar and Alert from MUI

function CreateEventPage() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const userId = auth.id; // Get the user ID from the auth context

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info", // success or error
  });


  if (!auth.token) {
    return <div>Unauthorized</div>;
  }

  const createEvent = async (formData) => {
    try {
      if(!auth.id){
        return null;
      }

      if(auth.role !== "ADMIN") {
        setSnackbar({
          open: true,
          message: "Unauthorized Access, Only Admins Can Create Events",
          severity: "error",
        });
        return;
      }
      console.log(formData);
      
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/events/create/${userId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
          withCredentials: true,
          crossDomain: true,
        }
      );

      if (!response.data) {
        throw new Error("No event data returned");
      }

      console.log("Event Created:", response.data);

      // Show success Snackbar
      setSnackbar({
        open: true,
        message: "Event created successfully!",
        severity: "success",
      });

      setTimeout(() => navigate(`/event/${response.data.id}`), 1200);



      // You can redirect or take other actions here
    } catch (error) {
      console.error("Error creating event:", error);

      // Show error Snackbar
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Event creation failed",
        severity: "error",
      });
      setTimeout(() => navigate(`/event/${response.data.id}`), 1200);
    }
  };

  const uploadImageAPI = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    if(auth.role !== "ADMIN") {
      setSnackbar({
        open: true,
        message: "Unauthorized Access, Only Admins Can Create Events",
        severity: "error",
      });
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/files/upload`,
        formData,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
          withCredentials: true,
          crossDomain: true,
        }
      );

      if (!response.data) {
        throw new Error("No image data returned");
      }
      console.log("Image Uploaded:", response.data);
      
      return response.data; // Assuming the API returns the image URL
    } catch (error) {
      throw new Error("Image upload failed");
    }
  };

  // Handle Snackbar close
  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <EventForm onSubmit={createEvent} uploadImageAPI={uploadImageAPI} />

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
    </>
  );
}

export default CreateEventPage;
