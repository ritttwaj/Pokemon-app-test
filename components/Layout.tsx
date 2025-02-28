import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Pokémon Explorer' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Explore Pokémon with our interactive Pokédex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Layout;