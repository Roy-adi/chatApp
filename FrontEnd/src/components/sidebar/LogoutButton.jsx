import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import axios from "axios"; // Ensure axios is imported if not already
import { useAuthContext } from "../../context/AuthContext";

const LogoutButton = () => {
    const { setAuthUser } = useAuthContext();
    const [loading, setLoading] = useState(false); // Create loading state

    const logout = async () => {
        setLoading(true); // Set loading to true when logout starts
        try {
            const response = await axios.post("http://localhost:5000/api/auth/logout");
            localStorage.removeItem("chat-user");
            setAuthUser(null);
            return response.data;
        } catch (error) {
            throw error; // Throw the error for handling in the calling function
        } finally {
            setLoading(false); // Set loading to false when logout ends
        }
    };

    return (
        <div className='mt-auto'>
            {!loading ? (
                <BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
            ) : (
                <span className='loading loading-spinner'></span>
            )}
        </div>
    );
};

export default LogoutButton;
