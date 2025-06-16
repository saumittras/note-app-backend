interface INotes {
  //   {
  //     title: { type: String, required: true, trim: true },
  //     content: { type: String, defaultg: "" },
  //     category: {
  //       type: String,
  //       enum: ["personal", "work", "study", "other"],
  //       default: "personal",
  //     },
  //     pinned: {
  //       type: Boolean,
  //       default: false,
  //     },
  //     tags: {
  //       label: { type: String, required: true },
  //       color: { type: String, default: "gray" },
  //     },
  //   },
  title: string;
  content?: string;
  category?: "personal" | "work" | "study" | "other";
  pinned?: boolean;
  tags: {
    label: string;
    color?: string;
  };
}
