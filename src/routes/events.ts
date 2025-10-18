import { Router, type Request, type Response } from "express";
import type { Event } from "../types/event.types.js";

import { pool } from "../db.js";

import pkg from "lodash";
const { snakeCase } = pkg;

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
  const {
    name,
    dateTime,
    isPublic,
    createdBy,
    flyer,
    description,
    address,
    placeName,
    lat,
    lng,
  } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO events (name, date_time, is_public, created_by, flyer, description, address, place_name, lat, lng) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [
        name,
        dateTime,
        isPublic,
        createdBy,
        flyer,
        description,
        address,
        placeName,
        lat,
        lng,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router
  .route("/:eventId")
  .get(async (req: Request<{ eventId: string }>, res: Response) => {
    const eventId = parseInt(req.params.eventId, 10);
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
  .patch(async (req: Request<{ eventId: string }>, res: Response) => {
    const eventId = parseInt(req.params.eventId, 10);
    let data = req.body;
    data = toSnakeCase(data);
    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: "No fields provided for update" });
    }
    const fields = Object.keys(data);
    const values = Object.values(data);
    const setClause = fields
      .map((field, i) => `${field} = $${i + 1}`)
      .join(", ");
    const query = `
      UPDATE events
      SET ${setClause}
      WHERE id = $${fields.length + 1}
      RETURNING *;
    `;
    try {
      const result = await pool.query(query, [...values, eventId]);
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Event not found" });
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  })
  .put((req: Request<{ eventId: string }>, res: Response) => {
    res.status(200).send("PUT update single event full");
  });

function toSnakeCase(obj: Record<string, any>) {
  const newObj: Record<string, any> = {};
  for (const key in obj) {
    newObj[snakeCase(key)] = obj[key];
  }
  return newObj;
}

export default router;
