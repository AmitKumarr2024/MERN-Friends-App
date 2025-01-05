import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useMutualFriends = (userId, friendId) => {
  const [mutualFriends, setMutualFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId || !friendId) return;

    const fetchMutualFriends = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/friends/mutualFriend?userId=${userId}&friendId=${friendId}`
        );

        const data = await response.json();

        setMutualFriends(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMutualFriends();
  }, [userId, friendId]);

  return { mutualFriends, loading, error };
};

export default useMutualFriends;
