// Pokemon list types
export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
  }
  
  export interface PokemonListItem {
    id: number;
    name: string;
    image: string;
    types: string[];
  }
  
  // Pokemon detail types
  export interface PokemonDetail {
    id: number;
    name: string;
    height: number;
    weight: number;
    abilities: PokemonAbility[];
    types: string[];
    stats: PokemonStat[];
    moves: string[];
    images: {
      official: string;
      default: string;
      shiny: string;
    };
    species: {
      name: string;
      flavorText: string;
    };
  }
  
  export interface PokemonAbility {
    name: string;
    isHidden: boolean;
  }
  
  export interface PokemonStat {
    name: string;
    value: number;
  }