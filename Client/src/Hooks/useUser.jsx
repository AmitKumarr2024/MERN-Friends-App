import { useState, useEffect } from "react";

const useUser = (userId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get the token from localStorage or sessionStorage
    const token = localStorage.getItem("token"); // Or use sessionStorage if that's where you store it


    // Define the fetchUser function
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/user/singleUser/${userId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Add token to Authorization header
            "Content-Type": "application/json", // Ensure proper content type is set
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setUser(data);
       
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Fetch the user data
    if (userId && token) {
      fetchUser();
    } else {
      setError("No user ID or token provided.");
      setLoading(false);
    }
  }, [userId]);

  return { user, loading, error };
};

export default useUser;
