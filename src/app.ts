import cors from "cors";
import eventsRouter from "./routes/events.js";
import express from "express";

const app = express();

const allowedOrigins =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://main.d3r1enjvg5wce3.amplifyapp.com";

app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use("/events", eventsRouter);
app.get("/", (req, res) => res.send("Server is running"));

export default app;
