import dotenv from "dotenv";
dotenv.config();
import express from "express";
import appRouter from "./appRouter";
import cors from "cors";

const app = express();

app.use(express.json());

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use("/api/v1", appRouter);

app.listen(process.env.PORT, () =>
  console.log("listening on port: " + process.env.PORT)
);
