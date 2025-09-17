'use client';

import { useState } from 'react';
import { Eye, ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  url: string;
}

interface PortfolioProps {
  projects: Project[];
}

const categories = ['All', 'Web Design', 'Applications', 'Web Development'];

export function Portfolio({ projects }: PortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <article className="bg-background-secondary border border-border rounded-xl p-6 shadow-md">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-text-secondary mb-2">Portfolio</h1>
        <div className="w-8 h-1 bg-gradient-primary rounded"></div>
      </header>

      {/* Filter */}
      <section className="mb-8">
        {/* Desktop Filter */}
        <div className="hidden md:flex gap-6 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'text-primary'
                  : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Mobile Filter */}
        <div className="md:hidden relative mb-6">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-background-tertiary border border-border rounded-lg px-4 py-3 flex items-center justify-between text-text-secondary"
          >
            <span>{selectedCategory}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-background-tertiary border border-border rounded-lg shadow-lg z-10">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    selectedCategory === category
                      ? 'bg-primary text-background-primary'
                      : 'text-text-secondary hover:bg-background-secondary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group">
              <a 
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <div className="relative overflow-hidden rounded-xl mb-4 group-hover:shadow-lg transition-shadow">
                  <div className="relative w-full h-48">
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-background-secondary text-primary p-3 rounded-lg">
                      <Eye className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                <div className="px-2">
                  <h3 className="text-text-secondary font-medium mb-1 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-text-muted text-sm">{project.category}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
