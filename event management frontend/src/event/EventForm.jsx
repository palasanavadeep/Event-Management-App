import React, { useState } from "react";
import { UploadCloud } from "lucide-react";

const EventForm = ({ event = {}, onSubmit, uploadImageAPI , isEdit=false}) => {
  
  const [formData, setFormData] = useState({
    name: event.name || "",
    description: event.description || "",
    date: event.date || "",
    registrationFee: event.registrationFee || "",
    slots: event.slots || "",
    venue: event.venue || "",
    category: event.category || "",
  });
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the initial form data to check if it's populated
    console.log("Form data before submitting:", formData);
    if (!formData || formData == {} || formData.name === "") {
      console.error("Event name is required.");
      return;
    }

    // const formDataObj = new FormData();
    // Object.keys(formData).forEach((key) => {
    //   formDataObj.append(key, formData[key]);
    // });

    // Convert the date to ISO format
    // formData.get("date") && formData.set("date", new Date(formData.date).toISOString());
    formData.date = new Date(formData.date).toISOString();

    console.log("FormData date after conversion:", formData);
    
    // If there is an image, upload it and get the URL
    if (image) {
      setIsUploading(true);
      try {
        
        const imageUrl = await uploadImageAPI(image);
        if(!imageUrl || imageUrl === "") {
          console.error("Image upload failed: No image URL returned");
          setIsUploading(false);
          throw new Error("Image upload failed");
        }
        // formData.append("imageUrl", imageUrl); // Append image URL to FormData
        formData.imageUrl = imageUrl; // Assuming the API returns the image URL
        console.log("FormData after image upload:", formData);
      } catch (error) {
        console.error("Image upload failed", error);
        setIsUploading(false);
        return;  // Don't proceed with form submission if image upload fails
      }
    }

    // Log the final FormData object to ensure all fields are populated
    console.log("Final FormData before submit:", formData);

    try {
      // Submit the form data (use the formDataObj containing both form and image data)
      await onSubmit(formData);
      
      // setFormData({
      //   name: "",
      //   description: "",
      //   date: "",
      //   registrationFee: "",
      //   slots: "",
      //   venue: "",
      //   category: "",
      // });
      // setImage(null); // Reset the image state
    } catch (error) {
      console.error("Event creation failed", error);
    } finally {
      setIsUploading(false); // Reset the uploading state
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-300">
      <h2 className="text-3xl font-bold text-[#4A403A] mb-6 text-center uppercase tracking-wide">
        {event.id ? "Edit Event" : "Create Event"}
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg bg-gray-100 text-gray-800 focus:ring-2 focus:ring-[#A08963] focus:outline-none shadow-sm"
          required
        />
        <input
          type="text"
          name="venue"
          placeholder="Venue"
          value={formData.venue}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg bg-gray-100 text-gray-800 focus:ring-2 focus:ring-[#A08963] focus:outline-none shadow-sm"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="min-h-52 w-full p-3 border rounded-lg bg-gray-100 text-gray-800 focus:ring-2 focus:ring-[#A08963] focus:outline-none shadow-sm col-span-1 lg:col-span-2"
          required
        ></textarea>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg bg-gray-100 text-gray-800 focus:ring-2 focus:ring-[#A08963] focus:outline-none shadow-sm"
          required
        />
        <input
          type="number"
          name="registrationFee"
          placeholder="Entry Fee"
          value={formData.registrationFee}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg bg-gray-100 text-gray-800 focus:ring-2 focus:ring-[#A08963] focus:outline-none shadow-sm"
        />
        <input
          type="number"
          name="slots"
          placeholder="Number of Slots"
          value={formData.slots}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg bg-gray-100 text-gray-800 focus:ring-2 focus:ring-[#A08963] focus:outline-none shadow-sm"
          required
        />
        <div className={`w-full border rounded-lg bg-gray-100 text-gray-800 p-3 flex flex-col items-center justify-center cursor-pointer shadow-sm hover:bg-gray-200
          ${isEdit ? "pointer-events-none" : ""}`}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="fileInput"
            disabled={isEdit}
          />
          <label htmlFor="fileInput" className="flex flex-col items-center text-center text-[#4A403A] cursor-pointer">
            <UploadCloud className="w-8 h-8  text-[#A08963]" />
            {image ? image.name : "Click to upload event image"}
          </label>
        </div>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg bg-gray-100 text-gray-800 focus:ring-2 focus:ring-[#A08963] focus:outline-none shadow-sm"
          required
        >
          <option value="">Select Category</option>
          {["All", "CONFERENCE", "WORKSHOP", "SEMINAR", "CONCERT", "SPORTS"].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-[#4A403A] text-white p-3 rounded-lg hover:bg-[#3A322D] transition duration-300 shadow-md col-span-1 lg:col-span-2 uppercase font-semibold"
          disabled={isUploading}  // Disable button while uploading
        >
          {isUploading ? "Uploading..." : event.id ? "Update Event" : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
