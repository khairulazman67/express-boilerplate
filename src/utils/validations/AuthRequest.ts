import { z } from "zod";

export const createUsersSchema = z.object({
  email: z.string().email({
    message: "Harus berupa format email",
  }),
  password: z.coerce.string({
    required_error: "Password wajib diisi",
  }),
});

export const loginSchema = z.object({
  email: z.string().email({
    message: "Harus berupa format email",
  }),
  password: z.coerce.string({
    required_error: "Password wajib diisi",
  }),
});

export const refreshTokenSchema = z.object({
  refresh_token: z.string({
    required_error: "refresh_token wajib diisi",
  }),
});

export type createUsersPayload = z.infer<typeof createUsersSchema>;
export type loginPayload = z.infer<typeof loginSchema>;
