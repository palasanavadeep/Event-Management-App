// src/pages/ContactPage.jsx
import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-[#F5F5F5] p-6">
            <header className="text-center py-10 bg-[#A08963] text-white rounded-lg shadow-md">
                <h1 className="text-4xl font-bold">Contact Us</h1>
                <p className="mt-2 text-lg">Get in touch with us for any inquiries or support.</p>
            </header>
            
            <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-[#4A403A]">Reach Out to Us</h2>
                <p className="mt-4 text-gray-600">
                    We are here to assist you with any questions or concerns. Feel free to reach out
                    through the following contact details.
                </p>
                
                <div className="mt-6 space-y-4">
                    <p className="flex items-center text-gray-700">
                        <FaEnvelope className="mr-3 text-[#A08963]" /> Email: support@eventmanagement.com
                    </p>
                    <p className="flex items-center text-gray-700">
                        <FaPhone className="mr-3 text-[#A08963]" /> Phone: +1 (234) 567-890
                    </p>
                    <p className="flex items-center text-gray-700">
                        <FaMapMarkerAlt className="mr-3 text-[#A08963]" /> Location: 123 Event Street, New York, NY 10001
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
