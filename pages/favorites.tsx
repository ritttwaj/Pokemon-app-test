import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PokemonCard from '../components/PokemonCard';
import Link from 'next/link';
import { getPokemonDetails } from '../utils/api';
import { PokemonDetail, PokemonListItem } from '../types/pokemon';

export default function Favorites() {
  const [favorites, setFavorites] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      
      try {
         const storedFavorites = localStorage.getItem('pokemonFavorites');
        const favoriteIds = storedFavorites ? JSON.parse(storedFavorites) as number[] : [];
        
        if (favoriteIds.length === 0) {
          setFavorites([]);
          setLoading(false);
          return;
        }
    
        const favoritesData = await Promise.all(
          favoriteIds.map(async (id) => {
            try {
              const pokemon = await getPokemonDetails(id);
              return pokemon;
            } catch (error) {
              console.error(`Error fetching Pokemon ${id}:`, error);
              return null;
            }
          })
        );
        
        setFavorites(favoritesData.filter((pokemon): pokemon is PokemonDetail => pokemon !== null));
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFavorites();
  }, []);
  
  
  const removeFavorite = (id: number) => {
   
    setFavorites(favorites.filter(pokemon => pokemon.id !== id));
    

    const storedFavorites = localStorage.getItem('pokemonFavorites');
    const favoriteIds = storedFavorites ? JSON.parse(storedFavorites) as number[] : [];
    const updatedFavorites = favoriteIds.filter(favId => favId !== id);
    localStorage.setItem('pokemonFavorites', JSON.stringify(updatedFavorites));
  };

  return (
    <Layout title="Favorites | Pokémon Explorer">
      <h1 className="text-3xl font-bold mb-6">Your Favorite Pokémon</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pokeblue"></div>
        </div>
      ) : favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favorites.map((pokemon) => (
            <div key={pokemon.id} className="relative">
              <button
                onClick={() => removeFavorite(pokemon.id)}
                className="absolute top-2 right-2 z-10 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                aria-label="Remove from favorites"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <PokemonCard 
                pokemon={{
                  id: pokemon.id,
                  name: pokemon.name,
                  image: pokemon.images.official || pokemon.images.default,
                  types: pokemon.types
                }} 
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">No Favorites Yet</h2>
          <p className="mb-6">You haven't added any Pokemon to your favorites yet.</p>
          <Link href="/" className="btn btn-primary">
            Explore Pokémon
          </Link>
        </div>
      )}
    </Layout>
  );
}