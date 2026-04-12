# Live Preview Modal Implementation Plan

**Goal:** Implementar un modal interactivo con React que carga demos HTML bajo demanda desde la página de proyectos.

**Architecture:** Componentes React (ProjectCard, ProjectModal, LoadingSpinner) integrados en Astro via islands. Modal carga iframe bajo demanda, gestionado por estados React.

**Tech Stack:** React 18, @astrojs/react, Tailwind CSS 4

---

## Prep 1: Instalar React en el proyecto

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Agregar React al package.json**

```bash
npm install react react-dom @astrojs/react
```

- [ ] **Step 2: Configurar Astro para usar React**

Modificar `astro.config.mjs`:
```javascript
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://NejiTdK.github.io',
  base: '/My-Personal-Web/',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()]
  }
});
```

---

## Prep 2: Mover HTML de demo a public/

**Files:**
- Create: `public/demos/prototipo-landing/index.html`
- Modify: `myresources/` (referencia)

- [ ] **Step 1: Crear carpeta demos**

```bash
mkdir -p public/demos/prototipo-landing
```

- [ ] **Step 2: Copiar HTML a public/demos/**

Copiar `myresources/landing-proyecto.html` a `public/demos/prototipo-landing/index.html`

NOTA: El HTML tiene ~2000 líneas, ya está autocontenido (CSS+JS inline).

---

## Task 1: LoadingSpinner Component

**Files:**
- Create: `src/components/LoadingSpinner.tsx`

- [ ] **Step 1: Crear LoadingSpinner.tsx**

```tsx
import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ 
  message = 'CARGANDO...' 
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Pixel art spinner */}
      <div className="relative w-16 h-16 mb-4">
        {/* Marco exterior */}
        <div className="absolute inset-0 border-4 border-[#00E5FF]" />
        
        {/* Cuadrados animados */}
        <div className="absolute top-2 left-2 w-3 h-3 bg-[#00E5FF] animate-pulse" />
        <div className="absolute top-2 right-2 w-3 h-3 bg-[#00E5FF] animate-pulse" style={{ animationDelay: '0.2s' }} />
        <div className="absolute bottom-2 left-2 w-3 h-3 bg-[#00E5FF] animate-pulse" style={{ animationDelay: '0.4s' }} />
        <div className="absolute bottom-2 right-2 w-3 h-3 bg-[#00E5FF] animate-pulse" style={{ animationDelay: '0.6s' }} />
        
        {/* Centro */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#FFE500]" />
      </div>
      
      {/* Mensaje */}
      <p className="font-pixel text-xs text-[#00E5FF] tracking-wider">
        {message}
      </p>
    </div>
  );
}
```

---

## Task 2: ProjectModal Component

**Files:**
- Create: `src/components/ProjectModal.tsx`

- [ ] **Step 1: Crear ProjectModal.tsx**

```tsx
import React, { useState, useEffect, useRef } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  demoUrl: string;
  title: string;
}

type ModalState = 'loading' | 'ready' | 'error';

export default function ProjectModal({ 
  isOpen, 
  onClose, 
  demoUrl, 
  title 
}: ProjectModalProps) {
  const [state, setState] = useState<ModalState>('loading');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Reset state cuando abre
  useEffect(() => {
    if (isOpen) {
      setState('loading');
    }
  }, [isOpen]);

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Manejar carga del iframe
  const handleIframeLoad = () => {
    setState('ready');
  };

  const handleIframeError = () => {
    setState('error');
  };

  const handleRetry = () => {
    setState('loading');
    if (iframeRef.current) {
      iframeRef.current.src = demoUrl;
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Overlay oscuro */}
      <div 
        className="absolute inset-0 bg-black/95"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal container */}
      <div className="relative w-[95vw] h-[90vh] bg-[#0a0a0a] border-4 border-[#00E5FF] overflow-hidden" style={{ boxShadow: '8px 8px 0 #00E5FF' }}>
        
        {/* Header */}
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

        {/* Content */}
        <div className="w-full h-[calc(100%-56px)] relative">
          {state === 'loading' && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]">
              <LoadingSpinner message="CARGANDO DEMO..." />
            </div>
          )}

          {state === 'error' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] p-8">
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

          <iframe
            ref={iframeRef}
            src={demoUrl}
            title={title}
            className={`w-full h-full ${state === 'ready' ? 'block' : 'hidden'}`}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            allow="fullscreen"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
```

---

## Task 3: ProjectCard Component

**Files:**
- Create: `src/components/ProjectCard.tsx`

- [ ] **Step 1: Crear ProjectCard.tsx**

```tsx
import React, { useState } from 'react';
import ProjectModal from './ProjectModal';
import TechIcon from './TechIcon.astro'; // NOTA: usar versión .jsx si está disponible, o crear versión .tsx

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

