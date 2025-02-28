import axios from 'axios';
import { PokemonDetail, PokemonListItem, PokemonListResponse } from '../types/pokemon';

const API_BASE_URL = 'https://pokeapi.co/api/v2';


export const getPokemonList = async (limit = 20, offset = 0): Promise<PokemonListResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon`, {
      params: {
        limit,
        offset,
      },
    });
    
  
    const pokemonWithDetails: PokemonListItem[] = await Promise.all(
      response.data.results.map(async (pokemon: { name: string; url: string }) => {
        const detailsResponse = await axios.get(pokemon.url);
        return {
          id: detailsResponse.data.id,
          name: detailsResponse.data.name,
          image: detailsResponse.data.sprites.other['official-artwork'].front_default || 
                 detailsResponse.data.sprites.front_default,
          types: detailsResponse.data.types.map((type: { type: { name: string } }) => type.type.name),
        };
      })
    );
    
    return {
      results: pokemonWithDetails,
      count: response.data.count,
      next: response.data.next,
      previous: response.data.previous,
    };
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    throw error;
  }
};


export const getPokemonDetails = async (idOrName: string | number): Promise<PokemonDetail> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon/${idOrName}`);
    const speciesResponse = await axios.get(response.data.species.url);
    
    return {
      id: response.data.id,
      name: response.data.name,
      height: response.data.height / 10, 
      weight: response.data.weight / 10, 
      abilities: response.data.abilities.map((ability: { ability: { name: string }; is_hidden: boolean }) => ({
        name: ability.ability.name,
        isHidden: ability.is_hidden,
      })),
      types: response.data.types.map((type: { type: { name: string } }) => type.type.name),
      stats: response.data.stats.map((stat: { stat: { name: string }; base_stat: number }) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      })),
      moves: response.data.moves.slice(0, 10).map((move: { move: { name: string } }) => move.move.name), 
      images: {
        official: response.data.sprites.other['official-artwork'].front_default,
        default: response.data.sprites.front_default,
        shiny: response.data.sprites.front_shiny,
      },
      species: {
        name: speciesResponse.data.name,
        flavorText: speciesResponse.data.flavor_text_entries.find(
          (entry: { language: { name: string }; flavor_text: string }) => entry.language.name === 'en'
        )?.flavor_text.replace(/\\f|\\n/g, ' ') || '',
      },
    };
  } catch (error) {
    console.error('Error fetching Pokemon details:', error);
    throw error;
  }
};


export const searchPokemon = async (query: string): Promise<PokemonListResponse> => {
  try {
  
    const response = await axios.get(`${API_BASE_URL}/pokemon`, {
      params: {
        limit: 1000,
      },
    });
    
    const filteredResults = response.data.results.filter((pokemon: { name: string }) => 
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
    
    const pokemonWithDetails: PokemonListItem[] = await Promise.all(
      filteredResults.slice(0, 20).map(async (pokemon: { name: string; url: string }) => {
        const detailsResponse = await axios.get(pokemon.url);
        return {
          id: detailsResponse.data.id,
          name: detailsResponse.data.name,
          image: detailsResponse.data.sprites.other['official-artwork'].front_default || 
                 detailsResponse.data.sprites.front_default,
          types: detailsResponse.data.types.map((type: { type: { name: string } }) => type.type.name),
        };
      })
    );
    
    return {
      results: pokemonWithDetails,
      count: filteredResults.length,
      next: null,
      previous: null,
    };
  } catch (error) {
    console.error('Error searching Pokemon:', error);
    throw error;
  }
};