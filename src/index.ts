import dotenv from "dotenv";
dotenv.config();
import express from "express";
import appRouter from "./appRouter";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", appRouter);

app.listen(process.env.PORT, () =>
  console.log("listening on port: " + process.env.PORT)
);
