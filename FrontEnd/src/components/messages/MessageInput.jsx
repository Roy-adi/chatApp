import axios from 'axios';
import { BsSend } from "react-icons/bs";
import useConversation from "../../zustand/useConversation";
import { useState } from "react";

const MessageInput = () => {

	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();
    const [messageInput, setMessageInput] = useState("");

	const sendMessage = async (messageinput) => {
		setLoading(true);
		try {
			const res = await axios.post(
				`http://localhost:5000/api/messages/send/${selectedConversation._id}`,
				{
					message: messageinput
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
					withCredentials: true  // Include cookies in the request
				}
			);
			const data = res.data;
			if (data.error) throw new Error(data.error);
	
			setMessages([...messages, data]);
		} catch (error) {
			console.log(error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async(e) => {
		e.preventDefault();
		if (!messageInput) return;
		await sendMessage(messageInput)
		setMessageInput("");
	};


	return (
		<form className='px-4 my-3' onSubmit={handleSubmit}>
		<div className='flex items-center'>
			<input
				type='text'
				className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
				placeholder='Send a message'
				value={messageInput}
				onChange={(e) => setMessageInput(e.target.value)}
			/>
			<button type='submit' className='ml-2 flex items-center justify-center p-2.5 bg-blue-500 text-white rounded-lg'>
				{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
			</button>
		</div>
	</form>
	);
};
export default MessageInput;
