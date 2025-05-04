import { NextFunction, Request, Response } from "express";
import path from "path";
import { compareSync, hashSync } from "bcrypt";

import { BadRequestException } from "../exceptions/badRequest.js";
import { NotFoundException } from "../exceptions/notFound.js";
import { ErrorCodes } from "../exceptions/root.js";
import { prismaClient } from "../prisma.js";
import { SignUpSchema } from "../schema/user.js";
import { generateTokenAndSetCookie } from "../lib/generateToken.js";
import {
  sendResetPasswordEmail,
  sendVerificationEmail,
} from "../lib/sendVerificationEmail.js";
// At the top of your file
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
  //send email verification
  sendVerificationEmail({ email, id: user.id }, res);
  //res.json(user);
};
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  let user = await prismaClient.user.findFirst({
    where: { email },
  });
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
  if (!user.isVarified) {
    return next(
      new BadRequestException(
        "you account is not verified! please check you inbox",
        ErrorCodes.UnAUTHORIZED
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
export const logOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out Successfully" });
};
export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uniqueString, userId } = req.params;
  const verification = await prismaClient.userVerification.findFirst({
    where: { userId },
  });
  if (!verification) {
    const message = "Verification record not found for the user.";
    return res.redirect(
      `/api/verified?error=true&message=${encodeURIComponent(message)}`
    );
  }
  const { expiresAt } = verification;
  if (expiresAt < new Date(Date.now())) {
    await prismaClient.userVerification.delete({
      where: { id: verification.id },
    });
    await prismaClient.user.delete({
      where: { id: userId },
    });
    const message = "The verification link has expired. Please sign up again.";
    return res.redirect(
      `/api/verified?error=true&message=${encodeURIComponent(message)}`
    );
  }
  if (uniqueString === verification.uniqueString) {
    await prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        isVarified: true,
      },
    });
    await prismaClient.userVerification.delete({
      where: {
        id: verification.id,
      },
    });
    const message = "Your email has been successfully verified! Log in now.";
    return res.redirect(
      `/api/verified?success=true&message=${encodeURIComponent(message)}`
    );
  }
  const message = "Invalid verification link. Please try again.";
  return res.redirect(
    `/api/verified?success=true&message=${encodeURIComponent(message)}`
  );
};
export const getStatus = async (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../src/views/verified.html"));
};
export const resetPasswordRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, redirectUrl } = req.body;
  console.log(email);
  try {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      return next(
        new BadRequestException(
          "No user exist with this email sign up!",
          ErrorCodes.USER_NOT_FOUND
        )
      );
    }
    if (!user.isVarified) {
      console.log("not verified");
      return next(
        new BadRequestException(
          "Your account has not been verified please check your mail box",
          ErrorCodes.UnAUTHORIZED
        )
      );
    }
    sendResetPasswordEmail(user, redirectUrl, res);
  } catch (error) {
    next(error);
  }
};
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, resetString, newPassword } = req.body;
  const passwordReset = await prismaClient.resetPassword.findFirst({
    where: {
      userId,
    },
  });
  if (!passwordReset) {
    return next(
      new BadRequestException(
        "No password reset request found!",
        ErrorCodes.UnAUTHORIZED
      )
    );
  }
  if (passwordReset.expiresAt < new Date(Date.now())) {
    return next(
      new BadRequestException(
        "Your password reset link expired please try again.",
        ErrorCodes.UnAUTHORIZED
      )
    );
  }
  if (passwordReset.resetString !== resetString) {
    return next(
      new BadRequestException(
        "Invalid reset link please try again.",
        ErrorCodes.UnAUTHORIZED
      )
    );
  }
  await prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashSync(newPassword, 10),
    },
  });
  await prismaClient.resetPassword.deleteMany({
    where: {
      userId,
    },
  });
  res.status(200).json({
    success: true,
    message: "Password has been reseted successfully!",
  });
};
