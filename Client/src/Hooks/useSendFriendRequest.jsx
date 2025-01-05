import { useState } from "react";

const useSendFriendRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState([]);

  const sendRequest = async (userId, friendId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/friends/sendRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, friendId }),
      });

      if (!response.ok) {
        // Attempt to parse JSON error response
        const errorDetails = await response.json();
        throw new Error(errorDetails.message || "Something went wrong");
      }

      const data = await response.json();
      setSuccess( data);
      console.log("Friend request sent:", data);
    } catch (err) {
      console.error("Error while sending friend request:", err);
      setError(err.message || "Something went wrong");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return { sendRequest, loading, error, success };
};

export default useSendFriendRequest;
