import { useState } from 'react';

const useUnfriend = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const unfriend = async (userId, friendId) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:8005/api/friends/unfriend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ userId, friendId }),
      });

      if (!response.ok) {
        throw new Error("Failed to unfriend");
      }

      const data = await response.json();
      if (data.success) {
        setSuccess(true); // Set success if the response indicates it
      } else {
        setError("Unable to unfriend at the moment.");
      }
    } catch (error) {
      setError(error.message || "Error while unfriending");
    } finally {
      setLoading(false);
    }
  };

  return { unfriend, loading, error, success };
};

export default useUnfriend;
