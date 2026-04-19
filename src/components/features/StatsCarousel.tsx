/**
 * Carrusel 3D "Sobre Mí" - Componente React
 * Muestra datos de perfil y párrafos de biografía con efecto de profundidad.
 */
import React, { useState, useEffect, useCallback } from 'react';

// Datos básicos del perfil
const profileData = [
  { label: 'NOMBRE', value: 'ALECDEV' },
  { label: 'ROL', value: 'Desarrollador Front-end' },
  { label: 'EDAD', value: '23 años' },
  { label: 'FORMACIÓN', value: 'Ing. Sistemas' },
  { label: 'ESTADO', value: 'Construyendo' },
];

// Párrafos de la biografía
const bioParagraphs = [
  `Hola, soy Alec y estoy muy entusiasmado con el futuro del desarrollo, particularmente con el impacto de la IA. Tengo 23 años y vengo de una formación en Ingeniería en Sistemas, aunque todavía estoy construyendo mi experiencia profesional en el campo.`,
  `Actualmente, me identifico como desarrollador JR – me encanta la creatividad y el desafío de transformar ideas en soluciones tangibles. Lo que me motiva es usar la IA y los agentes de manera estratégica para crear proyectos innovadores.`,
  `Aunque me considero con buenas bases, estoy siendo muy consciente de que la IA y el desarrollo son campos que evolucionan a una velocidad increíble. Estoy en una fase de aprendizaje intenso, y estoy particularmente enfocado en refinar mis habilidades y la ejecución de mis proyectos.`,
  `Soy una persona analítica, perfeccionista y muy metódica. Antes de comenzar a construir, me gusta investigar, absorber información y buscar la inspiración que impulsará la idea. Sé que tengo mucho por aprender, pero estoy muy motivado para seguir creciendo y contribuir con mi enfoque y atención al detalle.`,
];

type ProfileField = { label: string; value: string };

type CarouselCard =
  | { type: 'profile'; data: ProfileField[] }
  | { type: 'bio'; data: string; index: number };

// Combinar en array: primero perfil, luego bio
const allCards: CarouselCard[] = [
  { type: 'profile', data: profileData },
  ...bioParagraphs.map((text, i) => ({
    type: 'bio' as const,
    data: text,
    index: i + 1,
  })),
];

interface StatsCarouselProps {
  baseUrl: string;
}

/**
 * Componente de carrusel 3D con navegación por botones y teclado.
 */
