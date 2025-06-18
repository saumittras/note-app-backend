import { model, Schema } from "mongoose";

const noteSchema = new Schema<any>(
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
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Note = model<any>("Note", noteSchema);
