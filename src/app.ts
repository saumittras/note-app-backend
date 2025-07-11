import express, { Application, Request, Response } from "express";
import { notesRoutes } from "./app/controller/notes.controller";
import { usersRoutes } from "./app/controller/users.controller";
const app: Application = express();

app.use(express.json());

app.use("/notes", notesRoutes);
app.use("/users", usersRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Note App");
});
export default app;
