import { z } from "zod";

export const SignUpSchema = z.object({
  name: z.string().min(2, "name must atleast 2 characters"),
  email: z.string().email(),
  password: z.string().min(6, "password must atleast 6 characters"),
});
