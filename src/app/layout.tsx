import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider as ThemeContextProvider } from "@/contexts/ThemeContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import PageTransition from "@/components/PageTransition";
import ClientCurvedBottomNav from "@/components/ClientCurvedBottomNav";
import AnimatedCursor from "@/components/AnimatedCursor";
import { PrefetchMonitor } from "@/components/PrefetchMonitor";
// Footer moved into the Sidebar; no longer rendered at the root layout level.
// Navbar is included inside `MainPage` for section-based navigation on the home screen.

export const metadata: Metadata = {
  title: "Portfolio - Personal Website",
  description: "A modern portfolio website built with Next.js and Tailwind CSS",
  keywords: ["portfolio", "software engineer", "web development", "fullstack", "react", "nextjs"],
  authors: [{ name: "Duc Nguyen" }],
  robots: "index, follow",
  openGraph: {
    title: "Portfolio - Personal Website",
    description: "A modern portfolio website built with Next.js and Tailwind CSS",
    type: "website",
    locale: "en_US",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap" 
          rel="stylesheet"
        />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/images/my-avatar.png" as="image" type="image/png" />
        <link rel="preload" href="/images/avatar-1.png" as="image" type="image/png" />
        <link rel="preload" href="/images/avatar-2.png" as="image" type="image/png" />
        <link rel="preload" href="/images/avatar-3.png" as="image" type="image/png" />
        <link rel="preload" href="/images/avatar-4.png" as="image" type="image/png" />
        
        {/* Prefetch critical routes */}
        <link rel="prefetch" href="/about" />
        <link rel="prefetch" href="/portfolio" />
        <link rel="prefetch" href="/resume" />
        <link rel="prefetch" href="/technologies" />
        <link rel="prefetch" href="/contact" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Critical CSS inline for faster rendering */}
        <style dangerouslySetInnerHTML={{
          __html: `
            html { font-size: 18px; }
            body { 
              background: #0a0a0a; 
              color: #ffffff; 
              font-family: 'Dongle', sans-serif; 
              min-height: 100vh; 
              margin: 0; 
              padding: 0;
            }
            .font-sans { font-family: 'Poppins', sans-serif; }
            .antialiased { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
          `
        }} />
        
      </head>
      <body className="font-sans antialiased">
        <ThemeContextProvider>
          <ThemeProvider>
            <PageTransition>
              {children}
            </PageTransition>
            <ClientCurvedBottomNav />
            <AnimatedCursor />
            <PrefetchMonitor />
          </ThemeProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
