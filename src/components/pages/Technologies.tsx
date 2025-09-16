'use client';

import { Monitor, Server, Database, Wrench, MoreHorizontal } from 'lucide-react';
import { useRef, useState } from 'react';

interface Technology {
  name: string;
  logo: string;
  link: string;
}

interface TechnologyCategory {
  name: string;
  technologies: Technology[];
}

interface TechnologiesProps {
  categories: TechnologyCategory[];
}

const getCategoryIcon = (categoryName: string) => {
  switch (categoryName.toLowerCase()) {
    case 'front-end':
      return Monitor;
    case 'back-end':
      return Server;
    case 'database':
      return Database;
    case 'tools':
      return Wrench;
    default:
      return MoreHorizontal;
  }
};

interface TechnologyCardProps {
  tech: Technology;
}

function TechnologyCard({ tech }: TechnologyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setMousePosition({ x: rotateY, y: rotateX });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div className="group relative">
      <a 
        href={tech.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <div 
          ref={cardRef}
          className="bg-gradient-secondary border border-border rounded-xl overflow-hidden h-full transition-all duration-300 flex flex-col"
          style={{
            transform: isHovered 
              ? `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg) scale(1.05)` 
              : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
            boxShadow: isHovered 
              ? '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 1)' 
              : '0 4px 6px rgba(0, 0, 0, 0.1)',
            transformStyle: 'preserve-3d'
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative h-3/5">
            <img 
              ref={logoRef}
              src={tech.logo} 
              alt={tech.name}
              className="w-full h-full object-contain p-2"
              style={{
                transform: isHovered 
                  ? `perspective(1000px) rotateX(${mousePosition.y * 1.6}deg) rotateY(${mousePosition.x * 1.6}deg) scale(1.15) translateY(12px) translateZ(0)`
                  : 'scale(1) translateY(0) translateZ(0)',
                filter: isHovered 
                  ? 'drop-shadow(0 8px 18px color-mix(in srgb, var(--color-primary) 55%, transparent))'
                  : 'drop-shadow(0 2px 6px color-mix(in srgb, var(--color-primary) 25%, transparent))',
                transition: 'transform 360ms cubic-bezier(0.2, 0.8, 0.2, 1), filter 360ms ease-out',
                backfaceVisibility: 'hidden',
                transformOrigin: '50% 50% 0',
                willChange: 'transform, filter',
                opacity: 1
              }}
            />  
          </div>
          
          <div className="h-2/5 flex items-center justify-center p-2">
            <h3 className="text-text-secondary font-medium text-center transition-colors text-xs"
                style={{
                  color: isHovered ? 'var(--primary)' : 'var(--text-secondary)'
                }}>
              {tech.name}
            </h3>
          </div>
        </div>
        
      </a>
    </div>
  );
}

export function Technologies({ categories }: TechnologiesProps) {
  return (
    <article className="bg-background-secondary border border-border rounded-xl p-6 shadow-md">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-text-secondary mb-2">Technologies & Tools</h1>
        <div className="w-8 h-1 bg-gradient-primary rounded"></div>
      </header>

      <section className="space-y-8">
        {categories.map((category, categoryIndex) => {
          const CategoryIcon = getCategoryIcon(category.name);
          return (
            <div key={categoryIndex}>
              <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-3">
                <CategoryIcon size={20} className="text-primary" />
                {category.name}
              </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 relative">
              {category.technologies.map((tech, techIndex) => (
                <TechnologyCard key={techIndex} tech={tech} />
              ))}
            </div>
            </div>
          );
        })}
      </section>
    </article>
  );
}
