import "dotenv/config";

import Express from "express";
import eventsRouter from "./routes/events.js";

const app = Express();
app.use(Express.json());

const PORT = process.env.PORT || 3000;

app.use("/events", eventsRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Event (POST, GET ALL, GET ONE, PUT UPDATE FULL, PATCH UPDATE PARTIAL, DELETE)
