import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Shield,
  Calendar,
  MapPin,
  Tag,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { profileId } = useParams();
  const [userData, setUserData] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useContext(AuthContext); // Access auth context  
    const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
        
      try {
        if(!profileId || profileId === "") {
            console.error("Profile ID is required");
            return;
        }
        if(!auth.token || auth.token === "") {
            console.error("No auth token");
            return;
        }
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${profileId}`,
          {
            headers: { Authorization: `Bearer ${auth.token}` },
            withCredentials: true,
            crossDomain: true,
          }
        );
        setUserData(response.data);
        await axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/registrations/user/${profileId}`,
          {
            headers: { Authorization: `Bearer ${auth.token}` },
            withCredentials: true,
            crossDomain: true,
          })
        .then((eventsResponse)=> setRegisteredEvents(eventsResponse.data))
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (profileId) fetchProfile();
  }, [profileId]);

  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading profile...</div>;
  }

  if (!userData) {
    return <div className="text-center py-10 text-red-600">User not found!</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* User Info */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-10 border">
        <h2 className="text-2xl font-bold mb-6 text-[#3f3f3f]">User Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-gray-800">
          <div className="flex items-center gap-3">
            <User className="text-[#A08963]" />
            <p><strong>Name:</strong> {userData.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="text-[#A08963]" />
            <p><strong>Email:</strong> {userData.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="text-[#A08963]" />
            <p><strong>Phone:</strong> {userData.phone || "N/A"}</p>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="text-[#A08963]" />
            <p><strong>Role:</strong> {userData.role}</p>
          </div>
        </div>
      </div>

      {/* Registered Events */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4 text-[#4A403A]">Registered Events</h3>
        {registeredEvents?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {registeredEvents.map((registration) => (
              <div
                key={registration.id}
                onClick={()=> navigate(`/event/${registration.event.id}`)}
                className="bg-white border rounded-lg shadow-sm p-5 hover:shadow-lg transition cursor-pointer"
              >
                <h4 className="text-lg font-bold mb-1">{registration.event.name}</h4>
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(registration.event.date).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <MapPin className="w-4 h-4 mr-2" />
                  {registration.event.venue}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Tag className="w-4 h-4 mr-2" />
                  {registration.event.category}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No registered events.</p>
        )}
      </div>

      {/* Created Events (if admin) */}
      {userData.role === "ADMIN" && (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#4A403A]">Created Events</h3>
          {userData.createdEvents?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {userData.createdEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={()=> navigate(`/event/${event.id}`)}
                  className="bg-white border rounded-lg shadow-sm p-5 hover:shadow-lg transition cursor-pointer"
                >
                  <h4 className="text-lg font-bold mb-1">{event.name}</h4>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.venue}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Tag className="w-4 h-4 mr-2" />
                    {event.category}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No events created yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
