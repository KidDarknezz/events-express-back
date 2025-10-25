import "dotenv/config";

import Express from "express";
import cors from "cors";
import eventsRouter from "./routes/events.js";

const PORT = process.env.PORT || 8080;

const app = Express();

const allowedOrigins =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://main.d3r1enjvg5wce3.amplifyapp.com";

app.use(Express.json());
app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use("/events", eventsRouter);
app.get("/", (req, res) => res.send("Server is running"));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Event (POST, GET ALL, GET ONE, PUT UPDATE FULL, PATCH UPDATE PARTIAL, DELETE)
