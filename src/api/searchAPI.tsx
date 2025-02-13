import type { SearchRequest } from '../interfaces/SearchRequest';
import type { SearchResult } from '../interfaces/SearchResult';



const fetchSearchResults = async (
    searchData: SearchRequest
  ): Promise<SearchResult | null> => {
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData),
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok! Status: ${response.status}`);
      }
  
      const result: SearchResult = await response.json();
      return result;
    } catch (error) {
      console.error('Error during search:', error);
      return null;
    }
  };

export default fetchSearchResults;