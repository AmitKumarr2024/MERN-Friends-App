import React, { useEffect, useState } from "react";
import Card from "../Components/card";
import useFriends from "../Hooks/useFriends";
import { jwtDecode } from "jwt-decode";
import useUser from "../Hooks/useUser";
import useSendFriendRequest from "../Hooks/useSendFriendRequest";
import toast from "react-hot-toast";

const FriendList = () => {
  const { friends, loading, error } = useFriends();
  const [friendList, setFriendList] = useState([]);
  const [extractedUserId, setExtractedUserId] = useState(null);
  const { sendRequest, loading: requestLoading, error: requestError, success } = useSendFriendRequest();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setExtractedUserId(decoded?._id);
      } catch (error) {
        console.error("Invalid token", error);
      }
    } else {
      console.error("No token found in localStorage.");
    }
  }, []);

  const { user } = useUser(extractedUserId);

  useEffect(() => {
    if (friends) {
      const filteredFriends = friends.filter(friend => friend._id !== user?.data?._id );
      setFriendList(filteredFriends);
    }
  }, [friends, user]);

  const handleButtonClick = (friendId) => {
    if (user?.data?._id && friendId) {
      sendRequest(user?.data?._id, friendId);
      
    }
  };

  useEffect(() => {
    if (success) {
      // Update the friend list after the friend request is sent
      setFriendList((prevList) => prevList.filter(friend => friend._id !== extractedUserId));
    }
  }, [success, extractedUserId]);

  // Show error as toast notifications
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (requestError) {
      toast.error(requestError);
    }
  }, [error, requestError]);

  if (loading || requestLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-white tracking-wider text-2xl font-bold text-center my-2 mt-9 bg-purple-500 p-2">
        Friend List
      </h1>
      <div className="w-full h-[80vh] mb-1 bg-gray-100 py-6 overflow-y-scroll">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 px-4">
          {friendList.map((friend) => (
            <Card
              key={friend._id}
              image={friend.profilePic || "https://via.placeholder.com/400x200"}
              title={friend.fullName}
              description={`Email: ${friend.email}, Gender: ${friend.gender}`}
              buttonText="Send Friend Request"
              onButtonClick={() => handleButtonClick(friend._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendList;
