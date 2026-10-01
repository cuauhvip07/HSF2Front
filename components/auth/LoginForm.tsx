'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { loginSchema, LoginFormData } from '@/types/main/auth';
import { loginUsuario } from '@/services/authService';

// Helper nativo para establecer cookies sin librerías
function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  const isSecure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax${isSecure}`;
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);

    try {
      // 1. Petición al backend
      const token = await loginUsuario(data);

      // 2. Guardar JWT en Cookies (1 día o 30 días si seleccionó Recuérdame)
      const expiresDays = data.rememberMe ? 30 : 1;
      setCookie('AUTH_TOKEN', token, expiresDays);

      // 3. Redirigir al dashboard
      router.push('/admin');
      router.refresh();
    } catch (error: any) {
      setServerError(error.message || 'Error al iniciar sesión');
    }
  };

  return (
    <section className="w-full md:w-1/2 lg:w-2/5 bg-[#f7f4ed] flex flex-col justify-between p-6 sm:p-12 md:p-16 relative">
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

      <div className="w-full max-w-md mx-auto space-y-8 my-auto">
        <div className="text-center space-y-3">
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

        {serverError && (
          <div className="p-3.5 bg-red-100/80 border border-red-300 rounded-xl text-red-700 text-xs flex items-center gap-2 font-medium animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-semibold tracking-wider text-[#2d2926] uppercase">
              Correo Electrónico
            </label>
            <div
              className={`relative rounded-lg border bg-white transition-all ${
                errors.email
                  ? 'border-red-500 focus-within:ring-2 focus-within:ring-red-200'
                  : 'border-[#2d2926]/20 focus-within:border-[#c0a060] focus-within:ring-2 focus-within:ring-[#c0a060]/20'
              }`}
            >
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#c0a060]">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="email"
                type="email"
                {...register('email')}
                placeholder="admin@hotelsantafe.mx"
                className="w-full pl-10 pr-4 py-3 bg-transparent text-sm text-[#2d2926] placeholder-[#2d2926]/30 focus:outline-none rounded-lg"
              />
            </div>
            {errors.email && (
              <p className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-1">
                <span>⚠</span> {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-xs font-semibold tracking-wider text-[#2d2926] uppercase">
                Contraseña
              </label>
              <Link href="#" className="text-xs text-[#d95d39] hover:underline font-medium">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <div
              className={`relative rounded-lg border bg-white transition-all ${
                errors.password
                  ? 'border-red-500 focus-within:ring-2 focus-within:ring-red-200'
                  : 'border-[#2d2926]/20 focus-within:border-[#c0a060] focus-within:ring-2 focus-within:ring-[#c0a060]/20'
              }`}
            >
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#c0a060]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
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
            {errors.password && (
              <p className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-1">
                <span>⚠️️</span> {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                {...register('rememberMe')}
                className="w-4 h-4 rounded border-[#2d2926]/30 text-[#d95d39] focus:ring-[#c0a060] accent-[#d95d39]"
              />
              <span className="text-xs text-[#2d2926]/80">Recuérdame</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#d95d39] hover:bg-[#b84929] text-white font-medium py-3.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group text-sm uppercase tracking-wider disabled:opacity-50 cursor-pointer"
          >
            <span>{isSubmitting ? 'Ingresando...' : 'Iniciar Sesión'}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>
      </div>

      <div className="text-center pt-6 text-[11px] text-[#2d2926]/50">
        © 2026 Hotel Santa Fe Chignahuapan
      </div>
    </section>
  );
}