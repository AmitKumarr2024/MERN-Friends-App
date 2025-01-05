import { useState, useEffect } from "react";

const useFriends = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch("/api/user/allUser");
        const data = await response.json();
        setFriends(data.data);
       
        
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, []);

  return { friends, loading, error };
};

export default useFriends;
