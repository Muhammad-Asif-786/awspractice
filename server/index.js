import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDB.js';
import userRouter from './routes/user.route.js';

//1 == path module import for __dirname ==
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const EXPRESS_PORT = process.env.EXPRESS_PORT || 1000;

//2 == FIX __dirname (ES MODULE) ==
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// == MIDDLEWARE ==
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
    helmet({
        crossOriginResourcePolicy: false,
    })
);

// == API ROUTES ==
app.use("/api/user", userRouter);

//3 == FRONTEND SERVE ==
const clientPath = path.join(__dirname, "../client/dist");

//4 Serve static files
app.use(express.static(clientPath));

//5 React Router support
app.get("*", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
});

// ==1st DATABASE AND then 2nd SERVER START ==
connectDB()
    .then(() => {
        console.log("✅ Database connected successfully");

        app.listen(EXPRESS_PORT, () => {
            console.log(`✅ Server running on port ${EXPRESS_PORT}`);
            // console.log(`👉 http://localhost:${EXPRESS_PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Database connection failed:", err.message);
    });

