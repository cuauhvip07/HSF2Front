import Footer from "@/components/main/footer";
import Header from "@/components/main/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HSF | Inicio",
  description: "Página de inicio de Hotel Santa Fe.",
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