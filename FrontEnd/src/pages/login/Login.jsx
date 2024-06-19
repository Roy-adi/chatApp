import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const Login = () => {
	const { setAuthUser } = useAuthContext();
	const navigate = useNavigate()
	const [ signupData , setSignupData ] = useState()
	const [ input , setInput ] = useState({
        username: "",
        password: "",
	})


	const loginUser = async (userData) => {
        try {
            const response = await axios.post("/api/auth/login", userData,{ withCredentials: true, });
			setSignupData(response.data)
			console.log(response.data,'success')
			localStorage.setItem("chat-user", JSON.stringify(response.data));
			setAuthUser(response.data);
            return response.data; 
        } catch (error) {
            throw error; // Throw the error for handling in the calling function
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responseData = await loginUser(input);
            console.log("log in successful:", responseData);
            navigate('/')
        } catch (error) {
            console.error("There was an error signing up:", error);
        }
    };


	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Login
					<span className='text-blue-500'> ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Username</span>
						</label>
						<input type='text' placeholder='Enter username' className='w-full input input-bordered h-10' 
						value={input.username}
						onChange={(e)=> setInput({...input, username:e.target.value})}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={input.password}
							onChange={(e)=> setInput({...input, password:e.target.value})}
						/>
					</div>
					<Link to='/signup' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
						{"Don't"} have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2'>Login</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default Login;
