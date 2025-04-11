import React, { useEffect, useState } from "react";

const ProfilePage = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchUserProfile();
    }, [userId]);

    const fetchUserProfile = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/users/${userId}`);
            const data = await res.json();
            setUser(data.user);
            setEvents(data.events);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    return (
        <div className="profile-container">
            {user ? (
                <div>
                    <h2>Profile</h2>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <button onClick={() => window.location.href = "/edit-profile"}>
                        Edit Profile
                    </button>
                    <h3>Your Events</h3>
                    {events.length > 0 ? (
                        events.map(event => (
                            <div key={event._id} className="event-card">
                                <h4>{event.title}</h4>
                                <p>{event.date}</p>
                            </div>
                        ))
                    ) : (
                        <p>No events found.</p>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProfilePage;
