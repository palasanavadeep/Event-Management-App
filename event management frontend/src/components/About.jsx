// src/pages/AboutPage.jsx
import React from "react";

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-[#F5F5F5] p-6">
            <header className="text-center py-10 bg-[#A08963] text-white rounded-lg shadow-md">
                <h1 className="text-4xl font-bold">About Us</h1>
                <p className="mt-2 text-lg">Learn more about our mission and vision.</p>
            </header>
            
            <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-[#4A403A]">Who We Are</h2>
                <p className="mt-4 text-gray-600">
                    We are dedicated to providing a seamless platform for discovering and managing events.
                    Our goal is to connect people with exciting opportunities and experiences.
                </p>
                
                <h2 className="text-2xl font-bold text-[#4A403A] mt-6">Our Mission</h2>
                <p className="mt-2 text-gray-600">
                    Our mission is to make event discovery and management effortless, providing users with
                    a user-friendly interface and powerful tools to organize and participate in events.
                </p>
                
                <h2 className="text-2xl font-bold text-[#4A403A] mt-6">Why Choose Us?</h2>
                <ul className="mt-2 text-gray-600 list-disc pl-6">
                    <li>Seamless event discovery and registration</li>
                    <li>Secure and hassle-free ticket booking</li>
                    <li>Wide range of events across various categories</li>
                    <li>User-friendly and intuitive platform</li>
                    <li>Dedicated support for event organizers and attendees</li>
                </ul>
                
                <h2 className="text-2xl font-bold text-[#4A403A] mt-6">Meet Our Team</h2>
                <p className="mt-2 text-gray-600">
                    Our team consists of passionate professionals dedicated to delivering the best event
                    management experience. From developers to event specialists, we work together to
                    bring you the best platform possible.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;
