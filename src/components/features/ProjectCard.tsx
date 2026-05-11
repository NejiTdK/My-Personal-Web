/**
 * Tarjeta de proyecto para la página de Proyectos.
 * Muestra miniatura, descripción, tecnologías y acceso al Live Preview.
 */
import React, { useState } from 'react';
import ProjectModal from './ProjectModal';

/** Estructura de datos de un proyecto */
interface Project {
  id: string;
  title: string;
  description: string;
  year: string;
  technologies: string[];
  thumbnail: string;
  demoUrl?: string;
  hasDemo?: boolean;
}

/** Props del componente ProjectCard */
interface ProjectCardProps {
  project: Project;
  baseUrl: string;
}

/**
 * Componente que renderiza una tarjeta individual de proyecto.
 * Incluye:
 * - Header con logo y título
 * - Miniatura con overlay de Live Preview (si tiene demo)
 * - Descripción, año y tecnologías
 * - Modal para visualizar el demo en vivo
 */
export default function ProjectCard({ project, baseUrl }: ProjectCardProps) {
  // Estado para controlar la apertura/cierre del modal de preview
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Construir URLs absolutas para la miniatura y el demo
  const thumbnailSrc = `${baseUrl}${project.thumbnail}`;
  const demoSrc = project.demoUrl ? `${baseUrl}${project.demoUrl}` : undefined;

  return (
    <>
      {/* Tarjeta principal del proyecto */}
      <article 
        className="bg-[#0a0a0a] border-2 border-[#00E5FF] overflow-hidden"
        style={{ boxShadow: '4px 4px 0 #00E5FF' }}
      >
        {/* Header: logo + título */}
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 border-b border-[#333]">
          <img 
            src={`${baseUrl}DEV-LOGO-1.png`} 
            alt="AlecDev" 
            className="w-8 h-8 object-contain"
            style={{ filter: 'drop-shadow(0 0 2px white) drop-shadow(0 0 2px white)' }}
          />
          <div className="flex-1 min-w-0">
            <p className="font-pixel text-xs text-[#FFFFFF] truncate">
              {project.title.toUpperCase()}
            </p>
          </div>
        </div>

        {/* Miniatura con overlay de Live Preview */}
        <div className="relative h-48 sm:h-56 bg-[#0a0a0a] overflow-hidden">
          <img 
            src={thumbnailSrc}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Overlay visible al hacer hover - solo si tiene demo */}
          {project.hasDemo && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <button
                onClick={openModal}
                className="px-4 py-2 bg-[#FFE500] hover:bg-[#00E5FF] transition-colors font-pixel text-xs text-[#000000]"
              >
                LIVE PREVIEW
              </button>
            </div>
          )}
        </div>

        {/* Info: descripción, año, tecnologías */}
        <div className="px-3 sm:px-4 py-3 sm:py-4 border-t border-[#333]">
          <p className="font-pixel text-[10px] sm:text-xs text-[#888888] leading-relaxed mb-3">
            {project.description}
          </p>
          
          <div className="flex items-center gap-2 mb-3">
            <span className="font-pixel text-[8px] sm:text-[10px] text-[#00E5FF]">AÑO:</span>
            <span className="font-pixel text-[8px] sm:text-[10px] text-[#FFFFFF]">{project.year}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-pixel text-[8px] sm:text-[10px] text-[#00E5FF]">TECH:</span>
            <div className="flex gap-2">
              {project.technologies.map((tech) => (
                <div key={tech} className="w-6 h-6" title={tech.toUpperCase()}>
                  {/* Iconos SVG pixel art para cada tecnología */}
                  {tech === 'html' && (
                    <svg viewBox="0 0 16 16" className="w-full h-full" imageRendering="pixelated">
                      <rect x="2" y="1" width="12" height="14" fill="#E44D26"/>
                      <rect x="3" y="2" width="10" height="12" fill="#F16529"/>
                      <rect x="5" y="5" width="6" height="1" fill="#FFFFFF"/>
                      <rect x="5" y="7" width="6" height="1" fill="#FFFFFF"/>
                      <rect x="5" y="9" width="4" height="1" fill="#FFFFFF"/>
                      <rect x="5" y="11" width="5" height="1" fill="#FFFFFF"/>
                    </svg>
                  )}
                  {tech === 'css' && (
                    <svg viewBox="0 0 16 16" className="w-full h-full" imageRendering="pixelated">
                      <rect x="2" y="1" width="12" height="14" fill="#264DE4"/>
                      <rect x="3" y="2" width="10" height="12" fill="#2965F1"/>
                      <rect x="4" y="4" width="3" height="1" fill="#FFFFFF"/>
                      <rect x="4" y="6" width="3" height="1" fill="#FFFFFF"/>
                      <rect x="4" y="8" width="2" height="1" fill="#FFFFFF"/>
                      <rect x="7" y="4" width="4" height="1" fill="#EBEBEB"/>
                      <rect x="7" y="6" width="4" height="1" fill="#EBEBEB"/>
                      <rect x="7" y="8" width="4" height="1" fill="#EBEBEB"/>
                      <rect x="7" y="10" width="4" height="1" fill="#EBEBEB"/>
                    </svg>
                  )}
                  {tech === 'js' && (
                    <svg viewBox="0 0 16 16" className="w-full h-full" imageRendering="pixelated">
                      <rect x="2" y="1" width="12" height="14" fill="#F7DF1E"/>
                      <rect x="3" y="2" width="10" height="12" fill="#F7DF1E"/>
                      <rect x="4" y="4" width="3" height="3" fill="#323330"/>
                      <rect x="4" y="7" width="5" height="1" fill="#323330"/>
                      <rect x="4" y="9" width="5" height="1" fill="#323330"/>
                      <rect x="8" y="11" width="3" height="1" fill="#323330"/>
                      <rect x="10" y="10" width="1" height="2" fill="#323330"/>
                      <rect x="9" y="9" width="1" height="1" fill="#323330"/>
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Modal de Live Preview - solo renderizado si tiene demo */}
      {project.hasDemo && demoSrc && (
        <ProjectModal
          isOpen={isModalOpen}
          onClose={closeModal}
          demoUrl={demoSrc}
          title={project.title}
        />
      )}
    </>
  );
}