import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider as ThemeContextProvider } from "@/contexts/ThemeContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import AppShellClient from "@/components/AppShellClient";



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
        {/* Using next/font with display swap; removed external font links and aggressive preloads/prefetches */}
        
        {/* Critical CSS inline using runtime variables */}
        <style dangerouslySetInnerHTML={{
          __html: `
            html { font-size: var(--base-font-size); }
            body {
              background: var(--color-bg-primary);
              color: var(--color-text-primary);
              font-family: var(--font-primary), sans-serif;
              min-height: 100vh;
              margin: 0;
              padding: 0;
            }
            .antialiased { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
          `
        }} />
        
      </head>
      <body className="font-sans antialiased">
        <ThemeContextProvider>
          <ThemeProvider>
            <AppShellClient>
              {children}
            </AppShellClient>
          </ThemeProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
