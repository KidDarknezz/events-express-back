import "dotenv/config";

import Express from "express";
import cors from "cors";
import eventsRouter from "./routes/events.js";

const PORT = process.env.PORT || 3001;

const app = Express();

app.use(Express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use("/events", eventsRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Event (POST, GET ALL, GET ONE, PUT UPDATE FULL, PATCH UPDATE PARTIAL, DELETE)