export default function StatsCarousel({ baseUrl }: StatsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % allCards.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const goToPrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + allCards.length) % allCards.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [goToPrev, goToNext]);

  // Función para obtener los estilos de cada card según su posición
  const getCardStyle = (index: number): React.CSSProperties => {
    const diff = index - currentIndex;
    const totalCards = allCards.length;

    if (diff === 0) {
      return {
        opacity: 1,
        transform: 'scale(1) translateX(0)',
        zIndex: 20,
      };
    } else if (diff === -1 || diff === totalCards - 1) {
      return {
        opacity: 0.6,
        transform: 'scale(0.8) translateX(-100%)',
        zIndex: 10,
      };
    } else if (diff === 1 || diff === -totalCards + 1) {
      return {
        opacity: 0.6,
        transform: 'scale(0.8) translateX(100%)',
        zIndex: 10,
      };
    } else if (diff === -2 || diff === totalCards - 2) {
      return {
        opacity: 0.3,
        transform: 'scale(0.6) translateX(-200%)',
        zIndex: 5,
      };
    } else if (diff === 2 || diff === -totalCards + 2) {
      return {
        opacity: 0.3,
        transform: 'scale(0.6) translateX(200%)',
        zIndex: 5,
      };
    } else {
      return {
        opacity: 0,
        transform: 'scale(0.4) translateX(0)',
        zIndex: 1,
      };
    }
  };

  // Renderiza una card individual
  const renderCard = (card: CarouselCard, index: number) => {
    const isProfile = card.type === 'profile';

    return (
      <div
        key={index}
        className="carousel-card transition-all duration-500"
        style={{
          ...getCardStyle(index),
          position: 'absolute',
          width: '100%',
          maxWidth: '28rem',
          cursor: 'pointer',
          willChange: 'transform, opacity',
        }}
      >
        <div className="tilt-card w-full h-full">
          {isProfile ? (
            <div 
              className="bg-[#0a0a0a] border-2 border-[#00E5FF] p-6 w-[28rem] overflow-hidden"
              style={{ boxShadow: '4px 4px 0 #00E5FF', height: '440px' }}
            >
              <div className="flex items-center gap-2 mb-4 border-b border-[#333] pb-3">
                <span className="text-[#00E5FF]">◉</span>
                <h3 className="font-pixel text-[10px] text-[#00E5FF]">PERFIL</h3>
              </div>
              <div className="space-y-3">
                {card.data.map((item, i) => (
                  <div key={i} className="flex flex-row items-center gap-2 font-pixel text-[10px]">
                    <span className="text-[#00E5FF] w-24 flex-shrink-0">{item.label}:</span>
                    <span className="text-[#FFFFFF]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div 
              className="bg-[#0a0a0a] border-2 border-[#00E5FF] p-6 w-[28rem] overflow-hidden"
              style={{ boxShadow: '4px 4px 0 #00E5FF', height: '440px' }}
            >
              <div className="flex items-center gap-2 mb-4 border-b border-[#333] pb-3">
                <span className="text-[#FFE500]">♦</span>
                <span className="font-pixel text-[10px] text-[#FFE500]">BIO-{card.index}</span>
              </div>
              <p className="font-pixel text-xs text-[#888888] leading-relaxed overflow-y-auto h-[340px]">
                {card.data}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Renderiza las cards para mobile (stacked)
  const renderMobileCards = () => (
    <div className="block sm:hidden space-y-3">
      {allCards.map((card, index) => (
        <div 
          key={index}
          className="tilt-card bg-[#0a0a0a] border-2 border-[#00E5FF] p-4 w-full mx-auto"
          style={{ boxShadow: '4px 4px 0 #00E5FF' }}
        >
          {card.type === 'profile' ? (
            <>
<div className="flex items-center gap-2 mb-3 border-b border-[#333] pb-2">
                <span className="text-[#00E5FF]">◉</span>
                <h3 className="font-pixel text-[10px] text-[#00E5FF]">PERFIL</h3>
              </div>
              <div className="space-y-2">
                {card.data.map((item, i) => (
                  <div key={i} className="flex flex-row items-center gap-2 font-pixel text-[10px]">
                    <span className="text-[#00E5FF] w-24 flex-shrink-0">{item.label}:</span>
                    <span className="text-[#FFFFFF]">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {card.data.map((item, i) => (
                  <div key={i} className="flex flex-row items-center gap-2 font-pixel text-[10px]">
                    <span className="text-[#00E5FF] w-24 flex-shrink-0">{item.label}:</span>
                    <span className="text-[#FFFFFF]">{item.value}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-3 border-b border-[#333] pb-2">
                <span className="text-[#FFE500]">♦</span>
                <span className="font-pixel text-[10px] text-[#FFE500]">BIO-{card.index}</span>
              </div>
              <p className="font-pixel text-[10px] text-[#888888] leading-relaxed">
                {card.data}
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );

  // Renderiza el carrusel para desktop
  const renderDesktopCarousel = () => (
    <div className="hidden sm:block relative">
      <div 
        id="carousel-container" 
        className="flex items-center justify-center gap-4 overflow-visible h-[520px]"
      >
        {allCards.map((card, index) => renderCard(card, index))}
      </div>

      <button
        onClick={goToPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#00E5FF] hover:bg-[#FFE500] transition-colors flex items-center justify-center z-10"
        aria-label="Anterior"
      >
        <span className="text-[#000000] font-pixel text-sm">◀</span>
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#00E5FF] hover:bg-[#FFE500] transition-colors flex items-center justify-center z-10"
        aria-label="Siguiente"
      >
        <span className="text-[#000000] font-pixel text-sm">▶</span>
      </button>

      {/* Indicador de posición */}
      <div className="hidden sm:flex justify-center gap-2 mt-6">
        {allCards.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 transition-colors ${
              index === currentIndex ? 'bg-[#00E5FF]' : 'bg-[#333]'
            }`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <section id="sobre-mi" className="py-8 sm:py-12 px-3 sm:px-4 relative">
      <div className="max-w-5xl mx-auto">
        {/* Título */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="font-pixel text-lg sm:text-xl md:text-2xl text-[#FFFFFF] inline-block relative">
            <span className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 text-[#00E5FF]">▶</span>
            SOBRE MÍ
            <span className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 text-[#00E5FF] rotate-180">▶</span>
          </h2>
        </div>

        {/* Mobile: Grid stack | Desktop: Carrusel */}
        {renderMobileCards()}
        {renderDesktopCarousel()}
      </div>
    </section>
  );
}
