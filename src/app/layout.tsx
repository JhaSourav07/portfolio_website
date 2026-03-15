import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sourav Jha — Full Stack Developer & Web3 Explorer',
  description:
    'Interactive blockchain-node portfolio of Sourav Jha — Full Stack Developer specializing in backend systems, automation, and Web3 development. Explore projects and skills as a live node network.',
  keywords: ['Full Stack Developer', 'Web3', 'Blockchain', 'React', 'Node.js', 'Solidity', 'Portfolio'],
  authors: [{ name: 'Sourav Jha' }],
  openGraph: {
    title: 'Sourav Jha — Full Stack Developer',
    description: 'Interactive blockchain-node portfolio exploring backend systems, automation, and Web3.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
