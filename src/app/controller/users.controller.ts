import express, { Request, Response } from "express";
import { z } from "zod";
import { User } from "../model/user.model";

export const usersRoutes = express.Router();
const CreateUserZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  age: z.number(),
  password: z.string(),
  role: z.string().optional(),
  address: z.object({
    city: z.string(),
    street: z.string(),
    zip: z.number(),
  }),
});

usersRoutes.post("/create-user", async (req: Request, res: Response) => {
  try {
    // const newUser = await CreateUserZodSchema.parseAsync(req.body);
    // const body = req.body;
    // const newUser = await User.create(body);
    // const password = await bcrypt.hash(newUser.password, 10);
    // console.log(password);

    /**
     * const user = new User(body)
     * await user.save()
     *
     */

    // const passwoard = await bcrypt.hash(body.password, 10);
    // console.log(passwoard);
    // body.passward = passwoard;

    // built it ant custom instance methods
    const body = req.body;
    // const user = new User(body);
    // const passward = await user.hashPassword(body.password);
    // user.password = passward;
    // await user.save();

    // built in and custom static methodes
    body.password = await User.hashPassword(body.password);
    const user = await User.create(body);

    res.status(201).json({
      success: true,
      message: "New User created successfully",
      newUser: user,
    });
  } catch (error: any) {
    res.status(201).json({
      success: true,
      message: error.message,
      error,
    });
  }
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
