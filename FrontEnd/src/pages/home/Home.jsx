import { useState } from "react";
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {




	return (
		<div className='flex flex-col md:flex-row w-full h-full p-2 m-2 rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebar className="sidebar md:w-1/5 w-full" />
			<MessageContainer className="message-container w-full" />
		</div>
	);
};
export default Home;
