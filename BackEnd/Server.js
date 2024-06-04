import express from "express";
import dotenv from 'dotenv'
import cors from "cors"
import cookieParser from "cookie-parser"
import connectToMongoDB from "./Db/ConnectDb.js";
const app = express();
process.setMaxListeners(15);
app.use(cors({
    
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

dotenv.config();


import AuthRoutes from "./Routes/AuthRoute.js";


app.use("/api/auth", AuthRoutes);



const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});