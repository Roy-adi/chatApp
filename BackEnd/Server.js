import express from "express";
import dotenv from 'dotenv'
import cors from "cors"
import cookieParser from "cookie-parser"
import connectToMongoDB from "./Db/ConnectDb.js";
import { app , server} from './socket/socket.js'

// const app = express();

process.setMaxListeners(15);
app.use(cors({
	origin: 'http://localhost:3000', 
	credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser());

dotenv.config();


import AuthRoutes from "./Routes/AuthRoute.js";
import MessageRoute from "./Routes/MessageRoute.js";

app.use("/api/auth", AuthRoutes);
app.use("/api/messages", MessageRoute);



const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});