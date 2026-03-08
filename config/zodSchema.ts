import * as z from "zod";

export const Register = z.object({
    email: z.email(),
    password: z.string().min(3),
    password_confirmation: z.string(),
}).refine(
    (data) => data.password === data.password_confirmation,
    {
        message: "Le mot de passe ne correspond pas à la vérification",
        path: ["password_confirmation"],
    }
);

type Register = z.infer<typeof Register>;

export const ProfilData = z.object({
    firstname: z.string("Ecrivez votre prénom").max(120, "Vous avez dépassez le nombre de caractères autorisés"),
    lastname: z.string("Ecrivez votre nom de famille").max(120, "Vous avez dépassez le nombre de caractères autorisés"),
    phone: z.string().regex(
        /^(?:\+33|0)[1-9](?:[\s.-]?\d{2}){4}$/,
        "Numéro de téléphone invalide")
})

type ProfilData = z.infer<typeof ProfilData>;