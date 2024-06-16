import Friendship from "../models/FriendShip.modal.js";
import Notification from "../models/Notification.model.js";
import User from "../models/User.model.js";


export const sendFriendRequest = async (req, res) => {
    try {
        const senderId = req.user._id; // Extracted from middleware
        const { friendId } = req.body; // Single friend ID to send request

        // Ensure friendId is provided
        if (!friendId) {
            return res.status(400).json({ error: 'friendId is required' });
        }

            // Check if friendId is already in the friendIds array of the senderId
            const friendship = await Friendship.findOne({ userId: senderId });

            if (friendship && friendship.friendIds.includes(friendId)) {
                return res.status(400).json({ error: 'Friend request already sent or user is already a friend' });
            }

        // Create a new notification for the friend request
        const notification = new Notification({ senderId, receiverId: friendId });
        await notification.save();

        res.status(200).json({ message: 'Friend request sent successfully' });
    } catch (error) {
        console.error('Error in sendFriendRequest:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};



export const getFriendRequests = async (req, res) => {
    try {
        const receiverId = req.user._id; // Extracted from middleware

        const notifications = await Notification.find({ receiverId, status: 'pending' }).populate('senderId', 'username fullName profilePic');

        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error in getFriendRequests:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const acceptFriendRequest = async (req, res) => {
    try {
        const receiverId = req.user._id; // Extracted from middleware
        const { senderId } = req.body; // Use senderId as notificationId

        // Ensure senderId is provided
        if (!senderId) {
            return res.status(400).json({ error: 'senderId is required' });
        }

        // Find the notification by senderId
        const notification = await Notification.findOne({ senderId });

        // Check if notification exists and is pending
     

        // Find or create Friendship document for senderId
        let friendshipSender = await Friendship.findOne({ userId: senderId });

        if (!friendshipSender) {
            // Create new Friendship document if none exists for senderId
            friendshipSender = new Friendship({ userId: senderId, friendIds: [receiverId] });
        } else {
            // Update existing Friendship document for senderId
            if (!friendshipSender.friendIds.includes(receiverId)) {
                friendshipSender.friendIds.push(receiverId);
            }
        }

        // Save the updated or new Friendship document for senderId
        await friendshipSender.save();

        // Find or create Friendship document for receiverId
        let friendshipReceiver = await Friendship.findOne({ userId: receiverId });

        if (!friendshipReceiver) {
            // Create new Friendship document if none exists for receiverId
            friendshipReceiver = new Friendship({ userId: receiverId, friendIds: [senderId] });
        } else {
            // Update existing Friendship document for receiverId
            if (!friendshipReceiver.friendIds.includes(senderId)) {
                friendshipReceiver.friendIds.push(senderId);
            }
        }

        // Save the updated or new Friendship document for receiverId
        await friendshipReceiver.save();

        // Update notification status to accepted
        notification.status = 'accepted';
        await notification.save();

        // Respond with success message
        res.status(200).json({ message: 'Friend request accepted successfully' });

    } catch (error) {
        console.error('Error in acceptFriendRequest:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};





export const getFriends = async (req, res) => {
    try {
        const userId = req.user._id; // Extracted from middleware
  
        const friendship = await Friendship.findOne({ userId }).populate('friendIds', '-password');
        if (!friendship) {
            return res.status(404).json({ error: 'No friends found for this user' });
        }
  
        res.status(200).json(friendship.friendIds);
    } catch (error) {
        console.error('Error in getFriends:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
  };


  export const searchFriend = async (req, res) => {
    const { keyword_search } = req.body;
  
    if (!keyword_search) {
      return res.status(400).json({ message: 'Search keyword is required' });
    }
  
    try {
      const users = await User.find({
        $or: [
          { fullName: { $regex: keyword_search, $options: 'i' } },
          { username: { $regex: keyword_search, $options: 'i' } }
        ]
      }).select('fullName username profilePic');
  
      if (users.length === 0) {
        return res.status(404).json({ message: 'No users found' });
      }
  
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  };
  