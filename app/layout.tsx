import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Covoiturage",
    description: "Application pour connecter les stagiaire du GRETA entre-eux",
};

export default function RootLayout({
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