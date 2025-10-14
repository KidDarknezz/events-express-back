import { Router, type Request, type Response } from "express";
import type { Event } from "../types/event.types.js";

import { pool } from "../db.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM events;");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req: Request<{}, {}, Event>, res: Response) => {
  const { name, dateTime, isPublic } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO events (name, date_time, is_public) VALUES ($1, $2, $3) RETURNING *",
      [name, dateTime, isPublic]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router
  .route("/:eventId")
  .get(async (req: Request, res: Response) => {
    const { eventId } = req.params;
    try {
      const result = await pool.query(
        `SELECT * FROM events WHERE id = ${eventId};`
      );
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  })
  .patch((req: Request<{}, {}, Event>, res: Response) => {
    res.status(200).send("PATCH update single event partial");
  })
  .put((req: Request<{}, {}, Event>, res: Response) => {
    res.status(200).send("PUT update single event full");
  });

export default router;
