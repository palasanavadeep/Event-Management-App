import React, { useState, useEffect } from "react";

const EditProfile = () => {
    const [user, setUser] = useState({ name: "", email: "", phone: "" });
    const userId = "user_id_from_auth"; // Replace this with actual user ID from authentication

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/users/${userId}`);
            const data = await res.json();
            setUser(data.user);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            const data = await res.json();
            if (res.ok) {
                alert("Profile updated successfully!");
            } else {
                alert(`Error: ${data.message || "Something went wrong."}`);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-3 py-2 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-3 py-2 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-3 py-2 rounded-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditProfile;
