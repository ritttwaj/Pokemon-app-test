import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-pokeblue shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-white">Pokemon Explorer</h1>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-white hover:text-pokeyellow transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/favorites" className="text-white hover:text-pokeyellow transition-colors">
                Favorites
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;