import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Use named import for jwt-decode
import useUser from "../Hooks/useUser"; // Custom hook to fetch user data

const SideMenu = () => {
  const [extractedUserId, setExtractedUserId] = useState(null); // To store extracted user ID from token

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("Stored Token:", storedToken); // Log token value
    
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        console.log("Decoded Token:", decoded); // Log decoded token
        
        setExtractedUserId(decoded?._id); // Set extracted user ID from the token
      } catch (error) {
        console.error("Invalid token", error);
      }
    } else {
      console.error("No token found in localStorage.");
    }
  }, []);

  // Fetch user data once we have the userId
  const { user, loading, error } = useUser(extractedUserId);
  console.log("User Data:", user); // Log user data
  console.log("Loading Status:", loading); // Log loading status
  console.log("Error:", error); // Log error if any

  if (loading) return <div className="p-4 text-blue-500">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="my-9 bg-blue-200 rounded-lg p-6 flex flex-col   shadow-lg">
      <div className="text-center mb-4">
        <div className="border-4 border-red-500 rounded-full p-2 mx-auto w-44 h-44 bg-white">
          <img
            src={user?.data?.profilePic || "https://via.placeholder.com/150"}
            alt={user?.name || "User Avatar"}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <p className="text-xl font-bold mt-4">{user?.data?.fullName || "User Name"}</p>
      </div>
      <div className="py-4">
        <p className="flex justify-between text-xl px-6">
          Gender:{" "}
          <span className="font-semibold">
            {user?.data?.gender || "Not Available"}
          </span>
        </p>
      </div>
      
      <div className="flex flex-col gap-4">
        <Link
          to="/newRequest"
          className="w-full text-center hover:bg-slate-100 bg-white p-3 text-xl text-slate-500 font-semibold rounded-md shadow-md transition duration-300 ease-in-out"
        >
          Accept Request
        </Link>
        <Link
          to="/viewFriends"
          className="w-full text-center hover:bg-slate-100 bg-white p-3 text-xl text-slate-500 font-semibold rounded-md shadow-md transition duration-300 ease-in-out"
        >
          View Friends
        </Link>
      </div>
    </div>
  );
};

export default SideMenu;
