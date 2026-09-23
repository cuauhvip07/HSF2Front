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
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="hover:text-[#d95d39] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.847 9 5.23V8z"/></svg>
              </a>
              <a href="#" className="hover:text-[#d95d39] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
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
              <li><Link href="/gastronomia" className="hover:text-[#d95d39] transition-colors">Gastronomía</Link></li>
              <li><Link href="/experiencias" className="hover:text-[#d95d39] transition-colors">Experiencias</Link></li>
              <li><Link href="/ubicacion" className="hover:text-[#d95d39] transition-colors">Ubicación</Link></li>
            </ul>
          </div>

          {/* Información */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs uppercase tracking-wider text-[#2d2926]">
              INFORMACIÓN
            </h4>
            <ul className="space-y-2 text-xs text-[#2d2926]/80">
              <li><Link href="/nosotros" className="hover:text-[#d95d39] transition-colors">Nosotros</Link></li>
              <li><Link href="/politicas" className="hover:text-[#d95d39] transition-colors">Políticas</Link></li>
              <li><Link href="/sostenibilidad" className="hover:text-[#d95d39] transition-colors">Sostenibilidad</Link></li>
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
                <span>Calle 5 de Mayo #45, Chignahuapan, Pue.</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#c0a060]">📞</span>
                <span>+52 (797) 140 5931</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#c0a060]">✉️</span>
                <span>contacto@santafe.com</span>
              </p>
            </div>

            
          </div>

        </div>
      </section>

      {/* SECCIÓN 4: COPYRIGHT Y LEGALES */}
      <section className="border-t border-[#c0a060]/20 py-4 px-4 text-center text-[11px] text-[#2d2926]/60 space-y-1">
        <p className="space-x-2">
          <Link href="/terminos" className="hover:underline">Términos y Condiciones</Link>
          <span>|</span>
          <Link href="/privacidad" className="hover:underline">Política de Privacidad</Link>
        </p>
        <p>
          © {year} Hotel Santa Fe Chignahuapan. Todos los derechos reservados.
        </p>
      </section>

    </footer>
  );
}