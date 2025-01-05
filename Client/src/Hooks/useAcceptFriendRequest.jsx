import { useState } from "react";

const useAcceptFriendRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const acceptFriend = async (userId, friendId) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/friends/acceptFriend", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, friendId }),
      });

      // Log the response status and data for debugging
      console.log("Response Status:", response.status);
      const data = await response.json();
      console.log("Response Data:", data);

      if (response.ok) {
        setSuccess("Friend request accepted successfully.");
      } else {
        setError(data.message || "Failed to accept friend request.");
      }
    } catch (err) {
      console.error("Error while accepting friend request:", err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return { acceptFriend, loading, error, success };
};

export default useAcceptFriendRequest;
