import { useState, useEffect } from "react";

const useUser = (userId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get the token from localStorage or sessionStorage
    const token = localStorage.getItem("token");
    
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

        
        
        // Check if the response is ok before consuming the body
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        // Only parse the JSON if the response is successful
        const data = await response.json();
        
        
        setUser(data.data); // Set the fetched user data
        
      } catch (err) {
        setError(err.message);
        console.error("Error fetching user:", err); // Log error if fetching fails
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
