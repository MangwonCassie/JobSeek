import express from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import { dbConnection } from './database/dbConnection.js';
import cors from "cors";

const app = express();
dotenv.config({ path: "./config/.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173", "http://localhost:5173/", "http://127.0.0.1:5173/", "*"],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
)

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);


app.use("/api/v1/user", userRouter);

app.use("/api/v1/application", applicationRouter);

app.use("/api/v1/job", jobRouter);

dbConnection();

export default app;