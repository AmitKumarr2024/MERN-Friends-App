import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "./card";
import useAcceptFriendRequest from "../Hooks/useAcceptFriendRequest";  // Make sure the hook import is correct
import useCancelFriendRequest from "../Hooks/useCancelFriendRequest";
import { jwtDecode } from "jwt-decode";
import useViewFriends from "../Hooks/useViewFriends ";

const NewRequestRecieve = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setUserId(decoded._id);
      } catch (error) {
        console.error("Invalid token", error);
      }
    } else {
      console.error("No token found in localStorage.");
    }
  }, []);

  const { acceptFriend, loading, error, success } = useAcceptFriendRequest();  // Use acceptFriend here
  const { cancelRequest, loading: cancelLoading } = useCancelFriendRequest();
  const { friends, loading: friendsLoading, error: friendsError } = useViewFriends(userId);

  const handleAccept = (friendId) => {
    if (userId) {
      acceptFriend(userId, friendId);  // Corrected to acceptFriend
    }
  };

  const handleCancel = (friendId) => {
    if (userId) {
      cancelRequest(userId, friendId);
    }
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
          New Friend Requests Received
        </h1>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <div className="h-[70vh] bg-gray-100 p-4 overflow-y-auto rounded-lg shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.isArray(friends) && friends.length > 0 ? (
              friends.map((request) => (
                <div key={request._id} className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
                  <Card
                    image={request.profilePic}
                    title={request.fullName}
                    description={`Friend request from ${request.email}`}
                   
                  />
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => handleAccept(request._id)}
                      className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg"
                      disabled={loading || cancelLoading}
                    >
                      {loading ? "Accepting..." : "Accept"}
                    </button>
                    <button
                      onClick={() => handleCancel(request._id)}
                      className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg"
                      disabled={loading || cancelLoading}
                    >
                      {cancelLoading ? "Canceling..." : "Cancel"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No new friend requests</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRequestRecieve;
