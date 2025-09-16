'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Menu, X, User, FileText, Briefcase, Wrench, Mail } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: 'about', label: 'About', icon: User },
  { id: 'resume', label: 'Resume', icon: FileText },
  { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
  { id: 'technologies', label: 'Technologies', icon: Wrench },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export function Navbar({ activeSection, onSectionChange }: NavbarProps) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background-secondary/90 backdrop-blur-lg'
          : 'bg-background-secondary/75 backdrop-blur-sm'
      } border-t border-border rounded-t-xl`}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop Navbar */}
        <div className="hidden md:flex justify-center items-center py-4">
          <div className="flex gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                onMouseEnter={() => {
                  // Prefetch corresponding route when hovering over section
                  const routeMap: Record<string, string> = {
                    'about': '/about',
                    'resume': '/resume',
                    'portfolio': '/portfolio',
                    'technologies': '/technologies',
                    'contact': '/contact'
                  };
                  const route = routeMap[item.id];
                  if (route) router.prefetch(route);
                }}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'text-text-primary border-b-2 border-primary'
                    : 'text-text-muted hover:text-text-secondary border-b-2 border-transparent'
                }`}
              >
                {item.label}
              </button>
            ))}
            <ThemeSwitcher />
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="flex md:hidden justify-end items-center py-3 mr-5">
          {/* Hamburger Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 text-text-primary mr-3"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Theme Switcher */}
          <ThemeSwitcher />
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="flex md:hidden flex-col gap-3 pb-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id);
                    setIsMobileOpen(false);
                  }}
                  onMouseEnter={() => {
                    // Prefetch corresponding route when hovering over section
                    const routeMap: Record<string, string> = {
                      'about': '/about',
                      'resume': '/resume',
                      'portfolio': '/portfolio',
                      'technologies': '/technologies',
                      'contact': '/contact'
                    };
                    const route = routeMap[item.id];
                    if (route) router.prefetch(route);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'bg-primary/10 text-text-primary'
                      : 'text-text-muted hover:text-text-secondary'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}