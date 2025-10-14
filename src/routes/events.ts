import { Router, type Request, type Response } from "express";
import type { Event } from "../types/event.types.js";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).send("GET all events");
});

router.post("/", (req: Request<{}, {}, Event>, res: Response) => {
  res.status(200).send("POST new event");
});

router
  .route("/:eventId")
  .get((req: Request, res: Response) => {
    res.status(200).send("GET single event");
  })
  .patch((req: Request<{}, {}, Event>, res: Response) => {
    res.status(200).send("PATCH update single event partial");
  })
  .put((req: Request<{}, {}, Event>, res: Response) => {
    res.status(200).send("PUT update single event full");
  });

export default router;
