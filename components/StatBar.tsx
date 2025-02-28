import React from 'react';
import { PokemonStat } from '../types/pokemon';

const statNames: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

const statColors: Record<string, string> = {
  hp: 'bg-red-500',
  attack: 'bg-orange-500',
  defense: 'bg-yellow-500',
  'special-attack': 'bg-blue-500',
  'special-defense': 'bg-green-500',
  speed: 'bg-pink-500',
};

interface StatBarProps {
  stat: PokemonStat;
}

const StatBar: React.FC<StatBarProps> = ({ stat }) => {
  const MAX_STAT = 255;
  
  const percentage = Math.min(100, (stat.value / MAX_STAT) * 100);
  
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="font-medium">{statNames[stat.name] || stat.name}</span>
        <span className="text-gray-600">{stat.value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${statColors[stat.name] || 'bg-indigo-500'}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StatBar;