import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";
import cors from "cors";
dotenv.config();
import { Request, Response } from "express";

const app = express();

app.use(cors());
app.use(express.json());

import candidateRoute from "./routes/candidateRoute";
import adminRoute from "./routes/adminRoutes"

app.use("/api/candidate", candidateRoute);
app.use("/api/admin",adminRoute)

const PORT = Number(process.env.PORT);

app.get("/", (_req: Request, _res: Response) => {
  _res.send("Inter Records API is running");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at 
         http://localhost:${PORT}`);
  });
});
