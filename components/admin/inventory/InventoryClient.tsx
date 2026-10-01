'use client';

import React, { useState, useMemo } from 'react';
import { InventoryItem, InventoryFormData, InventoryCategory } from '@/types/inventory';
import InventoryModal from '@/components/admin/inventory/InventoryModa';
import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal';

interface InventoryClientProps {
  initialItems: InventoryItem[];
}

export default function InventoryClient({ initialItems }: InventoryClientProps) {
  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Paginación
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Modales de Creación/Edición
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  // Modales de Eliminación
  const [deletingItem, setDeletingItem] = useState<InventoryItem | null>(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  // Handlers para abrir el Modal de Eliminación
  const handleOpenDeleteSingle = (item: InventoryItem) => {
    setDeletingItem(item);
    setIsBulkDelete(false);
    setIsDeleteModalOpen(true);
  };

  const handleOpenDeleteBulk = () => {
    setIsBulkDelete(true);
    setDeletingItem(null);
    setIsDeleteModalOpen(true);
  };

  // Confirmar Eliminación (Individual y Masiva)
  const handleConfirmDelete = async () => {
    setIsDeleting(true);

    /* ========================================================================
       PETICIÓN AL BACKEND (FETCH)
       Eliminación Individual: DELETE http://localhost:4000/api/v1/inventory/${deletingItem.id}
       Eliminación Masiva: POST http://localhost:4000/api/v1/inventory/bulk-delete
       ========================================================================

    try {
      if (isBulkDelete) {
        await fetch('http://localhost:4000/api/v1/inventory/bulk-delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: selectedIds }),
        });
      } else if (deletingItem) {
        await fetch(`http://localhost:4000/api/v1/inventory/${deletingItem.id}`, {
          method: 'DELETE',
        });
      }
    } catch (error) {
      console.error('Error al eliminar insumo(s):', error);
    }
    ======================================================================== */

    if (isBulkDelete) {
      setItems((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
      setSelectedIds([]);
    } else if (deletingItem) {
      setItems((prev) => prev.filter((item) => item.id !== deletingItem.id));
      setSelectedIds((prev) => prev.filter((id) => id !== deletingItem.id));
    }

    setIsDeleting(false);
    setIsDeleteModalOpen(false);
    setDeletingItem(null);
    setIsBulkDelete(false);
  };

  // Guardar Insumo (Crear / Editar)
  const handleSaveItem = (formData: InventoryFormData) => {
    if (editingItem) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? { ...item, ...formData, lastRestocked: new Date().toISOString().split('T')[0] }
            : item
        )
      );
    } else {
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
        return <span className="px-2 py-1 text-xs rounded-full bg-[#d1fae5] text-[#065f46] border border-[#a7f3d0] font-semibold">Amenities</span>;
      case 'blancos':
        return <span className="px-2 py-1 text-xs rounded-full bg-[#dbeafe] text-[#1e40af] font-semibold">Blancos</span>;
      case 'minibar':
        return <span className="px-2 py-1 text-xs rounded-full bg-[#fef3c7] text-[#92400e] border border-[#fde68a] font-semibold">Minibar</span>;
      case 'alimentos':
        return <span className="px-2 py-1 text-xs rounded-full bg-[#f3f4f6] text-[#1f2937] border border-[#d1d5db] font-semibold">Cocina & Alimentos</span>;
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
          className="px-4 py-2.5 bg-[#d95d39] hover:bg-[#c44f2e] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2 self-start md:self-auto"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Agregar Insumo
        </button>
      </div>

      {/* Contenedor de Filtros y Búsqueda */}
      <div className="bg-white p-4 rounded-xl border border-[#e5ded0] shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Buscar insumo por nombre, ID o ubicación..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-sm font-medium text-[#2d2926] placeholder-[#988f86] focus:outline-none focus:border-[#c0a060]"
            />
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-xs font-semibold text-[#2d2926] focus:outline-none focus:border-[#c0a060] truncate cursor-pointer"
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
              className="w-full px-3.5 py-2 bg-[#f7f4ed]/50 border border-[#e5ded0] rounded-xl text-xs font-semibold text-[#2d2926] focus:outline-none focus:border-[#c0a060] cursor-pointer"
            >
              <option value={10}>10 registros por página</option>
              <option value={100}>100 registros por página</option>
            </select>
          </div>
        </div>

        {/* Acciones por Lote con Icono de Basura SVG */}
        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between bg-[#f7f4ed] p-3 rounded-xl border border-[#e5ded0] animate-fade-in">
            <span className="text-xs font-bold text-[#2d2926]">
              {selectedIds.length} insumo(s) seleccionado(s)
            </span>
            <button
              onClick={handleOpenDeleteBulk}
              className="px-3.5 py-1.5 bg-[#fee2e2] text-[#991b1b] border border-[#fca5a5] rounded-lg text-xs font-bold hover:bg-red-200 transition-colors flex items-center gap-1.5"
              title="Eliminar insumos seleccionados"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Eliminar Selección ({selectedIds.length})</span>
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
                <th className="p-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={
                      paginatedItems.length > 0 &&
                      paginatedItems.every((item) => selectedIds.includes(item.id))
                    }
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-[#e5ded0] text-[#d95d39] focus:ring-[#c0a060] cursor-pointer"
                  />
                </th>
                <th className="p-4">Folio ID</th>
                <th className="p-4">Insumo / Producto</th>
                <th className="p-4">Categoría</th>
                <th className="p-4">Stock Actual</th>
                <th className="p-4">Costo U.</th>
                <th className="p-4">Ubicación</th>
                <th className="p-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5ded0] text-sm text-[#2d2926]">
              {paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center p-8 text-[#988f86] text-xs">
                    No se encontraron insumos registrados con esos criterios.
                  </td>
                </tr>
              ) : (
                paginatedItems.map((item) => {
                  const isLowStock = item.quantity <= item.minStock;

                  return (
                    <tr key={item.id} className="hover:bg-[#f7f4ed]/30 transition-colors">
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(item.id)}
                          onChange={() => handleSelectOne(item.id)}
                          className="w-4 h-4 rounded border-[#e5ded0] text-[#d95d39] focus:ring-[#c0a060] cursor-pointer"
                        />
                      </td>
                      <td className="p-4 font-mono text-xs font-bold text-[#c0a060]">
                        #{item.id}
                      </td>
                      <td className="p-4 font-bold text-[#2d2926]">{item.name}</td>
                      <td className="p-4">{getCategoryBadge(item.category)}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs">
                            {item.quantity} {item.unit}
                          </span>
                          {isLowStock && (
                            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-[#fee2e2] text-[#991b1b] border border-[#fca5a5]">
                              ¡REABASTECER!
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#988f86] block">Min: {item.minStock} {item.unit}</span>
                      </td>
                      <td className="p-4 font-mono text-xs font-semibold">${item.costPerUnit.toFixed(2)}</td>
                      <td className="p-4 text-xs text-[#5a524c]">{item.location}</td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Icono de Editar SVG */}
                          <button
                            type="button"
                            onClick={() => {
                              setEditingItem(item);
                              setIsModalOpen(true);
                            }}
                            className="p-1.5 text-[#5a524c] hover:text-[#2d2926] rounded-lg hover:bg-[#f7f4ed] transition-colors"
                            title="Editar Insumo"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>

                          {/* Icono de Eliminar Individual SVG */}
                          <button
                            type="button"
                            onClick={() => handleOpenDeleteSingle(item)}
                            className="p-1.5 text-[#5a524c] hover:text-red-600 rounded-lg hover:bg-[#f7f4ed] transition-colors"
                            title="Eliminar Insumo"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
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
            Mostrando <strong>{paginatedItems.length}</strong> de <strong>{filteredItems.length}</strong> insumos
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1.5 bg-white border border-[#e5ded0] rounded-lg font-semibold text-[#2d2926] hover:bg-[#f7f4ed] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Anterior
            </button>
            <span className="px-2 font-medium text-[#2d2926]">
              Página {currentPage} de {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1.5 bg-white border border-[#e5ded0] rounded-lg font-semibold text-[#2d2926] hover:bg-[#f7f4ed] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
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

      {/* Modal Reutilizable de Confirmación de Eliminación */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        isLoading={isDeleting}
        itemName={
          isBulkDelete
            ? `${selectedIds.length} insumos seleccionados`
            : deletingItem
              ? deletingItem.name
              : undefined
        }
        description={
          isBulkDelete
            ? `¿Estás seguro de que deseas eliminar permanentemente estos ${selectedIds.length} insumos del inventario?`
            : 'Este insumo será eliminado permanentemente del sistema de inventario.'
        }
        itemDetails={
          !isBulkDelete && deletingItem ? (
            <div className="flex flex-col gap-1 text-xs">
              <div className="flex justify-between">
                <span className="text-[#5a524c]">Folio ID:</span>
                <span className="font-mono font-bold text-[#c0a060]">#{deletingItem.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5a524c]">Stock Registrado:</span>
                <span className="font-semibold">{deletingItem.quantity} {deletingItem.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5a524c]">Ubicación:</span>
                <span className="font-semibold">{deletingItem.location}</span>
              </div>
            </div>
          ) : null
        }
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingItem(null);
          setIsBulkDelete(false);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}