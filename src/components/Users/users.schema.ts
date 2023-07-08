import z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Ingresa un correo válido"),
  password: z
    .string()
    .min(8, { message: "La contraseña debe ser de al menos 8 caracteres" }),
});
export type LoginPayload = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  email: z.string().email("Ingresa un correo válido"),
  password: z
    .string()
    .min(8, { message: "La contraseña debe ser de al menos 8 caracteres" }),
  passwordConfirm: z.string().nonempty("Este campo no puede estar vacío"),
  role: z.enum(["regular", "admin"]),
});
export type SignupPayload = z.infer<typeof signupSchema>