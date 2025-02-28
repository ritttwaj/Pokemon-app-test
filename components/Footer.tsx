import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-pokegray py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-700">
            &copy; {new Date().getFullYear()} Pokemon Explorer
          </p>
          <p className="text-gray-700 mt-2 md:mt-0">
            Data provided by <a 
              href="https://pokeapi.co" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-pokeblue hover:underline"
            >
              PokeAPI
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;