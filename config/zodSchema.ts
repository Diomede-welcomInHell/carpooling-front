import * as z from "zod";

export const Register = z.object({
    email: z.email({ message: "L'adresse email est invalide" }),
    password: z
        .string()
        .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
        .regex(/[a-z]/, { message: "Le mot de passe doit contenir au moins une lettre minuscule" })
        .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une lettre majuscule" })
        .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre" }),
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

export const CarData = z.object({
    model: z.string("Ecrivez le nom du modèle").max(120, "Vous avez dépassez le nombre de caractères autorisés"),
    brand: z.string("Sélectionner la marque").max(120, "Vous avez dépassez le nombre de caractères autorisés"),
    seats : z.coerce.number().int().min(1).max(10),
    carRegistration : z.string().regex(/^[A-Z]{2}-\d{3}-[A-Z]{2}$/,
        "Format invalide (ex: AB-123-CD)")
})

type CarData = z.infer<typeof CarData>;


export const TripParams = z.object({
    startingcity: z.string()
        .max(100, "Vous avez dépassé le nombre de caractères autorisés")
        .regex(/^[a-zA-ZÀ-ÿ\s\-]+$/, "La ville ne peut contenir que des lettres")
        .nullable()
    .optional(),
    arrivalcity: z.string()
        .max(100, "Vous avez dépassé le nombre de caractères autorisés")
        .regex(/^[a-zA-ZÀ-ÿ\s\-]+$/, "La ville ne peut contenir que des lettres")
        .nullable()
        .optional(),
    tripdate: z.string()
        .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/, "La date doit être au format yyyy-MM-dd HH:mm")
        .nullable()
        .optional()
})

type TripParams = z.infer<typeof TripParams>;



export const AddressSchema = z.object({
    street_name: z
        .string({ error: "Le nom de la rue est requis" })
        .max(150, "Le nom de la rue est trop long")
        .regex(/^[a-zA-ZÀ-ÿ0-9\s\-]+$/, "Le nom de la rue ne peut contenir que des lettres et chiffres"),
    postal_code: z
        .string({ error: "Le code postal est requis" })
        .regex(/^\d{5}$/, "Le code postal doit contenir 5 chiffres"),
    city_name: z
        .string({ error: "Le nom de la ville est requis" })
        .max(100, "Le nom de la ville est trop long")
        .regex(/^[a-zA-ZÀ-ÿ\s\-]+$/, "La ville ne peut contenir que des lettres"),
});

type AddressSchema = z.infer<typeof AddressSchema>;

export const TripCreateParams = z.object({
    km: z
        .coerce.number({ error: "La distance est requise" })
        .positive("La distance doit être positive")
        .max(10000, "La distance semble incorrecte"),
    person_id: z
        .coerce.number({ error: "L'identifiant du conducteur est requis" })
        .int("L'identifiant doit être un entier")
        .positive("L'identifiant doit être positif"),
    trip_datetime: z
        .string({ error: "La date du trajet est requise" })
        .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/, "La date doit être au format yyyy-MM-dd HH:mm"),
    available_seats: z
        .coerce.number({ error: "Le nombre de places est requis" })
        .int("Le nombre de places doit être un entier")
        .min(1, "Il doit y avoir au moins 1 place disponible")
        .max(9, "Le nombre de places ne peut pas dépasser 9"),
    starting_address: AddressSchema,
    arrival_address: AddressSchema,
});

type TripCreateParams = z.infer<typeof TripCreateParams>;


const TripSchema = z.object({
    arrival_address: AddressSchema,
    available_seats: z.number(),
    car: z.object({ brand: z.string(), model: z.string() }),
    driver: z.object({
        email: z.string(),
        firstname: z.string(),
        idUser: z.number().nullable(),
        lastname: z.string(),
    }),
    idAdresse: z.number().nullable(),
    idTrip: z.number(),
    km: z.number(),
    starting_address: AddressSchema,
    trip_datetime: z.string(),
});

// ✅ Le type TypeScript est inféré automatiquement depuis le schéma Zod
export type Trip = z.infer<typeof TripSchema>;
export { TripSchema };


const PersonInfoSchema = z.object({
    idPerson: z.number(),
    idUser: z.number().nullable(),
    idCar: z.number().nullable(),
    firstname: z.string(),
    lastname: z.string(),
    email: z.string(),
    phone: z.string(),
    status: z.string().nullable(),
});
export type Person = z.infer<typeof PersonInfoSchema>;
export { PersonInfoSchema}


const BookingSchema = z.object({
    cancel: z.boolean(),
    idBooking: z.number(),
    date_booking: z.string(),
    user_info: PersonInfoSchema,
});
export type Booking = z.infer<typeof BookingSchema>;
export { BookingSchema };

const TripFullSchema = z.object({
    id_trip: z.number(),
    km: z.number(),
    available_seats: z.number(),
    trip_datetime: z.string(),
    starting_address: AddressSchema,
    arrival_address: AddressSchema,

    car_info: z.object({
        idCar: z.number(),
        idUser: z.number(),
        brand: z.string(),
        model: z.string(),
        registration: z.string(),
        seats: z.number(),
    }),

    driver_info: PersonInfoSchema,

    driver_id: z.number(),
    all_booking: z.array(BookingSchema).optional().nullable(),
});

export type TripFull = z.infer<typeof TripFullSchema>;
export { TripFullSchema };


