'use client';

import Link from 'next/link';

export default function Footer() {


  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#f7f4ed] text-[#2d2926]">

      {/* SECCIÓN 3: FOOTER PRINCIPAL */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">

          {/* Logo y Redes Sociales */}
          <div className="space-y-4 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <svg className="w-10 h-10 text-[#c0a060] mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414M18.364 18.364l-1.414-1.414M7.05 7.05L5.636 5.636" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 17a6 6 0 1112 0" />
              </svg>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#2d2926]/70">HOTEL</span>
              <span className="font-serif text-lg font-bold text-[#2d2926] leading-tight">
                Santa Fe Chignahuapan
              </span>
            </div>

            {/* Iconos Redes */}
            <div className="flex gap-3 text-[#2d2926]/70 pt-2">
              <a href="#" className="hover:text-[#d95d39] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a href="#" className="hover:text-[#d95d39] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.847 9 5.23V8z" /></svg>
              </a>
              <a href="#" className="hover:text-[#d95d39] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.56-1.31 1.56-1.29 2.56.02 1.2.78 2.3 1.91 2.67 1.05.36 2.27.1 3.03-.68.61-.6.94-1.45.93-2.31V.02z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs uppercase tracking-wider text-[#2d2926]">
              ENLACES RÁPIDOS
            </h4>
            <ul className="space-y-2 text-xs text-[#2d2926]/80">
              <li><Link href="/habitaciones" className="hover:text-[#d95d39] transition-colors">Habitaciones</Link></li>
              <li><Link href="/guia-turistica" className="hover:text-[#d95d39] transition-colors">Guia Turistica</Link></li>
              <li><Link href="/nosotros" className="hover:text-[#d95d39] transition-colors">Nosotros</Link></li>
              
            </ul>
          </div>

          {/* Información */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs uppercase tracking-wider text-[#2d2926]">
              INFORMACIÓN
            </h4>
            <ul className="space-y-2 text-xs text-[#2d2926]/80">
              <li><Link href="/terminos-y-condiciones" className="hover:text-[#d95d39] transition-colors">Terminos y Condiciones</Link></li>
              <li><Link href="/politicas" className="hover:text-[#d95d39] transition-colors">Políticas</Link></li>
            </ul>
          </div>

          {/* Contacto y Formulario */}
          <div className="space-y-4">
            <h4 className="font-semibold text-xs uppercase tracking-wider text-[#2d2926]">
              CONTACTO
            </h4>

            <div className="space-y-1.5 text-xs text-[#2d2926]/80">
              <p className="flex items-start gap-2">
                <span className="text-[#c0a060]">📍</span>
                <span>Calle Lerdo #47, Col. Centro, C.P. 73300 Chignahuapan, Puebla, México.</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#c0a060]">📞</span>
                <span>+52 (797) 140 5931</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#c0a060]">✉️</span>
                <span>hotelsantafe047@gmail.com</span>
              </p>
            </div>


          </div>

        </div>
      </section>

      {/* SECCIÓN 4: COPYRIGHT Y LEGALES */}
      <section className="border-t border-[#c0a060]/20 py-4 px-4 text-center text-[11px] text-[#2d2926]/60 space-y-1">
        <p className="space-x-2">
          <Link href="/terminos-y-condiciones" className="hover:underline">Términos y Condiciones</Link>
        </p>
        <p>
          © {year} Hotel Santa Fe Chignahuapan. Todos los derechos reservados.
        </p>
      </section>

    </footer>
  );
}