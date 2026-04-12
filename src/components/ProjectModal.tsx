/**
 * Modal para visualizar demos de proyectos en vivo.
 * Usa un iframe para cargar la URL del demo dentro de un contenedor pixelado.
 * Incluye estados de carga, error y retry.
 */
import React, { useState, useEffect, useRef } from 'react';
import LoadingSpinner from './LoadingSpinner';

/** Props del componente ProjectModal */
interface ProjectModalProps {
  isOpen: boolean;        // Controla visibilidad del modal
  onClose: () => void;    // Callback para cerrar el modal
  demoUrl: string;        // URL del demo a cargar en el iframe
  title: string;          // Título del proyecto para el header
}

/**
 * Modal fullscreen con iframe para live preview.
 * Maneja:
 * - Estados de carga (spinner)
 * - Estados de error (mensaje + retry)
 * - Cierre con Escape, click fuera, o botón X
 * - Accesibilidad (ARIA, role dialog)
 */
export default function ProjectModal({ 
  isOpen, 
  onClose, 
  demoUrl, 
  title 
}: ProjectModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Resetear estados cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [isOpen]);

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handlers de carga
  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    if (iframeRef.current) {
      iframeRef.current.src = demoUrl;
    }
  };

  // No renderizar si está cerrado
  if (!isOpen) return null;

  return (
    // Overlay con backdrop negro
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop - click para cerrar */}
      <div 
        className="absolute inset-0 bg-black/95"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Contenedor principal del modal */}
      <div className="relative w-[95vw] h-[90vh] bg-[#0a0a0a] border-4 border-[#00E5FF] overflow-hidden" style={{ boxShadow: '8px 8px 0 #00E5FF' }}>
        
        {/* Header: título + botón cerrar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a0a] border-b-2 border-[#00E5FF]">
          <h2 id="modal-title" className="font-pixel text-sm text-[#FFFFFF]">
            {title.toUpperCase()}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-[#00E5FF] hover:bg-[#FFE500] transition-colors flex items-center justify-center"
            aria-label="Cerrar"
          >
            <span className="font-pixel text-xl text-[#000000]">×</span>
          </button>
        </div>

        {/* Área del iframe con estados overlay */}
        <div className="w-full h-[calc(100%-56px)] relative bg-white">
          {/* Spinner de carga - visible mientras carga */}
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0a0a0a]">
              <LoadingSpinner message="CARGANDO DEMO..." />
            </div>
          )}

          {/* Mensaje de error con botón retry */}
          {hasError && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0a0a0a] p-8">
              <p className="font-pixel text-sm text-[#FF4444] mb-4">
                ERROR AL CARGAR
              </p>
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-[#00E5FF] hover:bg-[#FFE500] transition-colors font-pixel text-xs text-[#000000]"
              >
                REINTENTAR
              </button>
            </div>
          )}

          {/* Iframe con el demo - siempre presente pero cubierto por overlays */}
          <iframe
            ref={iframeRef}
            src={demoUrl}
            title={title}
            className="w-full h-full block"
            onLoad={handleLoad}
            onError={handleError}
            allow="fullscreen"
          />
        </div>
      </div>
    </div>
  );
}