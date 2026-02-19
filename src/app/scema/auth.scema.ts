import * as zod from "zod";

export const registerSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3  characters ")
      .max(40, "Name must be at most 40 characters long"),
    email: zod.email("email is invalid").nonempty("Email is required"),
    password: zod
      .string()
      .nonempty("Password is required")
      .regex(
        /^[A-Z][A-Za-z0-9]{5,}$/,
        "Password must start with an uppercase letter and be at least 6 characters long",
      ),
    rePassword: zod
      .string()
      .nonempty("Confirm Password is required")
      .regex(
        /^[A-Z][A-Za-z0-9]{5,}$/,
        "Password must start with an uppercase letter and be at least 6 characters long",
      ),

    phone: zod
      .string()
      .nonempty("Phone is required")
      .regex(/^01[0125][0-9]{8}$/, "Phone number is invalid"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    error: "Passwords do not match",
  });



  
export const loginSchema = zod.object({
  email: zod.email("email is invalid").nonempty("Email is required"),
  password: zod
    .string()
    .nonempty("Password is required")
    .regex(
      /^[A-Z][A-Za-z0-9]{5,}$/,
      "Password must start with an uppercase letter and be at least 6 characters long",
    ),
});


export const forgetPasswordSchema = zod.object({
  email: zod.email("email is invalid").nonempty("Email is required"),
 
});
export const verifyschema = zod.object({
  resetCode: zod.string("").nonempty("Reset code is required"),
 
});
export const resetschema = zod.object({
    email: zod.email("email is invalid").nonempty("Email is required"),
    newPassword: zod
      .string()
      .nonempty("Password is required")
      .regex(
        /^[A-Z][A-Za-z0-9]{5,}$/,
        "Password must start with an uppercase letter and be at least 6 characters long",
      ), 
});

export type ForgetPasswordType = zod.infer<typeof forgetPasswordSchema>;
export type VerifyCodeType = zod.infer<typeof verifyschema>;
export type ResetCodeType = zod.infer<typeof resetschema>;





export const shippingSchema = zod.object({
  city: zod.string().nonempty("City is required"),
  details: zod.string('details must be string').nonempty(" details are required"),
  phone: zod.string().regex(/^(\+2)?01[0125][0-9]{8}$/,'Enter Your Egyptian Number')
    .nonempty("Phone is required")
    .regex(/^01[0125][0-9]{8}$/, "Phone number is invalid"),
});

export type ShippingType = zod.infer<typeof shippingSchema>;