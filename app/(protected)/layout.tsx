import type { Metadata } from "next";
// import "../../globals.css";
import MainHeader from "@/components/main-header";

export const metadata: Metadata = {
  title: "Covoiturage",
  description: "Application pour connecter les stagiaire du GRETA entre-eux",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
      <MainHeader />
        {children}
      </body>
    </html>
  );
}
