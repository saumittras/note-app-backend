import express, { Request, Response } from "express";
import { User } from "../model/user.model";

export const usersRoutes = express.Router();

usersRoutes.post("/create-user", async (req: Request, res: Response) => {
  const newUser = req.body;
  const user = await User.create(newUser);

  res.status(201).json({
    success: true,
    message: "New User created successfully",
    note: user,
  });
});
usersRoutes.get("/", async (req: Request, res: Response) => {
  const users = await User.find();

  res.status(201).json({
    success: true,
    message: "All User parsed successfully",
    user: users,
  });
});
usersRoutes.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  let message;
  if (user === null) {
    message = "Note data not found";
  } else {
    message = "Note Data get successfully";
  }
  res.status(201).json({
    success: true,
    message: message,
    user: user,
  });
});
usersRoutes.patch("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const updatedUser = req.body;
  const user = await User.findByIdAndUpdate(userId, updatedUser, { new: true });

  res.status(201).json({
    success: true,
    message: "User Updated Successfully",
    user: user,
  });
});
usersRoutes.delete("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findByIdAndDelete(userId);

  res.status(201).json({
    success: true,
    message: "User Deleted Successfully",
    user: user,
  });
});
