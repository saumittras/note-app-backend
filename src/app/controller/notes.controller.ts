import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { Note } from "../model/notes.model";

export const notesRoutes = express.Router();

notesRoutes.post("/create-note", async (req: Request, res: Response) => {
  const body = req.body;
  const note = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note: note,
  });
});

notesRoutes.get("/", async (req: Request, res: Response) => {
  const note = await Note.find();

  res.status(201).json({
    success: true,
    message: "Get all Note Data successfully",
    note: note,
  });
});

notesRoutes.get("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const note = await Note.findById(noteId);
  let message;
  if (note === null) {
    message = "Note data not found";
  } else {
    message = "Note Data get successfully";
  }
  res.status(201).json({
    success: true,
    message: message,
    note: note,
  });
});

notesRoutes.patch("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const updatedBody = req.body;

  const note = await Note.findByIdAndUpdate(noteId, updatedBody, { new: true });

  res.status(201).json({
    success: true,
    message: "Note Updated successfully",
    note,
  });
});

notesRoutes.delete("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const note = await Note.deleteOne({ _id: new ObjectId(noteId) });

  res.status(201).json({
    success: true,
    message: "Note data Deleted successfully",
    note: note,
  });
});
