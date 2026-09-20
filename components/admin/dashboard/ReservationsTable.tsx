const sampleData = [
  { id: '1', name: 'John Smith', room: 'Suite Presidencial', dates: '07/23 - 08/23', status: 'Confirmado' },
  { id: '2', name: 'Mark Amtlin', room: 'Habitación Doble', dates: '02/23 - 03/23', status: 'Checked-in' },
  { id: '3', name: 'Robert Marriah', room: 'Habitación Estándar', dates: '02/23 - 05/23', status: 'Pendiente' },
  { id: '4', name: 'Amia Raras', room: 'Suite Jr.', dates: '05/23 - 08/23', status: 'Checked-in' },
];

export default function ReservationsTable() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmado':
        return 'bg-emerald-100 text-emerald-800';
      case 'Checked-in':
        return 'bg-blue-100 text-blue-800';
      case 'Pendiente':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5ded0] p-6">
      <h3 className="text-lg font-serif font-bold text-[#2d2926] mb-4">
        Reservaciones Recientes
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-[#2d2926]">
          <thead className="bg-[#f7f4ed] text-xs font-semibold uppercase text-[#5a524c]">
            <tr>
              <th className="py-3 px-4">Huésped</th>
              <th className="py-3 px-4">Habitación</th>
              <th className="py-3 px-4">Fechas</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5ded0]">
            {sampleData.map((res) => (
              <tr key={res.id} className="hover:bg-[#f7f4ed]/50 transition-colors">
                <td className="py-3 px-4 font-medium">{res.name}</td>
                <td className="py-3 px-4">{res.room}</td>
                <td className="py-3 px-4 text-xs text-[#5a524c]">{res.dates}</td>
                <td className="py-3 px-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadge(res.status)}`}>
                    {res.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <button className="text-xs font-bold text-[#c0a060] hover:underline mr-3">Ver</button>
                  <button className="text-xs font-bold text-[#5a524c] hover:underline">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}