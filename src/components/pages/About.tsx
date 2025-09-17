'use client';

import { useState } from 'react';
import { Quote, X, Palette, Code2, Smartphone, GitBranch, Search, Cog, Cpu, Briefcase } from 'lucide-react';
import Image from 'next/image';

interface Service {
  icon: string;
  title: string;
  description: string;
}

interface Testimonial {
  name: string;
  avatar: string;
  text: string;
  date: string;
}

interface Client {
  name: string;
  logo: string;
  bgColor: string;
  url: string;
}

interface AboutProps {
  aboutText: string[];
  highlightText: string;
  services: Service[];
  testimonials: Testimonial[];
  clients: Client[];
}

export function About({ aboutText, highlightText, services, testimonials, clients }: AboutProps) {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  const getIconComponent = (iconName: string) => {
    const iconProps = { className: "w-6 h-6 text-primary" };
    
    switch (iconName) {
      case 'Code2':
        return <Code2 {...iconProps} />;
      case 'GitBranch':
        return <GitBranch {...iconProps} />;
      case 'Smartphone':
        return <Smartphone {...iconProps} />;
      case 'Briefcase':
        return <Briefcase {...iconProps} />;
      case 'Search':
        return <Search {...iconProps} />;
      case 'Cog':
        return <Cog {...iconProps} />;
      case 'Cpu':
        return <Cpu {...iconProps} />;
      case 'Palette':
        return <Palette {...iconProps} />;
      default:
        return <Palette {...iconProps} />;
    }
  };

  return (
    <article className="bg-background-secondary border border-border rounded-xl p-6 shadow-md">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-text-secondary mb-2">About me</h1>
        <div className="w-8 h-1 bg-gradient-primary rounded"></div>
      </header>

      <section className="mb-8">
        {aboutText.map((paragraph, index) => (
          <p key={index} className="text-text-muted text-sm leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}
      </section>

      {/* Highlight Card*/}
      <section className="mb-8">
        <div className="relative bg-gradient-secondary border border-border rounded-xl p-6 overflow-hidden">
          <h3 className="text-lg font-medium text-text-secondary mb-2">Highlight</h3>
          <p className="text-text-muted text-sm leading-relaxed">
            {highlightText}
          </p>

        </div>
      </section>

      {/* Services */}
      <section className="mb-8">
        <h3 className="text-lg font-medium text-text-secondary mb-5">What I&apos;m doing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service, index) => (
             <div 
               key={index}
               className="bg-gradient-secondary p-5 rounded-xl border border-border hover:-translate-y-2 hover:shadow-lg hover:border-primary/20 transition-all duration-300 ease-out group"
             >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 ease-out">
                  {getIconComponent(service.icon)}
                </div>
                <div>
                  <h4 className="text-text-secondary font-medium mb-2 group-hover:text-primary transition-colors duration-300">{service.title}</h4>
                  <p className="text-text-muted text-sm leading-relaxed group-hover:text-text-secondary transition-colors duration-300">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-8">
        <h3 className="text-lg font-medium text-text-secondary mb-5">Testimonials</h3>
        <div className="overflow-hidden">
          <div className="flex gap-4 pb-4 w-max testimonials-marquee">
            <div className="flex gap-4">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={`testimonials-a-${index}`}
                  className="min-w-80 bg-gradient-secondary p-6 rounded-xl border border-border cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedTestimonial(testimonial)}
                >
                  <div className="flex items-start gap-4">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                      <Image 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-text-secondary font-medium mb-2">{testimonial.name}</h4>
                      <p className="text-text-muted text-sm leading-relaxed line-clamp-3">
                        {testimonial.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Duplicate for seamless loop */}
            <div className="flex gap-4" aria-hidden>
              {testimonials.map((testimonial, index) => (
                <div 
                  key={`testimonials-b-${index}`}
                  className="min-w-80 bg-gradient-secondary p-6 rounded-xl border border-border cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedTestimonial(testimonial)}
                >
                  <div className="flex items-start gap-4">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                      <Image 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-text-secondary font-medium mb-2">{testimonial.name}</h4>
                      <p className="text-text-muted text-sm leading-relaxed line-clamp-3">
                        {testimonial.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Modal */}
      {selectedTestimonial && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background-secondary border border-border rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-start gap-4 mb-4">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <Image 
                  src={selectedTestimonial.avatar} 
                  alt={selectedTestimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-text-secondary text-xl font-medium mb-1">{selectedTestimonial.name}</h4>
                <time className="text-text-muted text-sm">{selectedTestimonial.date}</time>
              </div>
              <button
                onClick={() => setSelectedTestimonial(null)}
                className="text-text-muted hover:text-text-secondary transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex items-start gap-3">
              <Quote className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <p className="text-text-muted leading-relaxed">{selectedTestimonial.text}</p>
            </div>
          </div>
        </div>
      )}

      {/* Clients */}
      <section>
        <h3 className="text-lg font-medium text-text-secondary mb-5">Clients</h3>
        <div className="overflow-hidden">
          <div className="flex gap-6 pb-4 w-max clients-marquee">
            <div className="flex gap-6">
              {clients.map((client, index) => (
                <a 
                  key={`clients-a-${index}`}
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-32 h-16 rounded-lg flex items-center justify-center transition-colors border border-border hover:border-primary/20"
                  style={{ backgroundColor: client.bgColor }}
                >
                  <div className="relative w-24 h-12">
                    <Image 
                      src={client.logo} 
                      alt={client.name}
                      fill
                      className="object-contain transition-all"
                    />
                  </div>
                </a>
              ))}
            </div>
            {/* Duplicate for seamless loop */}
            <div className="flex gap-6" aria-hidden>
              {clients.map((client, index) => (
                <a 
                  key={`clients-b-${index}`}
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-32 h-16 rounded-lg flex items-center justify-center transition-colors border border-border hover:border-primary/20"
                  style={{ backgroundColor: client.bgColor }}
                >
                  <div className="relative w-24 h-12">
                    <Image 
                      src={client.logo} 
                      alt={client.name}
                      fill
                      className="object-contain transition-all"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
