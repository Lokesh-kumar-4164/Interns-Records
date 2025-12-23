import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";
import cors from "cors";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());

import candidateRoute from "./routes/candidateRoute";

app.use("/api/candidate", candidateRoute);

const PORT = Number(process.env.PORT);

app.get("/", (_req, _res) => {
  _res.send("Inter Records API is running");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at 
         http://localhost:${PORT}`);
  });
});
