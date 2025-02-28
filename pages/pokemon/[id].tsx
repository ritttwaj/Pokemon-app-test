import { useState, useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/Layout';
import TypeBadge from '../../components/TypeBadge';
import StatBar from '../../components/StatBar';
import { getPokemonDetails, getPokemonList } from '../../utils/api';
import { isFavorite, toggleFavorite } from '../../utils/favorites';
import { PokemonDetail } from '../../types/pokemon';

interface PokemonDetailPageProps {
  pokemon: PokemonDetail | null;
}

export default function PokemonDetailPage({ pokemon }: PokemonDetailPageProps) {
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  
  useEffect(() => {
    if (pokemon) {
      setIsFavorited(isFavorite(pokemon.id));
    }
  }, [pokemon]);


  if (router.isFallback) {
    return (
      <Layout title="Loading...">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pokeblue"></div>
        </div>
      </Layout>
    );
  }

  
  if (!pokemon) {
    return (
      <Layout title="Pokemon Not Found">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Pokémon Not Found</h2>
          <p className="mb-6">Sorry, we couldn't find the Pokémon you're looking for.</p>
          <Link href="/" className="btn btn-primary">
            Return to Homepage
          </Link>
        </div>
      </Layout>
    );
  }

  const formattedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <Layout title={`${formattedName} | Pokémon Explorer`}>
      <div className="mb-6">
        <Link href="/" className="text-pokeblue hover:underline inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to All Pokémon
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className={`${pokemon.types[0] === 'fire' ? 'bg-red-500' : pokemon.types[0] === 'water' ? 'bg-blue-500' : pokemon.types[0] === 'grass' ? 'bg-green-500' : 'bg-pokeblue'} p-6 text-white`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <div className="flex items-center mb-2">
                <h1 className="text-3xl font-bold">{formattedName}</h1>
                <button
                  onClick={() => {
                    const newStatus = toggleFavorite(pokemon.id);
                    setIsFavorited(newStatus);
                  }}
                  className="ml-3 focus:outline-none"
                  aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                >
                  {isFavorited ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white hover:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-xl mb-4">#{pokemon.id.toString().padStart(3, '0')}</p>
              <div className="flex space-x-2">
                {pokemon.types.map(type => (
                  <TypeBadge key={type} type={type} large />
                ))}
              </div>
            </div>
            <div className="relative w-40 h-40 mt-4 md:mt-0">
              {pokemon.images.official ? (
                <Image
                  src={pokemon.images.official}
                  alt={pokemon.name}
                  layout="fill"
                  objectFit="contain"
                  priority
                />
              ) : (
                <Image
                  src={pokemon.images.default}
                  alt={pokemon.name}
                  layout="fill"
                  objectFit="contain"
                  priority
                />
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">About</h2>
            <p className="text-gray-700 mb-4">{pokemon.species.flavorText || 'No information available.'}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-600 mb-2">Height</h3>
                <p>{pokemon.height} m</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-600 mb-2">Weight</h3>
                <p>{pokemon.weight} kg</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-600 mb-2">Species</h3>
                <p className="capitalize">{pokemon.species.name}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">Abilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pokemon.abilities.map((ability) => (
                <div key={ability.name} className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-semibold capitalize">{ability.name.replace('-', ' ')}</h3>
                  {ability.isHidden && (
                    <span className="text-xs bg-gray-700 text-white px-2 py-1 rounded-full ml-2">
                      Hidden
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">Base Stats</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              {pokemon.stats.map((stat) => (
                <StatBar key={stat.name} stat={stat} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Moves</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex flex-wrap gap-2">
                {pokemon.moves.map((move) => (
                  <span
                    key={move}
                    className="bg-white px-3 py-1 rounded-lg text-gray-700 shadow-sm capitalize"
                  >
                    {move.replace('-', ' ')}
                  </span>
                ))}
              </div>
              <p className="text-gray-500 mt-4 text-sm">
                Showing {pokemon.moves.length} of many possible moves
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const data = await getPokemonList(151, 0);
    
    const paths = data.results.map((pokemon) => ({
      params: { id: pokemon.id.toString() },
    }));

    return {
      paths,
     
      fallback: true,
    };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return {
      paths: [],
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (!params?.id) {
      throw new Error('No ID provided');
    }
    
    const pokemon = await getPokemonDetails(params.id as string);
    
    return {
      props: {
        pokemon,
      },
    
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        pokemon: null,
      },
      
      notFound: true,
    };
  }
};