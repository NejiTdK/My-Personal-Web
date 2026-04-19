# Navbar Pixel Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development or executing-plans to implement this plan.

**Goal:** Refactorizar el navbar actual manteniendo estilo pixelado pero incorporando layout moderno con buscador funcional.

**Architecture:** 
- Modificar PixelNav.astro existente con nuevo layout (Izquierda→Centro→Derecha)
- Agregar componente de buscador funcional usando estado local
- Agregar hamburger menu para mobile (< 768px)
- Crear nueva sección StackTecnologico.astro

**Tech Stack:** Astro, Tailwind CSS, JavaScript vanilla para interactividad

---

## Task 1: Actualizar PixelNav.astro con nuevo layout

**Files:**
- Modify: `src/components/sections/PixelNav.astro`

**Steps:**

- [ ] **Step 1: Revisar código actual**
  - Leer `src/components/sections/PixelNav.astro` completo
  - Identificar estructura actual y clases tailwind

- [ ] **Step 2: Modificar estructura del nav**
  - Cambiar de `absolute` a `sticky top-0`
  - Reorganizar: Logo(izq) | Links(centro) | Buscador(der)
  - Agregar `justify-between` en contenedor principal

```astro
<nav class="sticky top-0 z-50 bg-[#000000] border-2 border-[#00E5FF] px-3 sm:px-6 py-2 sm:py-3" style="border-radius: 2px; box-shadow: 4px 4px 0 #00E5FF;">
  <div class="flex items-center justify-between gap-4">
    <!-- Logo + Marca -->
    <a href={baseUrl} class="flex items-center gap-2 sm:gap-3 hover:scale-105 transition-transform">
      <img src={`${baseUrl}my-logo.png`} alt="AlecDev Logo" class="w-10 h-10 sm:w-12 sm:h-12 object-contain"/>
      <span class="font-pixel text-xs sm:text-sm text-[#FFFFFF]">ALEC<span class="text-[#00E5FF]">DEV</span></span>
    </a>

    <!-- Links centrales (hidden en mobile) -->
    <ul class="hidden md:flex gap-6">...</ul>

    <!-- Buscador (hidden en mobile) -->
    <div class="hidden md:flex items-center">...</div>

    <!-- Botón hamburger (visible en mobile) -->
    <button class="md:hidden text-[#00E5FF]">☰</button>
  </div>
</nav>
```

- [ ] **Step 3: Agregar links con estilos correctos**
  - Links: Inicio, Proyectos, Sobre Mi, Stack
  - Hover: scale(1.05) + color amber
  - Activo: underline 3px cyan

```astro
<a href={item.href} class="font-pixel text-xs sm:text-sm text-[#FFFFFF] hover:text-[#FFE500] hover:scale-105 transition-all relative">
  {item.label}
  <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00E5FF] transition-all group-hover:w-full data-[active]:w-full"></span>
</a>
```

- [ ] **Step 4: Agregar buscador funcional**
  - Input con borde 1px cyan
  - Icono 🔍 dentro
  - Búsqueda local en array de proyectos

```astro
<div class="relative">
  <input type="text" placeholder="Buscar proyectos..." 
    class="bg-[#000000] border border-[#00E5FF] px-3 py-1 text-xs font-pixel text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00E5FF]"/>
  <span class="absolute right-2 top-1">🔍</span>
</div>
```

- [ ] **Step 5: Agregar hamburger menu para mobile**
  - Botón ☰ visible solo en mobile
  - Panel desplegable con todos los items
  - Script para toggle

```astro
<button id="hamburger-btn" class="md:hidden text-[#00E5FF] text-xl">☰</button>

<div id="mobile-menu" class="hidden md:hidden absolute top-full left-0 right-0 bg-[#000000] border-2 border-[#00E5FF] border-t-0 p-4">
  <ul class="flex flex-col gap-4">...</ul>
  <!-- Buscador también en mobile menu -->
  <div class="mt-4">...</div>
</div>
```

