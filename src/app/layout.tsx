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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap" 
          rel="stylesheet" 
        />
        
        {/* Prefetch critical routes */}
        <link rel="prefetch" href="/about" />
        <link rel="prefetch" href="/portfolio" />
        <link rel="prefetch" href="/resume" />
        <link rel="prefetch" href="/technologies" />
        <link rel="prefetch" href="/contact" />
        
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
