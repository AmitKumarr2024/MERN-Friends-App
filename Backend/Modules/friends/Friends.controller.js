import UserModel from "../User/User.models.js";
import FriendModel from "./Friends.models.js";

export const viewFriends = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "UserId is required." });
    }

    // Find the accepted friend requests
    const friendRequests = await FriendModel.find({
      $or: [
        { user1: userId, status: "accepted" },
        { user2: userId, status: "accepted" },
      ],
    });

    // If no friends found, return 404
    if (friendRequests.length === 0) {
      return res.status(404).json({ message: "No friends found." });
    }

    // Map to get the other user's ID in the friend request
    const friendIds = friendRequests.map((request) =>
      request.user1.toString() === userId ? request.user2 : request.user1
    );

    // Fetch complete user data for all friendIds
    const friends = await UserModel.find({ _id: { $in: friendIds } }).select(
      "_id fullName email profilePic gender"
    );

    return res.status(200).json({ data: friends });
  } catch (error) {
    console.error("Error fetching friends:", error);
    return res.status(500).json({ message: "Server error." });
  }
};





export const sendRequest = async (req, res) => {
  try {
    const { userId, friendId } = req.body;  // Extract user and friend IDs from request body

 

    // Check if both user and friend exist in the database
    const user = await UserModel.findById(userId);
    const friend = await UserModel.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or Friend not found." });
    }

    // Check if a friend request already exists between the two users
    const existingRequest = await FriendModel.findOne({
      $or: [
        { user1: userId, user2: friendId },
        { user1: friendId, user2: userId },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already exists." });
    }

    // Create a new friend request
    const newRequest = new FriendModel({
      user1: userId,
      user2: friendId,
      status: "requested", // The status is 'pending' initially
    });

    // Save the new request to the database
    await newRequest.save();

    // Respond with the success message and the newly created request
    return res.status(200).json({ Message:"Send Request completed", newRequest });
  } catch (error) {
    console.error("Error in sending friend request:", error);
    return res.status(500).json({ message: "Server error." });
  }
};


export const acceptRequest = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    const user = await UserModel.findById(userId);
    const friend = await UserModel.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or Friend not found." });
    }

    const existingRequest = await FriendModel.findOneAndUpdate(
      {
        $or: [
          { user1: userId, user2: friendId },
          { user1: friendId, user2: userId },
        ],
      },
      { status: "accepted" },
      { new: true }
    );

    if (!existingRequest) {
      return res.status(404).json({ message: "Friend request not found." });
    }

    res.status(200).json({ message: "Friend request accepted.", data: existingRequest });
  } catch (error) {
    console.log("Error in accepting friend request:", error);
    res.status(500).json({ message: "Server error." });
  }
};

export const cancelRequest = async (req, res) => {
    try {
      const { userId, friendId } = req.body; // Extracting userId and friendId from the request body
  
      const requestToCancel = await FriendModel.findOneAndDelete({
        $or: [
          { user1: userId, user2: friendId },
          { user1: friendId, user2: userId },
        ],
      });
  
      if (!requestToCancel) {
        return res.status(404).json({ message: "Friend request not found." });
      }
  
      res.status(200).json({ message: "Friend request canceled successfully." });
    } catch (error) {
      console.log("Error in canceling friend request:", error);
      res.status(500).json({ message: "Server error." });
    }
  };
  

  export const unfriend = async (req, res) => {
    try {
      const { userId, friendId } = req.body; // Extract userId and friendId from request body
  
      // Check if both users exist in the database
      const user = await UserModel.findById(userId);
      const friend = await UserModel.findById(friendId);
  
      if (!user || !friend) {
        return res.status(404).json({ message: "User or Friend not found." });
      }
  
      // Find and remove the "accepted" friendship between the two users
      const friendRequest = await FriendModel.findOneAndDelete({
        $or: [
          { user1: userId, user2: friendId, status: "accepted" },  // Case 1: user1 is the current user
          { user1: friendId, user2: userId, status: "accepted" },  // Case 2: user2 is the current user
        ],
      });
  
      if (!friendRequest) {
        return res.status(404).json({ message: "No active friendship found." });
      }
  
      res.status(200).json({ message: "Friendship removed successfully." });
    } catch (error) {
      console.log("Error in unfriend request:", error);
      res.status(500).json({ message: "Server error." });
    }
  };
  

export const allMutualFriends = async (req, res) => {
    try {
      const { userId, friendId } = req.body;
     
  
      // Step 1: Find all accepted friends for both users
      const userFriends = await FriendModel.find({
        $or: [{ user1: userId }, { user2: userId }],
        status: "accepted",
      });
  
      const friendFriends = await FriendModel.find({
        $or: [{ user1: friendId }, { user2: friendId }],
        status: "accepted",
      });
  
      // Step 2: Extract friend IDs from the userFriends and friendFriends arrays
      const userFriendIds = userFriends.map((friend) =>
        friend.user1.toString() === userId ? friend.user2.toString() : friend.user1.toString()
      );
  
      const friendFriendIds = friendFriends.map((friend) =>
        friend.user1.toString() === friendId ? friend.user2.toString() : friend.user1.toString()
      );
  
      // Step 3: Find mutual friends by comparing the userFriendIds with friendFriendIds
      const mutualFriends = userFriendIds.filter((id) => friendFriendIds.includes(id));
  
      // Step 4: Respond with the list of mutual friends
      if (mutualFriends.length > 0) {
        return res.status(200).json({ mutualFriends });
      } else {
        return res.status(404).json({ message: "No mutual friends found." });
      }
  
    } catch (error) {
      console.log("Error in fetching mutual friends:", error);
      res.status(500).json({ message: "Server error." });
    }
  };
  
