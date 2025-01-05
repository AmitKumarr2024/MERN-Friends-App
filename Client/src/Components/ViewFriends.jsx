import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "./card"; // Assuming you are using the same Card component
import {jwtDecode} from "jwt-decode"; // Correcting import for jwtDecode
import useUser from "../Hooks/useUser";
import useViewFriends from "../Hooks/useViewFriends ";
import useUnfriend from "../Hooks/useUnfriend ";

const ViewFriends = () => {
  const [userId, setUserId] = useState(null);

  // Decode token to get userId
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken); // Decode the token
        const { _id: userId, email, profilePic } = decoded;
        setUserId(userId); // Set the userId from the decoded token
      } catch (error) {
        console.error("Invalid token", error);
      }
    } else {
      console.error("No token found in localStorage.");
    }
  }, []);

  // Use custom hooks
  const { friends, loading: friendsLoading, error: friendsError } = useViewFriends(userId);
  const { user, loading: userLoading, error: userError } = useUser(userId); // Fetch user details
  const { unfriend, loading: unfriendLoading, error: unfriendError, success } = useUnfriend();

  
 
  

 
  
  
  

  // Function to handle unfriending
  const handleUnfriend = async (friendId) => {
    await unfriend(userId, friendId);
  };

  return (
    <div className="p-6">
      <Link
        to="/home"
        className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 py-2 rounded-lg mb-6 transition duration-200"
      >
        Back
      </Link>

      <div className="flex flex-col justify-center m-auto items-center gap-6 w-[80vw]">
        <h1 className="text-white text-2xl font-bold text-center bg-purple-500 p-3 rounded-lg shadow-md">
          Your Friends
        </h1>

        

        {/* Errors and Success Messages */}
        {friendsError && <p className="text-red-500">{friendsError}</p>}
        {unfriendError && <p className="text-red-500">{unfriendError}</p>}
        {success && <p className="text-green-500">Friend removed successfully</p>}

        {/* Friends List */}
        <div className="h-[70vh] bg-gray-100 p-4 overflow-y-auto rounded-lg shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {friendsLoading ? (
              <p>Loading...</p>
            ) : friends.length > 0 ? (
              friends.map((friend) => (
                <div key={friend._id} className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
                  <Card
                    image={friend.profilePic || "https://via.placeholder.com/400x200"}
                    title={friend.fullName} // Assuming 'name' is in the response
                    description={`Email ${friend.email}  Gender:${friend.gender}`} // Assuming friendshipDate exists
                    y
                  />
                  {/* Unfriend Button */}
                  <button
                    onClick={() => handleUnfriend(friend._id)}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400"
                    disabled={unfriendLoading}
                  >
                    {unfriendLoading ? "Unfriending..." : "Unfriend"}
                  </button>
                </div>
              ))
            ) : (
              <p>No friends found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewFriends;
