import { useState } from "react";
import axios from "axios"; // Importing axios
import { FaTimes, FaUserPlus, FaBell } from "react-icons/fa"; // Importing Font Awesome icon
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);

  const handleSearchFriendClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSearchTerm("");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Call API with the search term
    searchFriends(e.target.value);
  };

  const searchFriends = async (query) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/searchFriend",
        {
          keyword_search: query,
        },
        { withCredentials: true }
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching friends:", error);
    }
  };

  const handleAddFriend = async (friendId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/send-friend-request",
        {
          friendId: friendId,
        },
        { withCredentials: true }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error sending friend request:", error);
      alert("Failed to send friend request.");
    }
  };

  const handleNotificationClick = async () => {
    setIsNotificationModalOpen(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/friend-requests",
        { withCredentials: true }
      );
      setFriendRequests(response.data);
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  };

  const handleAcceptRequest = async (senderId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/accept-friend-request",
        {
          senderId: senderId,
        },
        { withCredentials: true }
      );
      alert(response.data.message);
      // Refresh the friend requests list after accepting a request
      handleNotificationClick();
    } catch (error) {
      console.error("Error accepting friend request:", error);
      alert("Failed to accept friend request.");
    }
  };

  const handleCloseNotificationModal = () => {
    setIsNotificationModalOpen(false);
  };

  return (
    <div className="sidebar border-r border-slate-500 p-4 flex flex-col md:w-1/5 w-full">
			<SearchInput />
			<button
				onClick={handleSearchFriendClick}
				className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
			>
				Search Friend
			</button>
			<div className="divider px-3"></div>
			<Conversations />
			<div className="mt-4 flex justify-between items-center">
				<LogoutButton />
				<button
					onClick={handleNotificationClick}
					className="ml-4 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition flex items-center"
				>
					<FaBell className="w-4 h-4 mr-2" />
				</button>
			</div>
			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
					<div className="bg-white p-6 rounded-lg w-11/12 md:w-1/3 relative">
						<button
							onClick={handleCloseModal}
							className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition"
						>
							<FaTimes className="w-5 h-5" />
						</button>
						<h2 className="text-xl font-semibold mb-4">Search for Friends</h2>
						<input
							type="text"
							value={searchTerm}
							onChange={handleSearchChange}
							placeholder="Type a name..."
							className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<ul className="max-h-60 overflow-y-auto">
							{searchResults.length > 0 ? (
								searchResults.map((result) => (
									<li
										key={result._id}
										className="flex items-center justify-between mb-2 p-2 hover:bg-gray-100 rounded transition"
									>
										<div className="flex items-center">
											<img
												src={result.profilePic}
												alt={result.fullName}
												className="w-8 h-8 rounded-full mr-2"
											/>
											<span>{result.fullName}</span>
										</div>
										<button
											onClick={() => handleAddFriend(result._id)}
											className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
										>
											<FaUserPlus className="w-4 h-4" />
										</button>
									</li>
								))
							) : (
								<p className="text-gray-500">No results found</p>
							)}
						</ul>
					</div>
				</div>
			)}

			{isNotificationModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
					<div className="bg-white p-6 rounded-lg w-11/12 md:w-1/3 relative">
						<button
							onClick={handleCloseNotificationModal}
							className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition"
						>
							<FaTimes className="w-5 h-5" />
						</button>
						<h2 className="text-xl font-semibold mb-4">Friend Requests</h2>
						<ul className="max-h-60 overflow-y-auto">
							{friendRequests.length > 0 ? (
								friendRequests.map((request) => (
									<li
										key={request._id}
										className="flex items-center justify-between mb-2 p-2 hover:bg-gray-100 rounded transition"
									>
										<div className="flex items-center">
											<img
												src={request.senderId.profilePic}
												alt={request.senderId.fullName}
												className="w-8 h-8 rounded-full mr-2"
											/>
											<span>{request.senderId.fullName}</span>
										</div>
										<button
											onClick={() => handleAcceptRequest(request.senderId._id)}
											className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
										>
											Accept Request
										</button>
									</li>
								))
							) : (
								<p className="text-gray-500">No friend requests found</p>
							)}
						</ul>
					</div>
				</div>
			)}
		</div>
  );
};

export default Sidebar;
