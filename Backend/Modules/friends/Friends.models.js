import mongoose from "mongoose";

const friendSchema = new mongoose.Schema(
  {
    user1: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // First user
    user2: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Second user

    status: {
      type: String,
      enum: ["requested", "accepted", "cancelled"],
      default: "requested", // Default status is 'requested'
    },

    isMutualFriend: {
      type: Boolean,
      default: false, // Initially false, set to true if both users accept
    },
  },
  { timestamps: true }
);

// Create a Mongoose model based on the friend schema
const FriendModel = mongoose.model("Friend", friendSchema);

export default FriendModel;
