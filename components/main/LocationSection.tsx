'use client';

export default function LocationSection() {
  const googleMapsUrl =
    "https://www.google.com/maps/place/Hotel+Santa+Fe/@19.8401276,-98.0284889,17z/data=!4m9!3m8!1s0x85d06dc027b7c937:0x2bdcd4de8f38fd01!5m2!4m1!1i2!8m2!3d19.8401276!4d-98.025914!16s%2Fg%2F11lgd5krjq";

  return (
    <section className="bg-[#f7f4ed] py-16 px-4 md:px-12 text-[#2d2926] border-t border-[#e5ded0]">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        
        {/* Encabezado de la Sección */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold tracking-widest text-[#c0a060] uppercase font-sans">
            UBICACIÓN PRIVILEGIADA
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#2d2926] font-normal">
            En el Corazón de Chignahuapan
          </h2>
          <p className="text-xs md:text-sm text-[#5a524c] leading-relaxed">
            Ubicados en pleno centro histórico. Camina hacia la plaza principal, la laguna y los talleres tradicionales de esferas.
          </p>
        </div>

        {/* Contenido en 2 Columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* COLUMNA IZQUIERDA: MAPA REAL Y CÓMO LLEGAR */}
          <div className="bg-white rounded-2xl border border-[#e5ded0] p-6 shadow-sm flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-[#2d2926]">
                  ¿Cómo Encontrarnos?
                </h3>
                <span className="text-[10px] font-bold bg-[#f7f4ed] text-[#c0a060] px-2.5 py-1 rounded-md border border-[#e5ded0] uppercase">
                  Centro Histórico
                </span>
              </div>

              {/* Contenedor del Mapa Embed */}
              <div className="relative w-full h-64 rounded-xl overflow-hidden border border-[#e5ded0] bg-gray-100">
                <iframe
                  title="Ubicación Hotel Santa Fe Chignahuapan"
                  src="https://maps.google.com/maps?q=19.8401276,-98.025914&z=17&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  className="filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>

              {/* Dirección Oficial */}
              <div className="text-xs text-[#5a524c] space-y-1">
                <p className="font-bold text-[#2d2926] text-sm">Hotel Santa Fe Chignahuapan</p>
                <p>Calle Lerdo #47, Col. Centro, C.P. 73300 Chignahuapan, Puebla, México.</p>
                <p className="text-[#988f86] text-[11px]">📍 A 2 min a pie de la Plaza de Armas y Kiosco Mudéjar.</p>
              </div>
            </div>

            {/* Botón Abrir Mapa Real */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#d95d39] hover:bg-[#c44f2e] text-white text-xs font-bold py-3.5 rounded-xl transition-all shadow-md uppercase tracking-wider text-center flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              ABRIR EN GOOGLE MAPS
            </a>
          </div>

          {/* COLUMNA DERECHA: AMENIDADES Y PUNTOS CLAVE A PIE / AUTO */}
          <div className="flex flex-col gap-4 justify-between">
            
            {/* Tarjeta 1: Puntos Turísticos Ajustados */}
            <div className="bg-white rounded-2xl border border-[#e5ded0] p-5 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-[#f7f4ed] rounded-xl text-[#c0a060] shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 002.5-2.5V11a2 2 0 012-2h1.065" />
                </svg>
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#2d2926] text-sm">Atracciones Cercanas</h4>
                <p className="text-xs text-[#5a524c] mt-1 leading-relaxed">
                  • <strong>Plaza Central & Kiosco Mudéjar:</strong> 7 min a pie.<br/>
                  • <strong>Basílica de la Inmaculada Concepción:</strong> 10 min a pie.<br/>
                  • <strong>Laguna de Chignahuapan:</strong> 3 min a pie.<br/>
                  • <strong>Aguas Termales:</strong> 15 min en auto.
                </p>
              </div>
            </div>

            {/* Tarjeta 2: Estacionamiento Privado */}
            <div className="bg-white rounded-2xl border border-[#e5ded0] p-5 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-[#f7f4ed] rounded-xl text-[#c0a060] shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#2d2926] text-sm">Estacionamiento Privado</h4>
                <p className="text-xs text-[#5a524c] mt-1 leading-relaxed">
                  Espacio seguro y gratuito dentro de las instalaciones para todos nuestros huéspedes durante su estancia.
                </p>
              </div>
            </div>

            {/* Tarjeta 3: Atención 24/7 */}
            <div className="bg-white rounded-2xl border border-[#e5ded0] p-5 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-[#f7f4ed] rounded-xl text-[#c0a060] shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#2d2926] text-sm">Recepción 24/7 y Concierge</h4>
                <p className="text-xs text-[#5a524c] mt-1 leading-relaxed">
                  Te orientamos para recorrer los talleres tradicionales de esferas navideñas, la laguna y los mejores restaurantes locales a unos pasos del hotel.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}