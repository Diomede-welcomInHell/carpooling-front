import * as z from "zod";

export const Register = z.object({
    email:z.email(),
    password:z.string().min(3),
    password_confirmation:z.string(),
}).refine(
    (data) => data.password === data.password_confirmation,
    {
        message: "Le mot de passe ne correspond pas à la vérification",
        path: ["password_confirmation"],
    }
);

type Register = z.infer<typeof Register>;