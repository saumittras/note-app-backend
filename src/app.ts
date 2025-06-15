import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";
const app: Application = express();

app.use(express.json());
const noteSchema = new Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, defaultg: "" },
  category: {
    type: String,
    enum: ["personal", "work", "study", "other"],
    default: "personal",
  },
  pinned: {
    type: Boolean,
    default: false,
  },
  tags: {
    label: { type: String, required: true },
    color: { type: String, default: "gray" },
  },
});

const Note = model("Note", noteSchema);

app.post("/notes/create-note", async (req: Request, res: Response) => {
  const body = req.body;
  // Approch no- 1
  // const myNote = new Note({
  //   title: "Learnning Nest.js",
  //   content: "I am learning mongoose and other",
  //   tags: {
  //     label: "Nothing ",
  //   },
  // });

  // await myNote.save();

  // Approch no 2

  const note = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note: note,
  });
});

app.get("/notes", async (req: Request, res: Response) => {
  const note = await Note.find();

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note: note,
  });
});

app.get("/notes/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const note = await Note.findById(noteId);

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note: note,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Note App");
});

export default app;
