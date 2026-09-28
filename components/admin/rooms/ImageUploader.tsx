'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import Image from 'next/image';

interface ImageUploaderProps {
  currentImage?: string;
  onImageSelected: (file: File | null, previewUrl: string) => void;
}

export default function ImageUploader({
  currentImage,
  onImageSelected,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string>(currentImage || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido (PNG, JPG, WEBP).');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    onImageSelected(file, objectUrl);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setPreview('');
    onImageSelected(null, '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <label className="block text-xs font-semibold text-[#5a524c]">
        Fotografía de la Habitación
      </label>

      {/* ÁREA INTERACTIVA DRAG & DROP */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[160px] ${
          isDragging
            ? 'border-[#c0a060] bg-[#f7f4ed]'
            : 'border-[#e5ded0] bg-[#f7f4ed]/30 hover:bg-[#f7f4ed]/60'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {preview ? (
          <div className="relative w-full h-40 rounded-xl overflow-hidden group">
            <Image
              src={preview}
              alt="Vista previa"
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[#2d2926]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <span className="text-white text-xs font-bold bg-[#2d2926]/80 px-3 py-1.5 rounded-lg border border-white/20">
                Cambiar Imagen
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-[#5a524c] py-4">
            <svg
              className="w-8 h-8 text-[#c0a060]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <p className="text-xs font-semibold text-[#2d2926]">
              Arrastra y suelta tu imagen aquí o{' '}
              <span className="text-[#c0a060] underline">haz clic para explorar</span>
            </p>
            <p className="text-[10px] text-[#5a524c]">
              Formatos soportados: PNG, JPG, WEBP (Máx 5MB)
            </p>
          </div>
        )}
      </div>

      {/* BOTÓN PARA QUITAR IMAGEN DE PREVISUALIZACIÓN */}
      {preview && (
        <div className="flex items-center justify-between text-xs px-1">
          <span className="text-[11px] text-[#5a524c]">
            {preview.startsWith('blob:') ? '✓ Nueva imagen cargada' : 'Imagen actual almacenada'}
          </span>
          <button
            type="button"
            onClick={handleRemoveImage}
            className="text-[11px] font-bold text-[#d95d39] hover:underline"
          >
            Quitar fotografía
          </button>
        </div>
      )}
    </div>
  );
}