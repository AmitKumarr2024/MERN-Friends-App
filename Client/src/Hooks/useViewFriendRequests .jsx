import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useViewFriendRequests = (userId) => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      setError(null);

      const fetchFriendRequests = async () => {
        try {
          const response = await fetch("/api/friends/viewFriend", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          });

          if (!response.ok) {
            throw new Error("Failed to fetch friend requests");
          }

          const data = await response.json();
          setFriendRequests(data.requests || []); // Adjust this if the response format is different
        } catch (err) {
          setError(err.message || "Something went wrong");
          toast.error("Failed to load friend requests");
        } finally {
          setLoading(false);
        }
      };

      fetchFriendRequests();
    }
  }, [userId]);

  return { friendRequests, loading, error };
};

export default useViewFriendRequests;
