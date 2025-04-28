import jwt from "jsonwebtoken";
import { BadRequestException } from "../exceptions/badRequest.js";
import { NotFoundException } from "../exceptions/notFound.js";
import { ErrorCodes } from "../exceptions/root.js";
import { prismaClient } from "../prisma.js";
import { SignUpSchema } from "../schema/user.js";
import { compareSync, hashSync } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { generateTokenAndSetCookie } from "../lib/generateToken.js";
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validatedData = SignUpSchema.parse(req.body);
  const { name, email, password } = validatedData;
  let user = await prismaClient.user.findFirst({
    where: {
      email,
    },
  });
  if (user) {
    next(
      new BadRequestException(
        "User already exist",
        ErrorCodes.USER_ALREADY_EXIST
      )
    );
    return;
  }
  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
    },
  });
  res.json(user);
};
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  console.log(email, password);
  let user = await prismaClient.user.findFirst({
    where: { email },
  });
  console.log(user);
  if (!user) {
    return next(
      new NotFoundException("User not found!", ErrorCodes.USER_NOT_FOUND)
    );
  }
  if (!compareSync(password, user.password)) {
    return next(
      new BadRequestException(
        "Invalid email or password!",
        ErrorCodes.INVALID_VALIDATION
      )
    );
  }
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  generateTokenAndSetCookie(user.id, res);
  res.send(user);
};
export const me = (req: Request, res: Response, next: NextFunction) => {
  res.json(req.user);
};
