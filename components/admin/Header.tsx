'use client';

// 1. Definimos la interfaz de las propiedades que recibe el Header
interface AdminHeaderProps {
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

// 2. Aplicamos la interfaz en los parámetros del componente
export default function AdmninHeader({ isSidebarOpen, onToggleSidebar }: AdminHeaderProps) {
  return (
    <header className="flex items-center justify-between bg-[#f7f4ed] border-b border-[#e5ded0] px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Botón hamburguesa para mostrar u ocultar el Sidebar */}
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-2 rounded-lg bg-white border border-[#e5ded0] text-[#2d2926] hover:bg-[#e5ded0] transition-colors focus:outline-none cursor-pointer"
          title={isSidebarOpen ? "Ocultar menú lateral" : "Mostrar menú lateral"}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div>
          <h1 className="text-2xl font-serif font-bold text-[#2d2926]">
            Panel de Control
          </h1>
          <p className="text-xs text-[#5a524c]">
            Bienvenido, Administrador
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 bg-white rounded-full border border-[#e5ded0] text-[#5a524c] hover:bg-gray-50 cursor-pointer">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-0 right-0 w-2 h-2 bg-[#d95d39] rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-[#e5ded0]">
          <div className="w-9 h-9 rounded-full bg-[#d95d39] text-white flex items-center justify-center font-bold text-sm">
            A
          </div>
          <span className="text-sm font-semibold text-[#2d2926]">Admin</span>
        </div>
      </div>
    </header>
  );
}