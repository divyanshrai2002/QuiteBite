import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";

// Initialize express
const app = express();

// Load environment variables from .env file
dotenv.config({ path: "./config/config.env" });

// Log environment variables for debugging
console.log("Environment Variables:", process.env);

// Set up CORS
app.use(
  cors({
    origin: ['https://quitebite-frontend.onrender.com'],
    methods: ["POST"],
    credentials: true,
  })
);

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use("/api/v1/reservation", reservationRouter);
app.get("/", (req, res, next)=>{return res.status(200).json({
  success: true,
  message: "HELLO WORLD AGAIN"
})})

// Connect to the database
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

export default app;
