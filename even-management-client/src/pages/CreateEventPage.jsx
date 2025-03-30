import React from "react";
import EventForm from "../event/EventForm.jsx";
import axios from "axios";

function CreateEventPage() {
  const createEvent = async (formData) => {
    try {
      const response = await axios.post("/api/events", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Event Created:", response.data);
      // You can redirect or show a success message here
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return <EventForm onSubmit={createEvent} />;
}

export default CreateEventPage;
