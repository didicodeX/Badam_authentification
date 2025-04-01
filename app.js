import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import routes from "./src/routes/index.js";

const app = express();

// middleware
app.use(express.json()); 
app.use(cookieParser()); // gere les cookies

app.use(cors({
  origin: "*", // qui a acces a l'api
  credentials: true // autoriser les cookies
}))

//loalhost:3000/
app.use("/", routes);

export default app;
