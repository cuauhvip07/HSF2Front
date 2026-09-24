'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Aquí conectarías con tu backend o NextAuth / Supabase / Firebase
    setTimeout(() => {
      setLoading(false);
      alert('Simulación de inicio de sesión realizada.');
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row overflow-hidden bg-[#2d2926]">
      
      {/* SECCIÓN IZQUIERDA: Imagen Inspiracional & Branding */}
      <section className="relative w-full md:w-1/2 lg:w-3/5 min-h-[300px] md:min-h-screen flex items-end justify-start p-8 md:p-16 overflow-hidden">
        <Image
          src="/aguas_termales.png"
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

      {/* SECCIÓN DERECHA: Formulario de Login */}
      <section className="w-full md:w-1/2 lg:w-2/5 bg-[#f7f4ed] flex flex-col justify-between p-6 sm:p-12 md:p-16 relative">
        
        {/* Navegación Superior */}
        <div className="w-full flex justify-between items-center mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2d2926]/70 hover:text-[#d95d39] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Volver a Inicio
          </Link>
          <span className="text-[10px] uppercase tracking-widest text-[#c0a060] font-bold px-2.5 py-1 rounded bg-[#c0a060]/10 border border-[#c0a060]/20">
            Admin Portal
          </span>
        </div>

        {/* Tarjeta de Login */}
        <div className="w-full max-w-md mx-auto space-y-8 my-auto">
          
          <div className="text-center space-y-3">
            {/* Logo o Icono del Hotel */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#c0a060]/10 border border-[#c0a060]/30 text-[#c0a060] mb-2">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <p className="text-xs font-semibold tracking-[0.25em] text-[#c0a060] uppercase">
              Hotel Santa Fe
            </p>
            
            <h1 className="text-2xl sm:text-3xl font-serif text-[#2d2926] font-bold tracking-tight">
              PANEL DE ADMINISTRACIÓN
            </h1>
            
            <p className="text-sm text-[#2d2926]/70 font-light max-w-xs mx-auto">
              Ingresa tus credenciales para acceder
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-semibold tracking-wider text-[#2d2926] uppercase">
                Correo Electrónico
              </label>
              <div className="relative rounded-lg border border-[#2d2926]/20 bg-white focus-within:border-[#c0a060] focus-within:ring-2 focus-within:ring-[#c0a060]/20 transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#c0a060]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@hotelsantafe.mx"
                  className="w-full pl-10 pr-4 py-3 bg-transparent text-sm text-[#2d2926] placeholder-[#2d2926]/30 focus:outline-none rounded-lg"
                />
              </div>
            </div>

            {/* Campo Contraseña */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-xs font-semibold tracking-wider text-[#2d2926] uppercase">
                  Contraseña
                </label>
                <Link href="#" className="text-xs text-[#d95d39] hover:underline font-medium">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative rounded-lg border border-[#2d2926]/20 bg-white focus-within:border-[#c0a060] focus-within:ring-2 focus-within:ring-[#c0a060]/20 transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#c0a060]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-transparent text-sm text-[#2d2926] placeholder-[#2d2926]/30 focus:outline-none rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#2d2926]/40 hover:text-[#2d2926]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Recuérdame */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[#2d2926]/30 text-[#d95d39] focus:ring-[#c0a060] accent-[#d95d39]"
                />
                <span className="text-xs text-[#2d2926]/80">
                  Recuérdame
                </span>
              </label>
            </div>

            {/* Botón Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#d95d39] hover:bg-[#b84929] text-white font-medium py-3.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group text-sm uppercase tracking-wider disabled:opacity-50"
            >
              <span>{loading ? 'Ingresando...' : 'Iniciar Sesión'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>

        <div className="text-center pt-6 text-[11px] text-[#2d2926]/50">
          © 2026 Hotel Santa Fe Chignahuapan
        </div>
      </section>
    </div>
  );
}