import express, { json } from "express";
import cors from "cors";
import "dotenv/config";
import { v1 } from "./routes";

const app = express();

app.use(cors());
app.use(json());

app.use(v1);

export { app };
