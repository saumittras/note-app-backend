import express, { Application, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { model, Schema } from "mongoose";
const app: Application = express();

app.use(express.json());

const noteSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Note = model("Note", noteSchema);

app.post("/notes/create-note", async (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);

  const note = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note: note,
    body: body,
  });
});

app.get("/notes", async (req: Request, res: Response) => {
  const note = await Note.find();

  res.status(201).json({
    success: true,
    message: "Get all Note Data successfully",
    note: note,
  });
});

app.get("/notes/:noteId", async (req: Request, res: Response) => {
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

app.patch("/notes/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const updatedBody = req.body;

  const note = await Note.findByIdAndUpdate(noteId, updatedBody, { new: true });

  res.status(201).json({
    success: true,
    message: "Note Updated successfully",
    note,
  });
});

app.delete("/notes/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const note = await Note.deleteOne({ _id: new ObjectId(noteId) });

  res.status(201).json({
    success: true,
    message: "Note data Deleted successfully",
    note: note,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Note App");
});

export default app;
