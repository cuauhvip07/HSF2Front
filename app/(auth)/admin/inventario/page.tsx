'use client';

import React, { useState, useMemo } from 'react';
import { InventoryItem, InventoryFormData, InventoryCategory } from '@/types/inventory';
import InventoryModal from '@/components/admin/inventory/InventoryModa';


// Datos de demostración
const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: 'INV-101',
    name: 'Jabón Corporal Miel & Lavanda 30g',
    category: 'amenities',
    quantity: 120,
    minStock: 30,
    unit: 'piezas',
    costPerUnit: 12.5,
    location: 'Bodega Principal',
    lastRestocked: '2026-09-20',
  },
  {
    id: 'INV-102',
    name: 'Toalla de Baño Extra Grande Blanco',
    category: 'blancos',
    quantity: 8,
    minStock: 15, // ALERTA: Stock bajo
    unit: 'piezas',
    costPerUnit: 240.0,
    location: 'Lencería Central',
    lastRestocked: '2026-09-15',
  },
  {
    id: 'INV-103',
    name: 'Agua Ciel Mineral 600ml (Minibar)',
    category: 'minibar',
    quantity: 45,
    minStock: 20,
    unit: 'piezas',
    costPerUnit: 18.0,
    location: 'Almacén Minibar',
    lastRestocked: '2026-09-25',
  },
  {
    id: 'INV-104',
    name: 'Tomate Bola Fresco',
    category: 'alimentos',
    quantity: 3.5,
    minStock: 5.0, // ALERTA: Stock bajo
    unit: 'kg',
    costPerUnit: 35.0,
    location: 'Cocina / Re refrigerador 1',
    lastRestocked: '2026-09-27',
  },
  {
    id: 'INV-105',
    name: 'Papel Higiénico Doble Hoja Institucional',
    category: 'amenities',
    quantity: 200,
    minStock: 50,
    unit: 'piezas',
    costPerUnit: 9.0,
    location: 'Bodega Principal',
    lastRestocked: '2026-09-22',
  },
];

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>(MOCK_INVENTORY);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Paginación
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  // Filtrado de Datos
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, selectedCategory]);

  // Paginación calculada
  const totalPages = Math.ceil(filteredItems.length / pageSize) || 1;
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, currentPage, pageSize]);

  // Selección Múltiple
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(paginatedItems.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Acciones
  const handleDeleteSelected = () => {
    if (confirm(`¿Eliminar los ${selectedIds.length} insumos seleccionados?`)) {
      setItems((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
      setSelectedIds([]);
    }
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('¿Deseas eliminar este insumo del inventario?')) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  const handleSaveItem = (formData: InventoryFormData) => {
    if (editingItem) {
      // Editar
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? { ...item, ...formData, lastRestocked: new Date().toISOString().split('T')[0] }
            : item
        )
      );
    } else {
      // Crear
      const newItem: InventoryItem = {
        ...formData,
        id: `INV-${Math.floor(100 + Math.random() * 900)}`,
        lastRestocked: new Date().toISOString().split('T')[0],
      };
      setItems((prev) => [newItem, ...prev]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  // Formato Categórico Badge
  const getCategoryBadge = (cat: InventoryCategory) => {
    switch (cat) {
      case 'amenities':
        return <span className="px-2 py-1 text-xs rounded-full bg-[#d1fae5] text-[#065f46] border border-[#a7f3d0]">Amenities</span>;
      case 'blancos':
        return <span className="px-2 py-1 text-xs rounded-full bg-[#dbeafe] text-[#1e40af]">Blancos</span>;
      case 'minibar':
        return <span className="px-2 py-1 text-xs rounded-full bg-[#fef3c7] text-[#92400e] border border-[#fde68a]">Minibar</span>;
      case 'alimentos':
        return <span className="px-2 py-1 text-xs rounded-full bg-[#f3f4f6] text-[#1f2937] border border-[#d1d5db]">Cocina & Alimentos</span>;
    }
  };

  return (
    <div className="p-6 bg-[#f7f4ed]/40 min-h-screen space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#2d2926]">Control de Inventario & Stock</h1>
          <p className="text-sm text-[#5a524c]">
            Gestión de insumos para habitaciones, blancos, minibar y cocina de Hotel Santa Fe.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingItem(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2.5 bg-[#d95d39] hover:bg-[#c44f2e] text-white rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2 self-start md:self-auto"
        >
          <span>+</span> Agregar Insumo
        </button>
      </div>

      {/* Contenedor de Filtros y Búsqueda */}
      <div className="bg-white p-4 rounded-xl border border-[#e5ded0] shadow-sm space-y-4">
        {/* Fila 1: Buscador y Categorías */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Buscar insumo por nombre, ID o ubicación..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-lg text-[#2d2926] placeholder-[#988f86] focus:outline-none focus:border-[#c0a060]"
            />
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-lg text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
            >
              <option value="all">Todas las Categorías</option>
              <option value="amenities">Amenities & Baño</option>
              <option value="blancos">Lencería & Blancos</option>
              <option value="minibar">Minibar & Bebidas</option>
              <option value="alimentos">Cocina & Alimentos</option>
            </select>
          </div>

          <div>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-lg text-[#2d2926] focus:outline-none focus:border-[#c0a060]"
            >
              <option value={10}>10 registros por página</option>
              <option value={100}>100 registros por página</option>
            </select>
          </div>
        </div>

        {/* Acciones por Lote */}
        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between bg-[#f7f4ed] p-3 rounded-lg border border-[#e5ded0]">
            <span className="text-sm font-medium text-[#2d2926]">
              {selectedIds.length} insumo(s) seleccionado(s)
            </span>
            <button
              onClick={handleDeleteSelected}
              className="px-3 py-1.5 bg-[#fee2e2] text-[#991b1b] border border-[#fca5a5] rounded-md text-xs font-semibold hover:bg-red-200 transition-colors"
            >
              Eliminar Selección ({selectedIds.length})
            </button>
          </div>
        )}
      </div>

      {/* Tabla de Inventario */}
      <div className="bg-white rounded-xl border border-[#e5ded0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f7f4ed] border-b border-[#e5ded0] text-xs uppercase font-semibold text-[#5a524c]">
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={
                      paginatedItems.length > 0 &&
                      paginatedItems.every((item) => selectedIds.includes(item.id))
                    }
                    onChange={handleSelectAll}
                    className="rounded border-[#e5ded0] text-[#d95d39] focus:ring-[#c0a060]"
                  />
                </th>
                <th className="p-4">Folio ID</th>
                <th className="p-4">Insumo / Producto</th>
                <th className="p-4">Categoría</th>
                <th className="p-4">Stock Actual</th>
                <th className="p-4">Costo U.</th>
                <th className="p-4">Ubicación</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5ded0] text-sm text-[#2d2926]">
              {paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center p-8 text-[#988f86]">
                    No se encontraron insumos registados con esos criterios.
                  </td>
                </tr>
              ) : (
                paginatedItems.map((item) => {
                  const isLowStock = item.quantity <= item.minStock;

                  return (
                    <tr key={item.id} className="hover:bg-[#f7f4ed]/30 transition-colors">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(item.id)}
                          onChange={() => handleSelectOne(item.id)}
                          className="rounded border-[#e5ded0] text-[#d95d39] focus:ring-[#c0a060]"
                        />
                      </td>
                      <td className="p-4 font-mono text-xs font-bold text-[#c0a060]">
                        {item.id}
                      </td>
                      <td className="p-4 font-medium">{item.name}</td>
                      <td className="p-4">{getCategoryBadge(item.category)}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">
                            {item.quantity} {item.unit}
                          </span>
                          {isLowStock && (
                            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-[#fee2e2] text-[#991b1b] border border-[#fca5a5]">
                              ¡REABASTECER!
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#988f86]">Min: {item.minStock} {item.unit}</span>
                      </td>
                      <td className="p-4 font-mono">${item.costPerUnit.toFixed(2)}</td>
                      <td className="p-4 text-[#5a524c]">{item.location}</td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingItem(item);
                            setIsModalOpen(true);
                          }}
                          className="text-xs px-2.5 py-1 bg-[#f7f4ed] border border-[#e5ded0] text-[#5a524c] rounded hover:bg-[#e5ded0] transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-xs px-2.5 py-1 bg-[#fee2e2] border border-[#fca5a5] text-[#991b1b] rounded hover:bg-red-200 transition-colors"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación Footer */}
        <div className="p-4 bg-[#f7f4ed]/50 border-t border-[#e5ded0] flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-[#5a524c]">
          <span>
            Mostrando {paginatedItems.length} de {filteredItems.length} insumos
          </span>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 bg-white border border-[#e5ded0] rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="px-3 py-1 font-medium text-[#2d2926]">
              Página {currentPage} de {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 bg-white border border-[#e5ded0] rounded disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>

      {/* Modal para Crear/Editar */}
      <InventoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveItem}
        initialData={editingItem}
      />
    </div>
  );
}