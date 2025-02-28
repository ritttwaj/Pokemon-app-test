export const isFavorite = (id: number): boolean => {
    if (typeof window === 'undefined') {
      return false;
    }
    
    try {
      const favorites = JSON.parse(localStorage.getItem('pokemonFavorites') || '[]') as number[];
      return favorites.includes(id);
    } catch (error) {
      console.error('Error checking favorites:', error);
      return false;
    }
  };
  
 
  export const addToFavorites = (id: number): void => {
    if (typeof window === 'undefined') {
      return;
    }
    
    try {
      const favorites = JSON.parse(localStorage.getItem('pokemonFavorites') || '[]') as number[];
      if (!favorites.includes(id)) {
        favorites.push(id);
        localStorage.setItem('pokemonFavorites', JSON.stringify(favorites));
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };
  
 
  export const removeFromFavorites = (id: number): void => {
    if (typeof window === 'undefined') {
      return;
    }
    
    try {
      const favorites = JSON.parse(localStorage.getItem('pokemonFavorites') || '[]') as number[];
      const updatedFavorites = favorites.filter(favId => favId !== id);
      localStorage.setItem('pokemonFavorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };
  
  
  export const toggleFavorite = (id: number): boolean => {
    if (isFavorite(id)) {
      removeFromFavorites(id);
      return false; 
    } else {
      addToFavorites(id);
      return true; 
    }
  };
  
  
  export const getFavoriteIds = (): number[] => {
    if (typeof window === 'undefined') {
      return [];
    }
    
    try {
      return JSON.parse(localStorage.getItem('pokemonFavorites') || '[]') as number[];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  };