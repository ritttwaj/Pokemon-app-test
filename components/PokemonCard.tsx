import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PokemonListItem } from '../types/pokemon';

// Color mapping for Pokemon types
const typeColors: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-200',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-700',
  flying: 'bg-indigo-300',
  psychic: 'bg-pink-500',
  bug: 'bg-green-600',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const formattedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  
  return (
    <Link href={`/pokemon/${pokemon.id}`} className="pokemon-card block">
      <div className="relative w-full h-48 mb-4">
        {pokemon.image ? (
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            layout="fill"
            objectFit="contain"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">No image</span>
          </div>
        )}
      </div>
      
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">{formattedName}</h3>
        <p className="text-gray-600 mb-2">#{pokemon.id.toString().padStart(3, '0')}</p>
        
        <div className="flex justify-center space-x-2">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`${typeColors[type] || 'bg-gray-400'} text-white px-2 py-1 rounded-full text-xs capitalize`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;