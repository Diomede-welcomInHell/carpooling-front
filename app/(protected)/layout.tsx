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
    <>
      <MainHeader />
      <div className="min-h-screen pb-24">
        <div className="mx-auto max-w-md px-4 py-6 flex flex-col gap-4 items-center">
        {children}
        </div>
      </div>
    </>
    
  );
}
