import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx"; // Import AuthContext

const AdminAccessPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const { auth } = useContext(AuthContext); // Access auth context 

  const handleRequest = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      // Replace with actual user ID if required (or fetch from auth context)
    //   const response = await axios.post("/api/users/request-admin");

        if(auth.id != null && auth.id){
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/users/request-admin/${auth.id}`,{},
                {
                    headers: { Authorization: `Bearer ${auth.token}` },
                    withCredentials: true,
                    crossDomain: true,
                }
            );
            if(response.status === 200){
                setMessage("Admin access request submitted successfully. Your request will be reviewed by a Super Admin.");
                setError(null);
            }
            else{
                setError("Failed to submit request. Please try again.");
            }
        }

      
    } catch (err) {
      const msg =
        err.response?.data?.message || "Failed to submit request. Try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-lg rounded-xl border">
      <h2 className="text-2xl font-bold text-center mb-4">Request Admin Access</h2>

      {message && (
        <p className="text-green-600 text-center mb-4 font-medium">{message}</p>
      )}
      {error && (
        <p className="text-red-600 text-center mb-4 font-medium">{error}</p>
      )}

      <p className="text-gray-700 text-center mb-6">
        Click the button below to request admin access. The request will be reviewed by a Super Admin.
      </p>

      <div className="flex justify-center">
        <button
          onClick={handleRequest}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Request Admin Role"}
        </button>
      </div>
    </div>
  );
};

export default AdminAccessPage;
