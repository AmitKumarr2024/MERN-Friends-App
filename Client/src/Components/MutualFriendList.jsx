import React, { useState, useEffect } from "react";
import Card from "./card";
import useMutualFriends from "../Hooks/useMutualFriends ";
import { jwtDecode } from "jwt-decode";

const MutualFriendList = () => {
  const [userId, setUserId] = useState(null);
  const [friendId, setFriendId] = useState(null);

  useEffect(() => {
    // Assuming you're getting the userId and friendId from localStorage or context
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken); // Decoding the token
        setUserId(decoded._id); // Set the userId
        // Set the friendId as per your logic, here for demonstration, we are using a sample friendId
        setFriendId("677914ad0c09a045b7bacbe9");
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  const { mutualFriends, loading, error } = useMutualFriends(userId, friendId);  // Use the hook here

  
  const handleButtonClick = (item) => {
    alert(`Button clicked for ${item}`);
  };

  return (
    <>
      <div>
        <h1 className="text-white tracking-wider text-2xl font-bold text-center my-2 mt-9 bg-purple-400 p-2 ">
          Recommended Friends
        </h1>

        <div className="w-full h-[80vh] my-4 bg-gray-100 py-6 overflow-y-scroll">
          {loading && <p>Loading mutual friends...</p>}
          

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 px-4">
            {mutualFriends.length > 0 ? (
              mutualFriends.map((item) => (
                <Card
                  key={item._id} // Assuming each friend has a unique _id
                  image="https://via.placeholder.com/400x200"
                  title={item.fullName} // Assuming `fullName` is part of the item
                  description={`This is the description for ${item.fullName}.`}
                  buttonText="Learn More"
                  onButtonClick={() => handleButtonClick(item)} // Pass the specific item to the function
                />
              ))
            ) : (
              <div>No mutual friends found</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MutualFriendList;
