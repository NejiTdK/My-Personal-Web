/**
 * Spinner de carga con estilo pixel art.
 * Muestra 4 esquinas pulsantes y un centro estático.
 */
import React from 'react';

/** Props del componente */
interface LoadingSpinnerProps {
  message?: string;  // Texto a mostrar debajo del spinner (default: 'CARGANDO...')
}

/**
 * Spinner animado estilo retro 8-bit.
 * Usa 4 divs en las esquinas que pulsan con delay escalonado,
 * más un centro amarillo estático.
 */
export default function LoadingSpinner({ 
  message = 'CARGANDO...' 
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Contenedor del spinner - border exterior */}
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 border-4 border-[#00E5FF]" />
        
        {/* 4 esquinas pulsantes con animation delay escalonado */}
        <div className="absolute top-2 left-2 w-3 h-3 bg-[#00E5FF] animate-pulse" />
        <div className="absolute top-2 right-2 w-3 h-3 bg-[#00E5FF] animate-pulse" style={{ animationDelay: '0.2s' }} />
        <div className="absolute bottom-2 left-2 w-3 h-3 bg-[#00E5FF] animate-pulse" style={{ animationDelay: '0.4s' }} />
        <div className="absolute bottom-2 right-2 w-3 h-3 bg-[#00E5FF] animate-pulse" style={{ animationDelay: '0.6s' }} />
        
        {/* Centro amarillo estático */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#FFE500]" />
      </div>
      
      {/* Mensaje de carga */}
      <p className="font-pixel text-xs text-[#00E5FF] tracking-wider">
        {message}
      </p>
    </div>
  );
}