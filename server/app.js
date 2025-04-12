import dotenv from "dotenv";
dotenv.config();

/**
 *
 * Importing Packages
 *
 */
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

/**
 *
 * Importing Files
 *
 */
import connectDb from "./utils/connectDb.js";
import userRouter from "./routers/userRouter.js";

const app = express();

/**
 *
 * Setting Middlewares
 *
 */
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

const PORT = 3000 || process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello");
});

//! Authentication API
app.use("/api/auth", userRouter);

app.listen(PORT, () => {
  console.log(`App listening to http://localhost:${PORT}`);
  connectDb();
});

/*
const regex = /^Hello World$/i;

// Test the string
const testString = "helLo WoRld";

if (regex.test(testString)) {
  console.log("Match found!");
} else {
  console.log("No match!");
}
*/
