import { useState } from "react";
import toast from "react-hot-toast";

const useCancelFriendRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const cancelRequest = async (userId, friendId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8005/api/friends/cancelRequest", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, friendId }),
      });

      if (!response.ok) {
        toast.error("Failed to cancel friend request");
      }

      const data = await response.json();
      setSuccess(true);
      console.log("Friend request canceled:", data);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return { cancelRequest, loading, error, success };
};

export default useCancelFriendRequest;
