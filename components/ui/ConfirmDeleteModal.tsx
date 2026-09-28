'use client';

import { useEffect, ReactNode } from 'react';

export interface ConfirmDeleteModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  itemName?: string;
  itemDetails?: ReactNode; // Permite pasar etiquetas pequeñas o un fragmento JSX personalizado
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
}

export default function ConfirmDeleteModal({
  isOpen,
  title = '¿Confirmar eliminación?',
  description = 'Esta acción no se puede deshacer y el registro será eliminado permanentemente.',
  itemName,
  itemDetails,
  confirmText = 'Sí, Eliminar',
  cancelText = 'Cancelar',
  isLoading = false,
  onClose,
  onConfirm,
}: ConfirmDeleteModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2d2926]/60 backdrop-blur-sm animate-fade-in">
      {/* Fondo clicable para cerrar */}
      <div className="fixed inset-0" onClick={isLoading ? undefined : onClose} />

      <div className="relative bg-white rounded-2xl shadow-xl border border-[#e5ded0] w-full max-w-md p-6 flex flex-col gap-5 z-10">
        {/* Header con icono de peligro */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#fee2e2] border border-[#fca5a5] flex items-center justify-center flex-shrink-0 text-[#d95d39]">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-serif font-bold text-[#2d2926]">
              {itemName ? `¿Eliminar ${itemName}?` : title}
            </h3>
            <p className="text-xs text-[#5a524c] mt-1 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Detalle dinámico opcional del elemento */}
        {itemDetails && (
          <div className="bg-[#f7f4ed] p-3.5 rounded-xl border border-[#e5ded0] text-xs text-[#2d2926]">
            {itemDetails}
          </div>
        )}

        {/* Acciones */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            disabled={isLoading}
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-[#e5ded0] text-xs font-semibold text-[#5a524c] hover:bg-[#f7f4ed] transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl bg-[#d95d39] hover:bg-[#c44f2e] text-white text-xs font-bold transition-all shadow-sm tracking-wider uppercase disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading && (
              <svg className="animate-spin w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            )}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}