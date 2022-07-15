import express, { json, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { v1 } from "./routes";

const app = express();

app.use(cors());
app.use(json());

app.use(v1);

app.get("/me", (_, response: Response) => {
    return response.json({ msg: "ok" });
});

export { app };
