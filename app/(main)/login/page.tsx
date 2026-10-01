import Image from 'next/image';
import LoginForm from '@/components/auth/LoginForm';

export const metadata = {
  title: 'Login Administrador | Hotel Santa Fe',
  description: 'Acceso al portal de gestión administrativa del Hotel Santa Fe Chignahuapan.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row overflow-hidden bg-[#2d2926]">
      {/* SECCIÓN IZQUIERDA: Imagen Inspiracional & Branding (Server Rendered) */}
      <section className="relative w-full md:w-1/2 lg:w-3/5 min-h-[300px] md:min-h-screen flex items-end justify-start p-8 md:p-16 overflow-hidden">
        <Image
          src="/image.webp"
          alt="Hotel Santa Fe Chignahuapan Courtyard"
          fill
          priority
          className="object-cover object-center scale-105"
        />

        {/* Overlay en degradado */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2d2926]/90 via-[#2d2926]/40 to-[#2d2926]/20" />

        {/* Badge e información */}
        <div className="relative z-10 max-w-lg text-white space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#c0a060]/40 text-[#c0a060] text-xs uppercase tracking-widest font-semibold">
            Pueblo Mágico de Chignahuapan
          </div>
          <h2 className="text-3xl md:text-5xl font-serif leading-tight font-light text-[#f7f4ed]">
            Tu refugio de calidez, confort y tradición
          </h2>
          <p className="text-[#f7f4ed]/80 text-sm md:text-base font-light leading-relaxed hidden sm:block">
            Accede al panel de gestión administrativa del hotel para controlar reservaciones, habitaciones y experiencias.
          </p>
        </div>
      </section>

      {/* SECCIÓN DERECHA: Formulario Dinámico (Client Component) */}
      <LoginForm />
    </div>
  );
}