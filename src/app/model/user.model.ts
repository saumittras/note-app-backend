// import { bcrypt } from "bcryptjs";
import { model, Schema } from "mongoose";
import validator from "validator";
import {
  IAddress,
  IUser,
  UserInstanceMethods,
  UserStaticsMethods,
} from "./../interfaces/user.interface";

import bcrypt from "bcryptjs";

const addressSchema = new Schema<IAddress>(
  {
    city: { type: String },
    street: { type: String },
    zip: { type: Number },
  },
  {
    _id: false,
  }
);

// const userSchema = new Schema<IUser, Model<IUser>, UserInstanceMethods>(
const userSchema = new Schema<IUser, UserStaticsMethods, UserInstanceMethods>(
  {
    firstName: {
      type: String,
      required: [true, "first name requred"],
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      max: [60, "Age is out of range, you enter {VALUE}"],
      min: [18, "Age is bellow 18, you entered {VALUE}"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "The {VALUE} email address already used"],
      // validate: {
      //   validator: function (value) {
      //     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      //   },
      //   message: function (props) {
      //     return `Email ${props.value} is not valid`;
      //   },
      // },
      validate: [validator.isEmail, "Email is not ok {VALUE}"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    address: { type: addressSchema },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.method("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});
userSchema.static("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});

// export const User = model<IUser, Model<IUser, {}, UserInstanceMethods>>(
//   "User",
//   userSchema
// );
export const User = model<IUser, UserStaticsMethods>("User", userSchema);
