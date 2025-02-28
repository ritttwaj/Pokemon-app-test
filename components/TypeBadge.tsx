import React from 'react';

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

interface TypeBadgeProps {
  type: string;
  large?: boolean;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type, large = false }) => {
  return (
    <span
      className={`
        ${typeColors[type] || 'bg-gray-400'} 
        text-white 
        ${large ? 'px-4 py-2 text-base' : 'px-2 py-1 text-xs'} 
        rounded-full 
        capitalize
        inline-block
      `}
    >
      {type}
    </span>
  );
};

export default TypeBadge;