interface ProjectCardProps {
  project: Project;
  baseUrl: string;
}

export default function ProjectCard({ project, baseUrl }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const thumbnailSrc = `${baseUrl}${project.thumbnail}`;
  const demoSrc = project.demoUrl ? `${baseUrl}${project.demoUrl}` : undefined;

  return (
    <>
      <article 
        className="bg-[#0a0a0a] border-2 border-[#00E5FF] overflow-hidden"
        style={{ boxShadow: '4px 4px 0 #00E5FF' }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 border-b border-[#333]">
          <div className="w-8 h-8 border-2 border-[#00E5FF] overflow-hidden flex-shrink-0">
            <img 
              src={`${baseUrl}logo.png`} 
              alt="AlecDev" 
              className="w-full h-full object-contain" 
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-pixel text-xs text-[#FFFFFF] truncate">
              {project.title.toUpperCase()}
            </p>
          </div>
        </div>

        {/* Thumbnail */}
        <div className="relative aspect-video bg-[#0a0a0a] overflow-hidden">
          <img 
            src={thumbnailSrc}
            alt={project.title}
            className="w-full h-full object-contain"
            loading="lazy"
          />
          
          {/* Overlay con botón Live Preview */}
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

        {/* Info */}
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
                  {/* TechIcon como componente inline para React */}
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

      {/* Modal para demo */}
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
```

---

## Task 4: Integrar React en proyectos.astro

**Files:**
- Modify: `src/pages/proyectos.astro`

- [ ] **Step 1: Actualizar proyectos.astro**

1. Importar React y el componente ProjectCard
2. Pasar datos como props
3. Usar client:load para hydration

```astro
---
import Layout from '../layouts/Layout.astro';
import PixelNav from '../components/PixelNav.astro';
import Footer from '../components/Footer.astro';
import ProjectCard from '../components/ProjectCard';

// Array de proyectos - AHORA CON DEMO
const projects = [
  {
    id: 'prototipo-landing',
    title: 'Prototipo Landing',
    description: 'Prototipado de landing page construida para una constructora.',
    year: '2026',
    technologies: ['html', 'css', 'js'],
    thumbnail: 'projects/proyecto-a-large.webp',
    demoUrl: 'demos/prototipo-landing/index.html',
    hasDemo: true
  }
];

const baseUrl = import.meta.env.BASE_URL;
---

<Layout title="AlecDev | Proyectos">
  <PixelNav />
  
  <main class="relative min-h-screen">
    <section class="py-8 sm:py-12 px-3 sm:px-4">
      <div class="max-w-lg mx-auto">
        <div class="text-center mb-8 sm:mb-12">
          <h1 class="font-pixel text-xl sm:text-2xl md:text-3xl text-[#FFFFFF] mb-2 sm:mb-4">
            PROYECTOS
          </h1>
          <p class="font-pixel text-[10px] sm:text-xs text-[#888888]">
            Mis trabajos y creaciones
          </p>
        </div>

        {projects.length === 0 ? (
          <div class="text-center py-16 sm:py-20">
            <p class="font-pixel text-xs sm:text-sm text-[#888888]">
              Sin proyectos aún
            </p>
          </div>
        ) : (
          <div class="space-y-6 sm:space-y-8">
            {projects.map((project) => (
              <ProjectCard 
                client:load 
                project={project} 
                baseUrl={baseUrl} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  </main>

  <Footer />
</Layout>
```

---

## Task 5: Build y verificar

**Files:**
- Build: `npm run build`

- [ ] **Step 1: Instalar dependencias**

```bash
npm install
```

- [ ] **Step 2: Build**

```bash
npm run build
```

- [ ] **Step 3: Verificar output**

Verificar que `dist/demos/prototipo-landing/index.html` existe.

---

## Order de ejecución

1. **Prep 1: Instalar React** - package.json + astro.config.mjs
2. **Prep 2: Mover HTML** - myresources → public/demos
3. **Task 1: LoadingSpinner** - Componente
4. **Task 2: ProjectModal** - Componente principal
5. **Task 3: ProjectCard** - Tarjeta con botón
6. **Task 4: proyectos.astro** - Integración
7. **Task 5: Build y verificar**

---

## Notas importantes

- TechIcon en ProjectCard se implementa inline (SVG) para evitar problemas con Astro components en React
- El HTML de demo ya está autocontenido, no requiere recursos adicionales
- `client:load` es necesario para que el modal sea interactivo
- El iframe se desmonta al cerrar el modal - no consume recursos cuando no está en uso

---

**Plan complete and saved to `docs/superpowers/plans/2026-04-11-live-preview-modal-plan.md`**

Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?