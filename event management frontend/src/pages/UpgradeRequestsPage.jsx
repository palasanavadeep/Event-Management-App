// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext.jsx"; // Import AuthContext

// const UpgradeRequestsPage = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");

//   const { auth } = useContext(AuthContext); // Access auth context
//   if (!auth || auth.role !== "SUPER_ADMIN") {
//     return (
//       <div className="p-4 max-w-3xl mx-auto">
//         <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
//         <p className="text-red-600">
//           You do not have permission to view this page.
//         </p>
//       </div>
//     );
//   }

//   const fetchRequests = async () => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/api/super-admin/upgrade-requests`,
//         {
//           headers: { Authorization: `Bearer ${auth.token}` },
//           withCredentials: true,
//           crossDomain: true,
//         }
//       );
//       setRequests(res.data);
//     } catch (err) {
//       console.error("Failed to fetch requests:", err);
//       setMessage("Failed to load requests.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!auth || auth.role !== "SUPER_ADMIN") {
//       return (
//         <div className="p-4 max-w-3xl mx-auto">
//           <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
//           <p className="text-red-600">
//             You do not have permission to view this page.
//           </p>
//         </div>
//       );
//     }
//     fetchRequests();
//   }, []);

//   const handleAction = async (id, action) => {
//     try {
//       if (action === "approve") {
//         const response = await axios.post(
//           `${
//             import.meta.env.VITE_BACKEND_URL
//           }/api/super-admin/approve-request/${id}`,
//           {},
//           {
//             headers: { Authorization: `Bearer ${auth.token}` },
//             withCredentials: true,
//             crossDomain: true,
//           }
//         );
//       } else {
//         const response = await axios.post(
//           `${
//             import.meta.env.VITE_BACKEND_URL
//           }/api/super-admin/reject-request/${id}`,
//           {},
//           {
//             headers: { Authorization: `Bearer ${auth.token}` },
//             withCredentials: true,
//             crossDomain: true,
//           }
//         );
//       }
//       // const endpoint = `/api/admin/upgrade-requests/${id}/${action}`;
//       // await axios.post(endpoint);
//       setRequests((prev) => prev.filter((r) => r.id !== id));
//       setMessage(`Request ${action}ed successfully.`);
//     } catch (err) {
//       console.error(`Failed to ${action} request`, err);
//       setMessage(`Failed to ${action} request.`);
//     }
//   };

//   if (loading) return <p>Loading requests...</p>;

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <h2 className="text-xl font-semibold mb-4">
//         Pending Admin Upgrade Requests
//       </h2>
//       {message && <p className="mb-4 text-sm text-blue-600">{message}</p>}

//       {requests.length === 0 ? (
//         <p>No pending requests.</p>
//       ) : (
//         <ul className="space-y-4">
//           {requests.map((req) => (
//             <li key={req.id} className="p-4 border rounded-lg shadow-sm">
//               <p>
//                 <strong>User:</strong> {req.user.name} ({req.user.email})
//               </p>
//               <p>
//                 <strong>Requested On:</strong>{" "}
//                 {new Date(req.requestDate).toLocaleString()}
//               </p>
//               <div className="mt-3 space-x-3">
//                 <button
//                   onClick={() => handleAction(req.id, "approve")}
//                   className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
//                 >
//                   Approve
//                 </button>
//                 <button
//                   onClick={() => handleAction(req.id, "reject")}
//                   className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
//                 >
//                   Reject
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default UpgradeRequestsPage;

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";

const UpgradeRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const { auth } = useContext(AuthContext);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/super-admin/upgrade-requests`,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
          withCredentials: true,
        }
      );
      setRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch requests:", err);
      setMessage("Failed to load requests.");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      const endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/super-admin/${
        action === "approve" ? "approve-request" : "reject-request"
      }/${id}`;

      await axios.post(endpoint, {}, {
        headers: { Authorization: `Bearer ${auth.token}` },
        withCredentials: true,
      });

      setRequests((prev) => prev.filter((r) => r.id !== id));
      setMessage(`Request ${action}ed successfully.`);
    } catch (err) {
      console.error(`Failed to ${action} request`, err);
      setMessage(`Failed to ${action} request.`);
    }
  };

  useEffect(() => {
    if (auth && auth.role === "SUPER_ADMIN") fetchRequests();
  }, []);

  if (!auth || auth.role !== "SUPER_ADMIN") {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Access Denied</h2>
        <p className="text-red-600">You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Pending Admin Upgrade Requests
      </h2>

      {message && (
        <div className="mb-4 text-center text-blue-600 font-medium">
          {message}
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-500">Loading requests...</p>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-500">No pending requests.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-800 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Requested On</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{req.user.name}</td>
                  <td className="px-6 py-4">{req.user.email}</td>
                  <td className="px-6 py-4">
                    {new Date(req.requestDate).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 flex gap-2 justify-center">
                    <button
                      onClick={() => handleAction(req.id, "approve")}
                      className="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(req.id, "reject")}
                      className="bg-red-600 text-white px-4 py-1.5 rounded hover:bg-red-700 transition"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UpgradeRequestsPage;
