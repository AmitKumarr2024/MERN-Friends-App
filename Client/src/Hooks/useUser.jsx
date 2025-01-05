import { useState, useEffect } from "react";

const useUser = (userId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get the token from localStorage or sessionStorage
    const token = localStorage.getItem("token");
    console.log("Stored Token:", token); // Log token value

    // Define the fetchUser function
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Fetching user with ID:", userId); // Log user ID being fetched

        const response = await fetch(`/api/user/singleUser/${userId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Add token to Authorization header
            "Content-Type": "application/json", // Ensure proper content type is set
          },
        });

        console.log("Response status:", response.status); // Log response status
        
        // Check if the response is ok before consuming the body
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        // Only parse the JSON if the response is successful
        const data = await response.json();
        console.log("Fetched user data:", data); // Log the fetched user data
        
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
      console.error("No user ID or token provided."); // Log when no user ID or token is found
    }
  }, [userId]);

  return { user, loading, error };
};

export default useUser;
