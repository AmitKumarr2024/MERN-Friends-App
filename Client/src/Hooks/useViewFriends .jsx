import { useState, useEffect } from 'react';

const useViewFriends = (userId) => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      const fetchFriends = async () => {
        try {
          const response = await fetch("http://localhost:8005/api/friends/viewFriend", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ userId }),
          });
          const data = await response.json();
          console.log("view",data.data);
          
          setFriends(data.data); // Assuming 'friends' key contains the friend list
        } catch (error) {
          setError("Error fetching friends.");
        } finally {
          setLoading(false);
        }
      };

      fetchFriends();
    }
  }, [userId]);

  return { friends, loading, error };
};

export default useViewFriends;
