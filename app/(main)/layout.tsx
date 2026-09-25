import Footer from "@/components/main/footer";
import Header from "@/components/main/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio | Tu descanso en el corazón de Chignahuapan",
  description:
    "Reserva directamente en Hotel Santa Fe Chignahuapan. Habitaciones familiares, estacionamiento y la mejor ubicación en el Pueblo Mágico de Puebla.",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f7f4ed] md:pt-29">
        {children}
      </main>
      <Footer />
    </>
  );
}