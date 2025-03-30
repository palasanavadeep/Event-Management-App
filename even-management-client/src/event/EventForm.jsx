import React, { useState } from "react";
import { UploadCloud } from "lucide-react";


const EventForm = ({ event = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: event.name || "",
    description: event.description || "",
    date: event.date || "",
    entryFee: event.entryFee || "",
    slots: event.slots || "",
    venue: event.venue || "",
    category: event.category || "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    if (image) {
      formDataObj.append("image", image);
    }

    // Call the provided onSubmit function (Create or Edit)
    onSubmit(formDataObj);
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
          className="w-full p-3 border rounded-lg bg-gray-100 text-gray-800 focus:ring-2 focus:ring-[#A08963] focus:outline-none shadow-sm col-span-1 lg:col-span-2"
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
          name="entryFee"
          placeholder="Entry Fee"
          value={formData.entryFee}
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
        <div className="w-full border rounded-lg bg-gray-100 text-gray-800 p-3 flex flex-col items-center justify-center cursor-pointer shadow-sm hover:bg-gray-200">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="fileInput"
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
          <option value="Finance">Finance</option>
          <option value="Tech">Tech</option>
          <option value="Education">Education</option>
        </select>
        <button
          type="submit"
          className="w-full bg-[#4A403A] text-white p-3 rounded-lg hover:bg-[#3A322D] transition duration-300 shadow-md col-span-1 lg:col-span-2 uppercase font-semibold"
        >
          {event.id ? "Update Event" : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
