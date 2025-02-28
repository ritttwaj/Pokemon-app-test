import { useState } from 'react';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { getPokemonList, searchPokemon } from '../utils/api';
import { PokemonListItem, PokemonListResponse } from '../types/pokemon';

interface HomeProps {
  initialPokemon: PokemonListResponse;
}

export default function Home({ initialPokemon }: HomeProps) {
  const [pokemon, setPokemon] = useState<PokemonListItem[]>(initialPokemon.results);
  const [loading, setLoading] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(
    Math.ceil(initialPokemon.count / 20)
  );

  const fetchPokemon = async (page: number) => {
    setLoading(true);
    try {
      const offset = (page - 1) * 20;
      const data = await getPokemonList(20, offset);
      setPokemon(data.results);
      setCurrentPage(page);
      setTotalPages(Math.ceil(data.count / 20));
      setSearching(false);
      setSearchQuery('');
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setLoading(true);
    setSearchQuery(query);
    
    try {
      const data = await searchPokemon(query);
      setPokemon(data.results);
      setSearching(true);
    } catch (error) {
      console.error('Error searching Pokemon:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (currentPage !== page) {
      window.scrollTo(0, 0);
      fetchPokemon(page);
    }
  };

  return (
    <Layout title="Pokémon Explorer - Home">
      <SearchBar onSearch={handleSearch} />
      
      {searching && (
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold mb-2">
            {pokemon.length > 0
              ? `Search results for "${searchQuery}"`
              : `No Pokémon found for "${searchQuery}"`}
          </h2>
          <button
            onClick={() => fetchPokemon(1)}
            className="text-pokeblue hover:underline"
          >
            Clear search and show all Pokémon
          </button>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pokeblue"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {pokemon.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
          
          {!searching && <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />}
        </>
      )}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const initialPokemon = await getPokemonList(20, 0);
    
    return {
      props: {
        initialPokemon,
      },
      // Revalidate every hour
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        initialPokemon: {
          results: [],
          count: 0,
          next: null,
          previous: null,
        },
      },
    };
  }
};