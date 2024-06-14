import MessageSkeleton from "../skeletons/MessageSkeleton"; 
import axios from "axios";
import useConversation from "../../zustand/useConversation";
import Message from "./Message";
import { useEffect, useRef, useState } from "react";
import useListenMessages from '../../hooks/useListenMessages';


const Messages = () => {
	const [loading, setLoading] = useState(false);
	const [allmessages , setAllMessages] = useState();
	const { messages, setMessages, selectedConversation } = useConversation();

	useListenMessages()

	const getMessages = async () => {
		setLoading(true);
		try {
			const res = await axios.get(`/api/messages/${selectedConversation._id}`, {
				withCredentials: true  // Include cookies in the request if needed
			});
			const data = res.data;
			if (data.error) throw new Error(data.error);
			setMessages(data);
			setAllMessages(data)
		} catch (error) {
			console.log(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages]);

	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);


	return (
		<div className='px-4 flex-1 overflow-auto'>
			{!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}

			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
		</div>
	);
};
export default Messages;
