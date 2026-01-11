import { useLikesFavorites as useContextLikesFavorites } from '@/context/LikesFavoritesContext';

/**
 * This hook provides a simpler interface to the LikesFavoritesContext
 * For backward compatibility and simpler component integration
 */
export const useLikesFavorites = () => {
  // Get all functionality from the context
  const context = useContextLikesFavorites();
  
  return context;
}; 