- [ ] **Step 6: Commit**
```bash
git add src/components/sections/PixelNav.astro
git commit -m "refactor: navbar con layout moderno y buscador"
```

---

## Task 2: Agregar funcionalidad de búsqueda

**Files:**
- Modify: `src/components/sections/PixelNav.astro`

**Steps:**

- [ ] **Step 1: Agregar datos de proyectos**
  - Crear array con proyectos (nombre, slug)
  - Usar datos existentes o hardcodear estructura básica

```javascript
const projects = [
  { name: 'Proyecto A', slug: 'proyecto-a' },
  { name: 'Proyecto B', slug: 'proyecto-b' },
  { name: 'Mi Portafolio', slug: 'portfolio' },
];
```

- [ ] **Step 2: Agregar script de búsqueda**
  - Filtrar proyectos por nombre al typing
  - Mostrar resultados o redirigir

```javascript
const searchInput = document.getElementById('search-input');
const projects = [...];

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const results = projects.filter(p => p.name.toLowerCase().includes(query));
  
  if (results.length === 1) {
    window.location.href = `/proyectos/${results[0].slug}`;
  }
});
```

- [ ] **Step 3: Commit**
```bash
git commit -m "feat: buscador funcional en navbar"
```

---

## Task 3: Crear sección Stack Tecnológico

**Files:**
- Create: `src/components/sections/StackTecnologico.astro`
- Modify: `src/pages/index.astro` (agregar sección)

**Steps:**

- [ ] **Step 1: Crear componente StackTecnologico.astro**
  - Título: "STACK TECNOLÓGICO"
  - Bordes pixelados (igual que navbar)
  - Iconos + descripción por cada tech

```astro
---
const tecnologias = [
  { nombre: 'HTML', descripcion: 'Estructura web semántica' },
  { nombre: 'CSS', descripcion: 'Estilos con Tailwind CSS' },
  { nombre: 'JS', descripcion: 'Interactividad y lógica' },
  { nombre: 'REACT', descripcion: 'Componentes reutilizables' },
  { nombre: 'ASTRO', descripcion: 'Framework statico rápido' },
];
---
```

```astro
<section id="stack" class="py-16">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="font-pixel text-xl text-center text-[#00E5FF] mb-8">
      STACK TECNOLÓGICO
    </h2>
    
    <div class="bg-[#000000] border-2 border-[#00E5FF] p-6" style="border-radius: 2px; box-shadow: 4px 4px 0 #00E5FF;">
      <div class="grid grid-cols-1 sm:grid-cols-5 gap-4">
        {tecnologias.map((tech) => (
          <div class="text-center">
            <div class="font-pixel text-sm text-[#FFFFFF] mb-2">{tech.nombre}</div>
            <p class="font-pixel text-xs text-gray-400">{tech.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Agregar al index.astro**
  - Insertar después de Sobre Mi
  - Verificar que existe anchor #stack

```astro
---
import StackTecnologico from '../components/sections/StackTecnologico.astro';
---
<StackTecnologico />
```

- [ ] **Step 3: Commit**
```bash
git add src/components/sections/StackTecnologico.astro src/pages/index.astro
git commit -m "feat: agregar seccion stack tecnologico"
```

---

## Task 4: Testing y verificación

**Steps:**

- [ ] **Step 1: Verificar en navegador**
  - `npm run dev`
  - Navbar visible y funcional
  - Hover effects在工作
  - Buscador funciona
  - Mobile menu abre/cierra
  - Secciones #sobre-mi y #stack accesibles

- [ ] **Step 2: Verificar responsive**
  - Mobile (< 768px): hamburger visible
  - Desktop (≥ 768px): layout completo

- [ ] **Step 3: Commit final**
```bash
git commit -m "fix: ajustes finales navbar y stack"
```

---

**Dependencies:**
- Task 1 → Task 2 → Task 3 → Task 4

**Total estimate:** 8-12 pasos