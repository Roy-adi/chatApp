
import axios from "axios";
import Conversation from "./Conversation";
import { useEffect, useState } from "react";

const Conversations = () => {
 const [ allusers, setAllusers ] = useState()


 const getConversations = async () => {
    try {
      const response = await axios.get("/auth/friends", {
        withCredentials: true, // Include credentials (cookies) in the request
      });
      const data = response.data;
      setAllusers(data);
      console.log(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getConversations();
  }, []);


	return (
		<div className='py-2 flex flex-col overflow-auto'>
		{
		 Array.isArray(allusers) &&	allusers?.map((user,idx) => (
                <Conversation conversation={user} key={user._id}
				lastIdx={idx === user.length - 1}
				/>
            ))
		}

		</div>
	);
};
export default Conversations;
