'use client';

import { useState } from 'react';
import AdmninHeader from '@/components/admin/Header';
import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Estado para controlar si el menú lateral está visible u oculto
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return (
        <div className="flex min-h-screen bg-[#f7f4ed]">
            {/* Sidebar recibiendo el estado de apertura y la función de conmutación */}
            <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
                {/* Header recibiendo las props para el botón hamburguesa */}
                <AdmninHeader isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
                {children}
            </div>
        </div>
    );
}