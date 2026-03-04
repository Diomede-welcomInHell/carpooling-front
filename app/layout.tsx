import type {Metadata} from "next";
import MainHeader from "@/components/main-header";

export const metadata: Metadata = {
    title: "Covoiturage",
    description: "Application pour connecter les stagiaire du GRETA entre-eux",
};

export default function AuthLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
        <body>
        {children}
        </body>
        </html>
    );
}