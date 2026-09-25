import MetricCard from '@/components/admin/dashboard/MetricCard';
import ReservationsTable from '@/components/admin/dashboard/ReservationsTable';

export default function AdminPage() {
  return (
    <div className="flex-1 flex flex-col bg-[#f7f4ed]/40 min-h-screen">

      <main className="p-8 flex flex-col gap-8">
        {/* Fila de Tarjetas de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <MetricCard
            title="Total Reservas"
            value="128"
            subtitle="+12% esta semana"
            bgColor="bg-[#d95d39]"
            icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
          <MetricCard
            title="Llegadas Hoy"
            value="25"
            subtitle="Huéspedes por recibir"
            bgColor="bg-[#c0a060]"
            icon="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
          <MetricCard
            title="Ocupación"
            value="85%"
            subtitle="32 / 38 habitaciones"
            bgColor="bg-[#2d2926]"
            icon="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
          <MetricCard
            title="Ingresos"
            value="$45,670"
            subtitle="MXN este mes"
            bgColor="bg-white"
            textColor="text-[#2d2926]"
            icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </div>

        {/* Sección de Tabla e Información Semanal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ReservationsTable />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-[#e5ded0] p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-serif font-bold text-[#2d2926] mb-2">
                Ocupación Semanal
              </h3>
              <p className="text-xs text-[#5a524c] mb-6">
                Promedio de reservaciones por día
              </p>
              
              <div className="flex items-end justify-between h-40 pt-4 px-2 border-b border-[#e5ded0]">
                {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, idx) => {
                  const heights = ['h-16', 'h-20', 'h-24', 'h-28', 'h-36', 'h-40', 'h-32'];
                  return (
                    <div key={idx} className="flex flex-col items-center gap-2">
                      <div className={`w-6 bg-[#c0a060] rounded-t-md ${heights[idx]}`}></div>
                      <span className="text-xs font-semibold text-[#5a524c]">{day}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#e5ded0] text-xs text-[#5a524c] flex justify-between items-center">
              <span>Capacidad Total: 38 Hab.</span>
              <span className="font-bold text-[#d95d39]">Alta Demanda</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}